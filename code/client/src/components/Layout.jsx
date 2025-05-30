import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-[#f2f2f7]">
      <Sidebar />
      <main className="w-full flex justify-center">{children}</main>
    </div>
  );
}
