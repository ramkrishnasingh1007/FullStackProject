const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const shiftTimes = {
  morning: { start: 8, end: 16.5 },
  evening: { start: 16.5, end: 1.5 },
  night: { start: 1.5, end: 6 },
};

const daysOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

function getShift(dateString) {
  const inputDate = new Date(dateString);
  console.log("InputDate: ", inputDate);
  const dayOfWeek = daysOfWeek[inputDate.getUTCDay()];
  console.log("dayOfWeek: ", dayOfWeek);

  for (const shift in shiftTimes) {
    const { start, end } = shiftTimes[shift];
    const shiftStart = new Date(dateString);
    const shiftEnd = new Date(dateString);
    console.log("shiftStart: ", shiftStart);
    console.log("shiftEnd: ", shiftEnd);

    shiftStart.setUTCHours(start, 0, 0, 0);
    shiftEnd.setUTCHours(end, 0, 0, 0);

    if (inputDate >= shiftStart && inputDate < shiftEnd) {
      if (shift === 'morning') {
        return `${dayOfWeek} MORNING SHIFT`;
      } else if (shift === 'evening') {
        return `${dayOfWeek} EVENING SHIFT`;
      } else if (shift === 'night') {
        return `${dayOfWeek} NIGHT SHIFT`;
      }
    }
  }

  return 'Invalid input or shift not found';
}

app.post('/getShift', (req, res) => {
  const { dateString } = req.body;

  if (!dateString) {
    return res.status(400).json({ error: 'Invalid input. Please provide a valid date string.' });
  }

  const shift = getShift(dateString);
  res.json({ shift });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
