import Planet from "../models/planets.js";

export async function getPlanets(req, res) {
  const planets = await Planet.find()
    .sort({ position: 1 }) // ordem fixa: o front não ordena
    .populate("hostStar", "slug name /* + os demais campos do contrato */");

  res.json(planets);
}

export async function findBySlug(req, res) {
  const planet = await Planet.findOne({ slug: req.params.slug }).populate(
    "hostStar",
    "slug name /* + os demais campos do contrato */",
  );

  if (!planet) {
    return res.status(404).json({
      error: { status: 404, message: "Planet not found" },
    });
  }

  res.json(planet);
}
