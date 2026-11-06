import express from "express";
import planetsRouter from "./routes/planets.js";
import starsRouter from "./routes/stars.js";
import path from "node:path";
import cors from "cors";

const app = express();

const allowedOrigins = process.env.CORS_ORIGIN.split(",").map((origin) =>
  origin.trim(),
);
app.use(cors({ origin: allowedOrigins }));

const imagesDir = path.join(import.meta.dirname, "..", "public", "images");
app.use("/images", express.static(imagesDir));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/planets", planetsRouter);
app.use("/api/stars", starsRouter);

app.use((req, res) => {
  const erro = new Error(
    `Rota não encontrada: ${req.method} ${req.originalUrl}`,
  );
  erro.name = "RouteNotFound";
  console.error(erro.name, "-", erro.message);

  res.status(404).json({ error: { status: 404, message: "Route not found" } });
});

//middleware global de tratamento de erro
app.use((error, req, res, next) => {
  console.log(error);
  //quando não existe planeta/estrela buscado
  if (error.statusCode === 404) {
    res.status(404).send({ message: `${req.name} not found` });
    return;
  }

  res.status(500).send({ message: "Internal Error" });
});

export default app;
