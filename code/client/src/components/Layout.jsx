import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex flex-1 justify-center bg-gray-100">{children}</main>
    </div>
  );
}
