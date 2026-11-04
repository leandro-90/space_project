import Star from "../models/stars.js";

export async function getStars(req, res) {
  const stars = await Star.find().sort({ name: 1 }); // ordem fixa: o front não ordena
  res.json(stars);
}

export async function findBySlug(req, res) {
  const star = await Star.findOne({ slug: req.params.slug });
  if (!star) {
    return res.status(404).json({
      error: { status: 404, message: "Star not found" },
    });
  }

  res.json(star);
}
