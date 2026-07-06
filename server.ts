import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON parser with body limits for base64 image uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Ensure directories exist
  const publicUploadsDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(publicUploadsDir)) {
    fs.mkdirSync(publicUploadsDir, { recursive: true });
  }

  const dataDir = path.join(process.cwd(), "src", "data_json");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const settingsPath = path.join(dataDir, "siteSettings.json");
  const portfolioPath = path.join(dataDir, "portfolio.json");

  // API Route: Get Site Settings
  app.get("/api/site-settings", (req, res) => {
    if (fs.existsSync(settingsPath)) {
      try {
        const data = fs.readFileSync(settingsPath, "utf-8");
        return res.json(JSON.parse(data));
      } catch (err) {
        console.error("Error reading site settings:", err);
      }
    }
    res.json(null);
  });

  // API Route: Save Site Settings
  app.post("/api/site-settings", (req, res) => {
    try {
      fs.writeFileSync(settingsPath, JSON.stringify(req.body, null, 2), "utf-8");
      res.json({ success: true });
    } catch (err: any) {
      console.error("Error saving site settings:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // API Route: Get Portfolio
  app.get("/api/portfolio", (req, res) => {
    if (fs.existsSync(portfolioPath)) {
      try {
        const data = fs.readFileSync(portfolioPath, "utf-8");
        return res.json(JSON.parse(data));
      } catch (err) {
        console.error("Error reading portfolio:", err);
      }
    }
    res.json(null);
  });

  // API Route: Save Portfolio
  app.post("/api/portfolio", (req, res) => {
    try {
      fs.writeFileSync(portfolioPath, JSON.stringify(req.body, null, 2), "utf-8");
      res.json({ success: true });
    } catch (err: any) {
      console.error("Error saving portfolio:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // API Route: Upload Image (Base64)
  app.post("/api/upload-image", (req, res) => {
    try {
      const { image } = req.body; // base64 string
      if (!image) {
        return res.status(400).json({ error: "No image data provided" });
      }

      // Check if it's base64 data url
      const matches = image.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
      if (!matches) {
        // If it's already an uploaded file path or external url, just return it
        if (image.startsWith("/") || image.startsWith("http")) {
          return res.json({ url: image });
        }
        return res.status(400).json({ error: "Invalid base64 image data" });
      }

      const rawExt = matches[1];
      const ext = rawExt === "jpeg" ? "jpg" : rawExt;
      const data = matches[2];
      const buffer = Buffer.from(data, "base64");

      const filename = `img_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
      const filePath = path.join(publicUploadsDir, filename);

      fs.writeFileSync(filePath, buffer);
      
      // Vite serves public directory at /
      res.json({ url: `/uploads/${filename}` });
    } catch (err: any) {
      console.error("Error uploading image:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // Serve static files from public directory in production
  app.use(express.static(path.join(process.cwd(), "public")));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
