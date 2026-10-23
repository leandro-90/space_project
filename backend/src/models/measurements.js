import mongoose from "mongoose";

export const measurementSchema = new mongoose.Schema(
  {
    value: { type: Number, required: true },
    unit: { type: String, required: true, trim: true },
  },
  { _id: false },
);
