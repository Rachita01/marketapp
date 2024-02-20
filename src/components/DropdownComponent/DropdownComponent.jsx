import React, { useState,useEffect } from 'react';
import './DropdownComponent.css';

const DropdownComponent = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
  };

  useEffect(() => {
    // Delay rendering options for a short period
    const timeoutId = setTimeout(() => {
      console.log(options); // Make sure options are correct
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [options]);

  return (
    <div className='dropDown'>
      <select
        value={selectedOption}
        onChange={(e) => handleSelect(e.target.value)}
      >
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownComponent;
