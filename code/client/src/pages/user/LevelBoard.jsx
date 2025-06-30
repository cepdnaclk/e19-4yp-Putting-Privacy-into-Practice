import { Trophy } from "lucide-react";

export default function LevelBoard() {
  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-slate-900 via-[#252d5c] to-slate-900 py-7 text-center">
      {/* Header */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <Trophy size={50} color="yellow" />
        <h1 className="text-5xl font-bold text-white">GDPR Guard</h1>
        <Trophy size={50} color="yellow" />
      </div>
      <p className="text-xl text-gray-300">
        Master the 7 principles of Data Protection
      </p>

      {/* player Stats */}
    </div>
  );
}
