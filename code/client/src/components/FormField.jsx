import { forwardRef } from "react";

function FormField(
  {
    label,
    placeholder,
    type,
    value,
    onChange,
    passwordMatch = true,
    disabled = false,
    lenWarning = false,
    required = false,
    handleKeyDown = () => {},
  },
  ref
) {
  const ringFocusColor =
    passwordMatch && !lenWarning ? "focus:ring-blue-600" : "focus:ring-red-600";

  const passwordCharactersNeeded = value ? 6 - value.length : 0;

  return (
    <div className="mb-4">
      <label className="block text-xs font-bold mb-1">{label}</label>
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
    </div>
  );
}

export default forwardRef(FormField);
