import { Schema, model, models } from "mongoose";

const IncomeSchema = new Schema(
  {
    date: { type: Date, required: true },
    description: { type: String, required: true},
    category: { type: String, required: true },
    sum: { type: Number, required: true },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
  },
  {
    timestamps: true,    
    versionKey: false,   
  }
);

export const Income = models.Income || model("Income", IncomeSchema);