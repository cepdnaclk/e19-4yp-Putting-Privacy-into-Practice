import { forwardRef, useState } from "react";

function FormField(
  {
    label,
    labelSize = "xs",
    placeholder,
    type,
    value,
    onChange,
    passwordMatch = true,
    disabled = false,
    lenWarning = false,
    required = false,
    handleKeyDown = () => {},
    onSelect,
    options = [],
  },
  ref
) {
  const ringFocusColor =
    passwordMatch && !lenWarning ? "focus:ring-blue-600" : "focus:ring-red-600";

  const passwordCharactersNeeded = value ? 6 - value.length : 0;

  const [showDropDown, setShowDropDown] = useState(false);
  const [dropDownValue, setDropDownValue] = useState(options[0]);

  return (
    <div className="mb-4">
      <label
        className={`block ${
          labelSize === "xs" ? "text-xs" : "text-m"
        } font-bold mb-1 text-[#252d5c]`}
      >
        {label}
      </label>
      {type !== "select" && type !== "textarea" && (
        <>
          <input
            type={type}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${ringFocusColor} placeholder:text-xs`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            required={required}
            ref={ref}
            onKeyDown={handleKeyDown}
          />
          {lenWarning && (
            <p className="text-xs text-red-600">
              Need {passwordCharactersNeeded} more characters
            </p>
          )}
          {!passwordMatch && (
            <p className="text-xs text-red-600">Passwords do not match</p>
          )}
        </>
      )}

      {type === "select" && (
        <div className="relative w-full">
          <input
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${ringFocusColor} placeholder:text-xs`}
            value={dropDownValue}
            onClick={() => setShowDropDown((state) => !state)}
            readOnly
          />
          {showDropDown && (
            <div className="absolute top-full left-0 w-full bg-white shadow-md border mt-1 z-10 rounded">
              {options.map((option, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setShowDropDown(false);
                    setDropDownValue(option);
                    onSelect(option);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {type === "textarea" && (
        <textarea
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={6}
          cols={10}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          required={required}
        />
      )}
    </div>
  );
}

export default forwardRef(FormField);
