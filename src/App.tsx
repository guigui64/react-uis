import { Link, NavLink, Outlet } from "react-router-dom";

import "./App.css";
import "./blueprint-trimmed.css";

export default function App() {
  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="navbar bg-base-300">
          <div className="flex-none">
            <label
              htmlFor="my-drawer"
              className="btn btn-square btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-none">
            <Link to="/" className="btn btn-ghost normal-case text-xl">
              React-UIs
            </Link>
            <span className="text-sm">Compare React UI libraries</span>
          </div>
        </div>
        <main className="m-4">
          <Outlet />
        </main>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu menu-compact p-4 overflow-y-auto w-60 bg-base-300 text-base-content">
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : undefined)}
              to="/buttons"
            >
              Buttons
            </NavLink>
          </li>
          <li>
            <span>...</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
