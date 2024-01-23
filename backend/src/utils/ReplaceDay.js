function replaceDayInDate(originalDateString, newDay) {
    const date = new Date(originalDateString);
    
    if (isNaN(date)) {
      throw new Error("Invalid date string");
    }
  
    // Set the new day
    date.setDate(newDay);
  
    // Format the result as an ISO string
    const resultDateString = date.toISOString().split('T')[0];
    return resultDateString;
  }
  
  try {
    const resultDate = replaceDayInDate(originalDate, newDay);
    console.log(`Original Date: ${originalDate}`);
    console.log(`Result Date after replacing day with ${newDay}: ${resultDate}`);
  } catch (error) {
    console.error(error.message);
  }

  export {replaceDayInDate}