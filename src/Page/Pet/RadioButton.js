import React from 'react';

const RadioButton = ({ options, selectedOption, onSelect }) => {
    return (
        <div className='PetRegistration-button-container'>
            {options.map((option, index) => (
                <button
                    key={index}
                    className={`PetRegistration-button ${selectedOption === option.value ? 'selected' : ''}`}
                    onClick={() => onSelect(option.value)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};

export default RadioButton;
