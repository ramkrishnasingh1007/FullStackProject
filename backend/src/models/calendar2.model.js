import mongoose, { Schema } from "mongoose";

const calendar2Schema = new Schema({
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

export const Calendar2 = mongoose.model("Calendar2", calendar2Schema);
