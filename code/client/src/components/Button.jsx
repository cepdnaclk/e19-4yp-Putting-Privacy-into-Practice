export default function Button({
  children,
  onClick,
  color = "blue",
  fullSpan = true,
}) {
  const isBtnBlue = color === "blue";
  return (
    <button
      type="submit"
      className={`${fullSpan ? "w-full" : "p-3"} 
      ${
        isBtnBlue
          ? "bg-blue-600 hover:bg-blue-700 text-white "
          : "bg-white hover:bg-blue-300 text-blue-600 border border-blue-600"
      }
       text-sm py-2 rounded-md font-semibold  transition mt-5 mb-5`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
