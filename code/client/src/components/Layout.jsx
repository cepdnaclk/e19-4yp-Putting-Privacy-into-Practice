import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-[#f2f2f7] overflow-hidden">
      <Sidebar />
      <main className="w-full justify-center flex-1 overflow-y-auto bg-gray-100 p-4">{children}</main>
    </div>
  );
}