import { useState } from "react";

export default function DashboardCard({ title, value, Icon }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`w-full sm:w-[220px] md:w-[240px] lg:w-[260px]
                  rounded-2xl p-5 border
                  transition-all duration-300 ease-in-out
                  flex items-center space-x-4 cursor-pointer
                  ${
                    isHovered
                      ? "bg-[#252d5c] shadow-lg border-blue-800"
                      : "bg-white border-gray-200 shadow-sm"
                  }
                  hover:-translate-y-1`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`p-3 rounded-full transition-colors duration-300
                    ${isHovered ? "bg-blue-600" : "bg-blue-100"}`}
      >
        <Icon size={30} color={isHovered ? "#ffffff" : "#1e3a8a"} />
      </div>
      <div>
        <p className={`text-sm ${isHovered ? "text-white" : "text-[#252d5c]"}`}>
          {title}
        </p>
        <p
          className={`text-xl font-bold ${
            isHovered ? "text-white" : "text-[#252d5c]"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
