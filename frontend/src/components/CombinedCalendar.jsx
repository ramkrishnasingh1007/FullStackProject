import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CombinedCalendar = () => {
  const [selectedCalendar, setSelectedCalendar] = useState('Calendar1');
  const [searchTerm, setSearchTerm] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [resultApi, setResultApi] = useState('');
  const [error, setError] = useState('');



  const handleButtonClick = async () => {
    const isoDateTimeRegex = /^\d{4}-(0[1-9]|1[0-2])-([0-2]\d|3[01])T([01]\d|2[0-3]):[0-5]\d:[0-5]\d\+\d{2}:\d{2}$/;
    if (!isoDateTimeRegex.test(searchTerm)) {
      setError('Invalid ISO format.[YYYY-MM-DDTHH:mm:ss+00:00]');
      setTextareaValue('');
      return;
    }
    try {
      let data;
      if (selectedCalendar === 'Calendar1') {
        data = await axios.post('/api/v1/calendar/verifyCase', { dateString: searchTerm });
        setError('')
      } else if (selectedCalendar === 'Calendar2') {
        data = await axios.post('/api/v2/calendar/cal2Cases', { dateString: searchTerm });
        setError('')
      }

      setResultApi(data);

      console.log(resultApi.data.message);
      console.log(resultApi.data.data.shiftStart);
      console.log(resultApi.data.data.startTime);
      console.log(resultApi.data.data.endTime);

      setTextareaValue(
        `Day=${resultApi.data.message}, Type=${resultApi.data.data.shiftStart}, start=${resultApi.data.data.startTime}, end=${resultApi.data.data.endTime}`
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (resultApi && resultApi.data) {
      setTextareaValue(
        `Day=${resultApi.data.message}, Type=${resultApi.data.data.shiftStart}, start=${resultApi.data.data.startTime}, end=${resultApi.data.data.endTime}`
      );
    }
  }, [resultApi]);

  useEffect(() => {
    if (searchTerm === '') {
      setTextareaValue('');
      setError('');
    }
  }, [searchTerm, error]);

  useEffect(()=>{
    if(selectedCalendar =='Calendar2'){
        setError('')
        setSearchTerm('')
    }
  },[selectedCalendar])

  useEffect(()=>{
    if(selectedCalendar =='Calendar1'){
        setError('')
        setSearchTerm('')
    }
  },[selectedCalendar])

  return (
    <div className="bg-gray-100 mt-10 flex items-center justify-center h-[685px]">
      <div className="mx-auto p-6 bg-white rounded-md shadow-md w-[35%] flex flex-col justify-center h-[467px]">
        {/* Card content */}
        <h2 className="text-2xl font-bold mb-4"> Calendar</h2>

        {/* Calendar selection */}
        <div className="mb-4">
          <select
            value={selectedCalendar}
            onChange={(e) => setSelectedCalendar(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none mb-2"
          >
            <option value="Calendar1">Calendar 1</option>
            <option value="Calendar2">Calendar 2</option>
          </select>
        </div>

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
            className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none mr-2 mb-2"
          >
            Search
          </button>
          <p className={`my-4 ${error ? 'break-all' : ''}`}>
          {error && <span className="text-red-500">{error}</span>}
        </p>
          <div className="w-full p-2 h-24 border border-gray-300 rounded focus:outline-none">
            {textareaValue}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinedCalendar;