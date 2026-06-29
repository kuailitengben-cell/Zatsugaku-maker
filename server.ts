import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { getCombinedTrivia } from "./src/services/geminiService.ts";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes
  app.get("/api/fact", async (req, res) => {
    const trivia = await getCombinedTrivia();
    res.json(trivia);
  });

  // Serve files from /public directory (for verification files, etc.)
  app.use(express.static(path.join(process.cwd(), 'public')));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
