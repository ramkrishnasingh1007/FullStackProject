import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Calendar2 = () => {
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
      let data = await axios.post('api/v2/calendar/cal2Cases', { dateString: searchTerm });
      setResultApi(data);
    } catch (error) {
      setError('An error occurred while fetching data. Please try again.');
      console.error('Error:', error);
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

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full md:w-1/2 lg:w-1/3 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Calendar 2</h2>

        <div className="mb-4 flex flex-col md:flex-row">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter ISO date..."
            className="w-full md:w-2/3 p-2 border border-gray-300 rounded focus:outline-none mb-2 md:mb-0 mr-0 md:mr-2"
          />
          <button
            type="submit"
            onClick={handleButtonClick}
            className="w-full md:w-1/3 bg-blue-500 text-white px-4 py-2 rounded focus:outline-none">
            Search
          </button>
        </div>

        <p className={`my-4 ${error ? 'break-all' : ''}`}>
          {error && <span className="text-red-500">{error}</span>}
        </p>

        <div className="w-full p-2 h-20 border border-gray-300 rounded focus:outline-none">
          {textareaValue}
        </div>
      </div>
    </div>
  );
};

export default Calendar2;