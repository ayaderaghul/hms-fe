import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="max-w-md mx-auto px-5 py-7">
      <Outlet />
    </div>
  );
}