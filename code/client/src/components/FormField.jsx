import React from "react";

const Input = React.forwardRef(
  (
    {
      label,
      placeholder = "",
      type = "text",
      value,
      onChange,
      passwordMatch = true,
      disabled = false,
      lenWarning = false,
      required = false,
      handleKeyDown = () => {},
      options = [],
    },
    ref
  ) => {
    const ringFocusColor =
      passwordMatch && !lenWarning
        ? "focus:ring-blue-600"
        : "focus:ring-red-600";

    const passwordCharactersNeeded = value ? 6 - value.length : 0;

    return (
      <div className="mb-4">
        <label className="block text-xs font-bold mb-1">{label}</label>

        {type === "select" ? (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            required={required}
            ref={ref}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${ringFocusColor} text-sm`}
          >
            <option value="">-- Select --</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
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
        )}

        {type === "password" && lenWarning && (
          <p className="text-xs text-red-600">
            Need {passwordCharactersNeeded} more characters
          </p>
        )}

        {type === "password" && !passwordMatch && (
          <p className="text-xs text-red-600">Passwords do not match</p>
        )}
      </div>
    );
  }
);

export default Input;
