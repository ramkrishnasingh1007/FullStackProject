import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Calendar1 } from "../models/calendar1.model.js";
import {replaceDayInDate} from "../utils/ReplaceDay.js";

// function replaceDayInDate(originalDateString, newDay) {
//   const date = new Date(originalDateString);
  
//   if (isNaN(date)) {
//     throw new Error("Invalid date string");
//   }

//   // Set the new day
//   date.setDate(newDay);

//   // Format the result as an ISO string
//   const resultDateString = date.toISOString().split('T')[0];
//   return resultDateString;
// }

// try {
//   const resultDate = replaceDayInDate(originalDate, newDay);
//   console.log(`Original Date: ${originalDate}`);
//   console.log(`Result Date after replacing day with ${newDay}: ${resultDate}`);
// } catch (error) {
//   console.error(error.message);
// }

function isValidISO8601(dateString) {
  const iso8601Pattern = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?([+-]\d{2}:\d{2})?|(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z))$/;
  return iso8601Pattern.test(dateString);
}

// Function to convert time to seconds
function convertToSeconds(time) {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

// Function to check if user input time lies between start and end times
function isTimeInRange(startTime, endTime, userTime) {
  const startSeconds = convertToSeconds(startTime);
  const endSeconds = convertToSeconds(endTime);
  return userTime >= startSeconds && userTime <= endSeconds;
}

// to check night shift
function isNightTimeInRange(startTime, endTime, userTime) {
  const startSeconds = convertToSeconds(startTime);
  const endSeconds = convertToSeconds(endTime);
  return userTime >= startSeconds && endSeconds < userTime;
}

const calendar1Entry = asyncHandler(async (req, res) => {
  //getting data from req.body
  const { days, shiftTime } = req.body;
  console.log("days:", days);

  const dayDetails = await Calendar1.create({
    days,
    shiftTime,
  });
  return res
    .status(201)
    .json(new ApiResponse(200, dayDetails, "Day details created successfully"));
});

const testCases = asyncHandler(async (req, res) => {
  const { dateString } = req.body;
  let ISOresult = isValidISO8601(dateString);
  console.log("ISO validation",ISOresult);
  if (ISOresult == false) {
    throw new ApiError(
      400,
      "Not valid ISO datetime string"
    );
  }

  const localDate = new Date(dateString);
  console.log("Local Date: ", localDate);
  if (localDate == "Invalid Date") {
  //   return res
  // .status(200)
  // .json(new ApiResponse(200,"Date String is not in valid ISO 8601 format!!","Failed")); 
    throw new ApiError(
      400,
      "Date String is not in valid ISO 8601 format!! Please enter valid date in ISO8601 format"
    );
  }
  const days = localDate.toLocaleDateString("en-US", { weekday: "long" });
  console.log("Day is: ", days);
  const time = new Date(dateString).toLocaleTimeString('en',{timeStyle: 'medium', hour12: false, timeZone: 'UTC'});
  console.log("Time is: ", time);
  //Time in seconds
   const userTimeInSeconds = convertToSeconds(time);
   console.log("User time in seconds: ", userTimeInSeconds);

  const dayMatch = await Calendar1.findOne({ days });
  console.log("Match day is: ", dayMatch);

  if (!dayMatch) {
    throw new ApiError(404, "No shift available!");
  }
  console.log(dayMatch.shiftTime.length);
  //let loop = dayMatch.shiftTime.length;

  const calendarShiftTime = dayMatch.shiftTime
  console.log("Shift Time: ", calendarShiftTime)
  console.log("startTime is: ", calendarShiftTime[0].startTime)
  console.log("startTime is: ", calendarShiftTime[0])
  let startTimeIs = calendarShiftTime[0].startTime
  console.log("startTime in seconds: ", convertToSeconds(startTimeIs))
  
   // Check if user is in the Night Shift
   const isNightShift = calendarShiftTime.some(shift => {
    const isShift = isNightTimeInRange(shift.startTime, shift.endTime, userTimeInSeconds);
    console.log("Bool is shift: ", isShift);
    return isShift && (shift.shiftStart === 'Night Shift');
  });
  console.log("Status Night shift: ", isNightShift)

  //case of night shift but want value of start shift
  let beforeMorningTime = 21600 //converting morning shift 6:00 into sec
  if(isNightShift == false && beforeMorningTime > userTimeInSeconds){
  let newDate = localDate.getDate()-1;
  console.log("New Date: ", newDate);
 const newDateString = replaceDayInDate(localDate, newDate)
 console.log("New Date String: ", newDateString);
 const date = new Date(newDateString)
 console.log("Date is: ", date)
 const dayOfWeek = date.getDay();
 console.log("Day of week: ", dayOfWeek)
 const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
 const days = weekdays[dayOfWeek];
 console.log("New day is: ", days);
 const newDayMatch = await Calendar1.findOne({ days });
  console.log("Match day is: ", newDayMatch);
  let newResult = newDayMatch.shiftTime[2]
  console.log("new Result is: ", newResult)

  return res
  .status(201)
  .json(new ApiResponse(200, newResult, days, "Shift Information fetched successfully")); 
  }
   


  //
  
 // Check if user input time lies in any of the shifts
const matchingShift = calendarShiftTime.find(shift => {
  return isTimeInRange(shift.startTime, shift.endTime, userTimeInSeconds);
});
console.log("Matching SHift: ", matchingShift)

let result
if (matchingShift) {
  // Return shift Information
   result = {
    shiftStart: matchingShift.shiftStart,
    startTime: matchingShift.startTime,
    endTime: matchingShift.endTime
  };
  return res
.status(201)
.json(new ApiResponse(200, result, days, "Shift Information fetched successfully")); 

}else if(isNightShift){
  let nightDetails = calendarShiftTime[2];
  console.log("Night shift details: ", nightDetails)
  result = {
    shiftStart: nightDetails.shiftStart,
    startTime: nightDetails.startTime,
    endTime: nightDetails.endTime
  };
  return res
.status(201)
.json(new ApiResponse(200, result, days, "Shift Information fetched successfully")); 

}
else {
  console.log('User is not in any shift.');
}

});

export { calendar1Entry, testCases };
