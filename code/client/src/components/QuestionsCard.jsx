import { useState } from "react";
import DashboardCard from "./DashboardCard";

export default function QuestionsCard({ title, value, Icon, breakdown }) {
  const [isHovered, setIsHovered] = useState(false);
  const total = breakdown.easy + breakdown.medium + breakdown.hard;

  return (
    <DashboardCard title={title} value={value} Icon={Icon}>
      <div className="mt-4">
        <div className="flex h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="bg-green-500"
            style={{ width: `${(breakdown.easy / total) * 100}%` }}
          />
          <div
            className="bg-yellow-500"
            style={{ width: `${(breakdown.medium / total) * 100}%` }}
          />
          <div
            className="bg-red-500"
            style={{ width: `${(breakdown.hard / total) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span className="text-green-600">{breakdown.easy} Easy</span>
          <span className="text-yellow-600">{breakdown.medium} Medium</span>
          <span className="text-red-600">{breakdown.hard} Hard</span>
        </div>
      </div>
    </DashboardCard>
  );
}
