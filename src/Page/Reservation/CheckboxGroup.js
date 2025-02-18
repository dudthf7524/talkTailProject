import React from "react";

const CheckboxGroup = ({ groupName, checkboxes, checkboxState, onChange }) => {
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    onChange(name, checked);
  };

  return (
    <div className="reservation-contents">
      <h1>{groupName}</h1>
      <div className="reservation-contents-checkbox">
        {checkboxes.map((checkbox, index) => {
          return (
            <div className="reservation-contents-check" key={checkbox.name}>
              <input
                type="checkbox"
                name={checkbox.name}
                checked={checkboxState[checkbox.name]}
                onChange={handleCheckboxChange}
              />
              <p
                className={checkboxState[checkbox.name] ? "checked" : ""}
                style={{
                  color: checkboxState.includes(checkbox.label)
                    ? "black"
                    : "#c4c4c4",
                }}
              >
                {checkbox.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckboxGroup;
