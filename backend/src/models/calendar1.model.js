import mongoose, { Schema } from "mongoose";

const calendar1Schema = new Schema({
  days: {
    type: String,
    required: true,
  },
  shiftTime: [
    {
      shift: String,
      startTime: String,
      endTime: String,
    },
    {
      shift: String,
      startTime: String,
      endTime: String,
    },
    {
      shift: String,
      startTime: String,
      endTime: String,
    },
  ],
});

export const Calendar1 = mongoose.model("Calendar1", calendar1Schema);
