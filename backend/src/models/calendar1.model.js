import mongoose, { Schema } from "mongoose";

const calendar1Schema = new Schema({
  days: {
    type: String,
    required: true,
  },
  shiftTime: [
    {
      shiftStart: String,
      startTime: String,
      endTime: String,
    },
    {
      shiftStart: String,
      startTime: String,
      endTime: String,
    },
    {
      shiftStart: String,
      startTime: String,
      endTime: String,
    },
  ],
});

export const Calendar1 = mongoose.model("Calendar1", calendar1Schema);
