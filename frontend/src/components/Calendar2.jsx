import React, {  useState } from 'react';
import axios from 'axios';

const Calendar1 = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [resultApi, setResultApi] = useState('')
  
    console.log('Search term submitted:', searchTerm);
   
  const handleButtonClick = async () => {
    try{
 let data = await axios.post('/api/v2/calendar/cal2Cases', {dateString : searchTerm}) 
    setResultApi(data)   
 console.log(resultApi)
    // console.log()
   // console.log("resultApi: ", resultApi);
     console.log(resultApi.data.message)
    console.log(resultApi.data.data.shiftStart)
    console.log(resultApi.data.data.startTime)
    console.log(resultApi.data.data.endTime)
    setTextareaValue(`Day=${resultApi.data.message}, Type=${resultApi.data.data.shiftStart}, start=${resultApi.data.data.startTime}, end=${resultApi.data.data.endTime}`)   


}catch(error){
    console.log(error)
}
  }

    

  return (
    <div className="bg-gray-100 mt-10 flex items-center justify-center">
      <div className=" mx-auto p-6 bg-white rounded-md shadow-md">
        {/* Card content */}
        <h2 className="text-2xl font-bold mb-4">Calendar 2</h2>

        {/* Search bar and textarea inside the card */}
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter ISO date..."
            className="w-full p-2 border border-gray-300 rounded focus:outline-none mb-2"
          />
          <button
            type="submit"
            onClick={handleButtonClick}
            className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none mr-2 mb-2">
            Search
          </button>
          <div 
          className="w-full p-2 h-20 border border-gray-300 rounded focus:outline-none">
          {textareaValue}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Calendar1;
