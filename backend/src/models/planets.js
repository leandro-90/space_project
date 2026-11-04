import mongoose from "mongoose";
import { measurementSchema } from "./measurements.js";
import Star from "./stars.js";

const planetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    classification: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
      enum: ["Terrestrial planet", "Gas giant", "Ice giant", "Dwarf planet"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 2,
    },
    about: {
      type: String,
      required: true,
      minlength: 2,
    },
    image: {
      type: String,
    },
    mass: { type: measurementSchema, required: true },
    radius: { type: measurementSchema, required: true },
    orbitalPeriod: { type: measurementSchema, required: true },
    semiMajorAxis: { type: measurementSchema, required: true },
    temperature: { type: measurementSchema, required: true },
    distanceFromEarth: { type: measurementSchema, required: true },

    hostStar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Star",
      required: true,
    },
  },
  { timestamps: true },
);

const Planet = mongoose.model("Planet", planetSchema);

export default Planet;
