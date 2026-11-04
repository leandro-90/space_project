import mongoose from "mongoose";
import { measurementSchema } from "./measurements.js";

const starSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  mass: {
    type: measurementSchema,
    required: true,
  },
  temperature: {
    type: measurementSchema,
    required: true,
  },
});

const Star = mongoose.model("Star", starSchema);

export default Star;
