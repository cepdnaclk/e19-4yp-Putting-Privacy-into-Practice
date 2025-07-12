import {
  Shield,
  Lock,
  CheckCircle,
  Star,
  Trophy,
  Play,
  RotateCcw,
} from "lucide-react";

const gameLevels = [
  {
    id: 1,
    principle: "Lawfulness, Fairness & Transparency",
    levelValue: "lawfulness_fairness_transparency",
    title: "The Foundation Guardian",
    description: "Master the basics of legal data processing",
    color: "from-green-400 to-green-600",
    overlay: "bg-green-300",
    icon: <Shield className="w-8 h-8" color="white" />,
  },
  {
    id: 2,
    principle: "Purpose Limitation",
    levelValue: "purpose_limitation",
    title: "The Boundary Keeper",
    description: "Learn to respect data usage boundaries",
    color: "from-blue-400 to-blue-600",
    overlay: "bg-blue-300",
    icon: (
      <div className="w-8 h-8 border-2 border-white rounded-lg flex items-center justify-center">
        🎯
      </div>
    ),
  },
  {
    id: 3,
    principle: "Data Minimisation",
    levelValue: "data_minimisation",
    title: "The Efficiency Expert",
    description: "Collect only what you truly need",
    color: "from-purple-400 to-purple-600",
    overlay: "bg-purple-300",
    icon: (
      <div className="w-8 h-8 flex items-center justify-center text-xl">⚖️</div>
    ),
  },
  {
    id: 4,
    principle: "Accuracy",
    levelValue: "accuracy",
    title: "The Truth Seeker",
    description: "Keep data accurate and up-to-date",
    color: "from-orange-400 to-orange-600",
    overlay: "bg-orange-300",
    icon: (
      <div className="w-8 h-8 flex items-center justify-center text-xl">🔍</div>
    ),
  },
  {
    id: 5,
    principle: "Storage Limitation",
    levelValue: "storage_limitation",
    title: "The Time Master",
    description: "Know when to let data go",
    color: "from-red-400 to-red-600",
    overlay: "bg-red-300",
    icon: (
      <div className="w-8 h-8 flex items-center justify-center text-xl">⏰</div>
    ),
  },
  {
    id: 6,
    principle: "Integrity & Confidentiality",
    levelValue: "integrity_confidentiality",
    title: "The Security Fortress",
    description: "Protect data like a digital fortress",
    color: "from-indigo-400 to-indigo-600",
    overlay: "bg-indigo-300",
    icon: (
      <div className="w-8 h-8 flex items-center justify-center text-xl">🛡️</div>
    ),
  },
  {
    id: 7,
    principle: "Accountability",
    levelValue: "accountability",
    title: "The Documentation Champion",
    description: "Prove your compliance mastery",
    color: "from-yellow-400 to-yellow-600",
    overlay: "bg-yellow-300",
    icon: (
      <div className="w-8 h-8 flex items-center justify-center text-xl">📋</div>
    ),
  },
];

export default gameLevels;
