import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-[#f2f2f7] overflow-hidden">
      <Sidebar />
      <main className="w-full flex justify-center overflow-y-auto bg-gray-100 mb-3">
        {children}
      </main>
    </div>
  );
}
