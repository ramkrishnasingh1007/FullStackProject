import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Calendar2 } from "../models/calendar2.model.js";
import {replaceDayInDate} from "../utils/ReplaceDay.js";


const calendar2Entry = asyncHandler(async (req, res) => {
    //getting data from req.body
    const { days, shiftTime } = req.body;
    console.log("days:", days);
  
    const dayDetails = await Calendar2.create({
      days,
      shiftTime,
    });
    return res
      .status(201)
      .json(new ApiResponse(200, dayDetails, "Day details created successfully"));
  });

  //
   function getUTCTime(time){
   return  time.getUTCHours() * 60 + time.getUTCMinutes() + time.getUTCSeconds();
 
   }

  
    

   
  const cal2TestCases = asyncHandler(async(req, res) => {
    const {dateString} = req.body;
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const date = new Date(dateString);
    console.log("inputDate is: ", date)
    const days = weekdays[date.getUTCDay()];
    console.log("days: ", days);
    const userTime = getUTCTime(date)
    console.log("Time in UTC sec: ", userTime)
    //dbCall
    const dbRes = await Calendar2.findOne({days})
    console.log("Db res: ", dbRes);
    const shiftTimeInArray = dbRes.shiftTime
    console.log("ShiftTime in Array: ", shiftTimeInArray)

    if(days == 'Monday'){
       if(userTime >= 480 && userTime < 990 ){
        const result = {
          shiftStart: shiftTimeInArray[0].shiftStart,
          startTime: shiftTimeInArray[0].startTime,
          endTime: shiftTimeInArray[0].endTime
        }
        return res
        .status(201)
        .json(new ApiResponse(200, result, days, "Shift Information fetched successfully")); 
       }else if(userTime >= 990 && userTime > 90){
        const result = {
          shiftStart: shiftTimeInArray[1].shiftStart,
          startTime: shiftTimeInArray[1].startTime,
          endTime: shiftTimeInArray[1].endTime
        }
        return res
        .status(201)
        .json(new ApiResponse(200, result, days, "Shift Information fetched successfully")); 
       }else{
        const result = {
          shiftStart: shiftTimeInArray[2].shiftStart,
          startTime: shiftTimeInArray[2].startTime,
          endTime: shiftTimeInArray[2].endTime
        }
        return res
        .status(201)
        .json(new ApiResponse(200, result, days, "Shift Information fetched successfully")); 
       }
    }

    if(days == 'Tuesday'){
      if(userTime >= 480 && userTime < 990 ){
       const result = {
        shiftStart: shiftTimeInArray[0].shiftStart,
         startTime: shiftTimeInArray[0].startTime,
         endTime: shiftTimeInArray[0].endTime
       }
       return res
       .status(201)
       .json(new ApiResponse(200, result, days, "Shift Information fetched successfully")); 
      }else if(userTime >= 990 && userTime > 90){
       const result = {
        shiftStart: shiftTimeInArray[1].shiftStart,
         startTime: shiftTimeInArray[1].startTime,
         endTime: shiftTimeInArray[1].endTime
       }
       return res
       .status(201)
       .json(new ApiResponse(200, result, days, "Shift Information fetched successfully")); 
      }else{
       const result = {
        shiftStart: shiftTimeInArray[2].shiftStart,
         startTime: shiftTimeInArray[2].startTime,
         endTime: shiftTimeInArray[2].endTime
       }
       return res
       .status(201)
       .json(new ApiResponse(200, result, days, "Shift Information fetched successfully")); 
      }
   }

   if(days == 'Wednesday'){
    if(userTime >= 480 && userTime < 990 ){
     const result = {
      shiftStart: shiftTimeInArray[0].shiftStart,
       startTime: shiftTimeInArray[0].startTime,
       endTime: shiftTimeInArray[0].endTime
     }
     return res
     .status(201)
     .json(new ApiResponse(200, result, days, "Shift Information fetched successfully")); 
    }else if(userTime >= 990 && userTime > 90){
     const result = {
      shiftStart: shiftTimeInArray[1].shiftStart,
       startTime: shiftTimeInArray[1].startTime,
       endTime: shiftTimeInArray[1].endTime
     }
     return res
     .status(201)
     .json(new ApiResponse(200, result, days, "Shift Information fetched successfully")); 
    }else{
     const result = {
      shiftStart: shiftTimeInArray[2].shiftStart,
       startTime: shiftTimeInArray[2].startTime,
       endTime: shiftTimeInArray[2].endTime
     }
     return res
     .status(201)
     .json(new ApiResponse(200, result, days, "Shift Information fetched successfully")); 
    }
 }

 if(days == 'Thursday'){
  if(userTime >= 480 && userTime < 990 ){
   const result = {
    shiftStart: shiftTimeInArray[0].shiftStart,
     startTime: shiftTimeInArray[0].startTime,
     endTime: shiftTimeInArray[0].endTime
   }
   return res
   .status(201)
   .json(new ApiResponse(200, result, days, "Shift Information fetched successfully")); 
  }else if(userTime >= 990 && userTime > 90){
   const result = {
    shiftStart: shiftTimeInArray[1].shiftStart,
     startTime: shiftTimeInArray[1].startTime,
     endTime: shiftTimeInArray[1].endTime
   }
   return res
   .status(201)
   .json(new ApiResponse(200, result, days, "Shift Information fetched successfully")); 
  }else{
   const result = {
    shiftStart: shiftTimeInArray[2].shiftStart,
     startTime: shiftTimeInArray[2].startTime,
     endTime: shiftTimeInArray[2].endTime
   }
   return res
   .status(201)
   .json(new ApiResponse(200, result, days, "Shift Information fetched successfully")); 
  }
}

if(days == 'Friday'){
  if(userTime >= 480 && userTime < 930 ){
   const result = {
    shiftStart: shiftTimeInArray[0].shiftStart,
     startTime: shiftTimeInArray[0].startTime,
     endTime: shiftTimeInArray[0].endTime
   }
   return res
   .status(201)
   .json(new ApiResponse(200, result, days, "Shift Information fetched successfully")); 
  }else if(userTime >= 930 && userTime > 30){
   const result = {
    shiftStart: shiftTimeInArray[1].shiftStart,
     startTime: shiftTimeInArray[1].startTime,
     endTime: shiftTimeInArray[1].endTime
   }
   return res
   .status(201)
   .json(new ApiResponse(200, result, days, "Shift Information fetched successfully")); 
  }else{
   const result = {
    shiftStart: shiftTimeInArray[2].shiftStart,
     startTime: shiftTimeInArray[2].startTime,
     endTime: shiftTimeInArray[2].endTime
   }
   return res
   .status(201)
   .json(new ApiResponse(200, result, days, "Shift Information fetched successfully")); 
  }
}

if(days == 'Saturday'){
  if(userTime >= 360 && userTime < 1080 ){
   const result = {
    shiftStart: shiftTimeInArray[0].shiftStart,
     startTime: shiftTimeInArray[0].startTime,
     endTime: shiftTimeInArray[0].endTime
   }
   return res
   .status(201)
   .json(new ApiResponse(200, result, days, "Shift Information fetched successfully")); 
  }else if(userTime >= 1080 && userTime > 360){
   const result = {
    shiftStart: shiftTimeInArray[1].shiftStart,
     startTime: shiftTimeInArray[1].startTime,
     endTime: shiftTimeInArray[1].endTime
   }
   return res
   .status(201)
   .json(new ApiResponse(200, result, days, "Shift Information fetched successfully")); 
  }else if(userTime <=15 ){
    async function fetchNewData(days){      
      try {
         let response = await Calendar2.findOne({days})
        console.log("new response: ", response);
        let newresult = response.shiftTime[1]
        return newresult
      } catch (error) {
        console.log("error is: ", error)
      } 
    }
 let newDate = date.getDate()-1;
  console.log("New Date: ", newDate);
  const newDateString = replaceDayInDate(date, newDate)
 console.log("New Date String: ", newDateString);
 const dates = new Date(newDateString)
 console.log("Date is: ", dates)
 const dayOfWeek = dates.getDay();
 console.log("Day of week: ", dayOfWeek)
 const days = weekdays[dayOfWeek];
 console.log("New day is: ", days);
 fetchNewData(days)
 .then((result) =>{
  console.log("result is: ", result)
  const newresult = {
    shiftStart: result.shiftStart,
    startTime: result.startTime,
    endTime: result.endTime
  }
  console.log(newresult)
  return newresult
 })
 .then((finalResult)=>{
  console.log("final result is: ", finalResult)
  return res
  .status(201)
  .json(new ApiResponse(200, finalResult, days, "Shift Information fetched successfully")); 
 })
 .catch((err)=>{
  console.log("err is: ", err)
 })
 
}else if(userTime>=300){
  async function fetchNewData(days){      
    try {
       let response = await Calendar2.findOne({days})
      console.log("new response: ", response);
      let newresult = response.shiftTime[2]
      return newresult
    } catch (error) {
      console.log("error is: ", error)
    } 
  }
  let newDate = date.getDate()-1;
  console.log("New Date: ", newDate);
  const newDateString = replaceDayInDate(date, newDate)
 console.log("New Date String: ", newDateString);
 const dates = new Date(newDateString)
 console.log("Date is: ", dates)
 const dayOfWeek = dates.getDay();
 console.log("Day of week: ", dayOfWeek)
 const days = weekdays[dayOfWeek];
 console.log("New day is: ", days);
 fetchNewData(days)
 .then((result) =>{
  console.log("result is: ", result)
  const newresult = {
    shiftStart: result.shiftStart,
    startTime: result.startTime,
    endTime: result.endTime
  }
  console.log(newresult)
  return newresult
 })
 .then((finalResult)=>{
  console.log("final result is: ", finalResult)
  return res
  .status(201)
  .json(new ApiResponse(200, finalResult, days, "Shift Information fetched successfully")); 
 })
 .catch((err)=>{
  console.log("err is: ", err)
 })
}

}

if(days == 'Sunday'){
  if(userTime >= 360 && userTime < 1080 ){
   const result = {
    shiftStart: shiftTimeInArray[0].shiftStart,
     startTime: shiftTimeInArray[0].startTime,
     endTime: shiftTimeInArray[0].endTime
   }
   return res
   .status(201)
   .json(new ApiResponse(200, result, days, "Shift Information fetched successfully")); 
  }else if(userTime >= 1080 && userTime > 360){
   const result = {
    shiftStart: shiftTimeInArray[1].shiftStart,
     startTime: shiftTimeInArray[1].startTime,
     endTime: shiftTimeInArray[1].endTime
   }
   return res
   .status(201)
   .json(new ApiResponse(200, result, days, "Shift Information fetched successfully")); 
  }
}



  }) 

 
 


  export {calendar2Entry,
    cal2TestCases
  }