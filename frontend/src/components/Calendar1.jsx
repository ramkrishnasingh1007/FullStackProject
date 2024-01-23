import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Calendar1 = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [resultApi, setResultApi] = useState('');
  const [error, setError] = useState('');


  const handleButtonClick = async () => {
    const isoDateTimeRegex = /^\d{4}-(0[1-9]|1[0-2])-([0-2]\d|3[01])T([01]\d|2[0-3]):[0-5]\d:[0-5]\d\+\d{2}:\d{2}$/;
    if (!isoDateTimeRegex.test(searchTerm)) {
      setError('Invalid ISO format.[YYYY-MM-DDTHH:mm:ss+00:00]');
      setTextareaValue('')
      return;
    }
    try {
      let data = await axios.post('/api/v1/calendar/verifyCase', { dateString: searchTerm });
      setResultApi(data);
    
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Check if resultApi is not undefined before accessing its properties
    if (resultApi && resultApi.data) {
      console.log('resultApi:', resultApi);
      console.log('Message:', resultApi.data.message);
      console.log('Shift Start:', resultApi.data.data.shiftStart);
      console.log('Start Time:', resultApi.data.data.startTime);
      console.log('End Time:', resultApi.data.data.endTime);

      setTextareaValue(
        `Day=${resultApi.data.message}, Type=${resultApi.data.data.shiftStart}, start=${resultApi.data.data.startTime}, end=${resultApi.data.data.endTime}`
      );
    }
  }, [resultApi]);
  useEffect(()=>{
    if(searchTerm === ''){
      setTextareaValue('')
    }

  },[searchTerm])

  return (
    <div className="bg-gray-100 mt-10 flex items-center justify-center">
      <div className=" mx-auto p-6 bg-white rounded-md shadow-md">
        {/* Card content */}
        <h2 className="text-2xl font-bold mb-4">Calendar 1</h2>

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
          {error && <p className="text-red-500">{error}</p>}

          <div className="w-full p-2 h-20 border border-gray-300 rounded focus:outline-none">
            {textareaValue}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar1;