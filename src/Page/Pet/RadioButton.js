import React from 'react';

const RadioButton = ({ options, selectedOption, onSelect, netur }) => {
    return (
        <div className='PetRegistration-button-container'>
            {options.map((option, index) => (
                <button
                    key={index}
                    className={`PetRegistration-${netur}button ${selectedOption === option.value ? 'selected' : ''}`}
                    onClick={() => onSelect(option.value)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};

export default RadioButton;
