"use client";
import React, { useState, useEffect } from 'react';

interface DateInputProps {
  onFileInfoChange: (field: string, value: string | Date) => void;
}

/**
 * DateInput component allows the user to input a full date (day, month, year) or just a year.
 * 
 * @param {Object} props - The properties object.
 * @param {(field: string, value: Date) => void} props.onFileInfoChange - Callback function to handle date changes.
 */
const DateInput: React.FC<DateInputProps> = ({ onFileInfoChange }) => {
  const [day, setDay] = useState<number | undefined>(undefined);
  const [month, setMonth] = useState<number | undefined>(undefined);
  const [year, setYear] = useState<number | undefined>(undefined);

  /**
   * Updates the date state and calls the onFileInfoChange callback.
   */
  const updateDate = () => {
    if (year !== undefined) {
      const date = new Date(year, month ? month - 1 : 0, day ? day : 1);
      onFileInfoChange('date', date);
    //   console.log("Date updated:", date);
    }
  };

  /**
   * Handles the change of day input.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value) : undefined;
    setDay(value);
    // console.log("Day changed:", value);
  };

  /**
   * Handles the change of month input.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value) : undefined;
    setMonth(value);
    // console.log("Month changed:", value);
  };

  /**
   * Handles the change of year input.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value) : undefined;
    setYear(value);
    // console.log("Year changed:", value);
  };

  /**
   * Effect hook to update the date whenever day, month, or year changes.
   */
  useEffect(() => {
    updateDate();
  }, [day, month, year]);

  return (
    <div>
      <div className="mb-4 w-full">
        <label className="input flex items-center gap-2 h-8">
          <span className="font-semibold">Date</span>
          <div className="grow flex flex-row flex-nowrap gap-1 ">
            <input
                type="number"
                className="w-12"
                value={day ?? ''}
                onChange={handleDayChange}
                placeholder="DD"
            />
            {"/"}
            <input
                type="number"
                className="w-12"
                value={month ?? ''}
                onChange={handleMonthChange}
                placeholder="MM"
            />
            {"/"}
            <input
                type="number"
                className="w-16"
                value={year ?? ''}
                onChange={handleYearChange}
                placeholder="YYYY"
                required
            />
          </div>
        </label>
      </div>
    </div>
  );
};

export default DateInput;
