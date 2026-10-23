import mongoose from "mongoose";
import { measurementSchema } from "./measurement.js";

const starSchema = new mongoose.Schema({
  _id: {
    type: String,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
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

export const Star = mongoose.model("Star", starSchema);
