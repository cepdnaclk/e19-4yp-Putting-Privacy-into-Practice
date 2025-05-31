import { useState } from "react";

export default function PrincipleCard({ title, description, onClick, Icon }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        w-full
        sm:w-[280px]
        md:w-[320px]
        lg:w-[360px]
        ${isHovered ? "bg-[#252d5c]" : "bg-white"}
        rounded-3xl
        p-6 
        mt-4
        cursor-pointer 
        transition-all 
        duration-300 
        border 
        border-transparent
        hover:border-blue-400 
        hover:shadow-lg 
        hover:shadow-blue-900/20
        hover:-translate-y-1
        flex flex-col items-center text-center
      `}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon color={`${isHovered ? "white" : "black"}`} size={80} />
      <h3
        className={`text-lg font-semibold ${
          isHovered ? "text-white" : "text-blue-900"
        } mt-3 mb-2`}
      >
        {title}
      </h3>
      <p className={`text-sm ${isHovered ? "text-gray-300" : "text-gray-900"}`}>
        {description}
      </p>
    </div>
  );
}
