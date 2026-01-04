import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux'



const linkClass = ({ isActive }) =>
  `block px-4 py-2 rounded-lg ${
    isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-200"
  }`;

export default function Sidebar() {
    const { user } = useSelector((state) => state.auth);
    
  return (
    <aside className="w-64 bg-white p-4 shadow-lg">
      <h2 className="mb-6 text-xl font-bold">Admin: {user?.displayName}</h2>

      <nav className="space-y-2">
        <NavLink to="/shop" className={linkClass}>
          📦 Products
        </NavLink>
        <NavLink to="/orders" className={linkClass}>
          🛒 Orders
        </NavLink>
        <NavLink to="/messages" className={linkClass}>
          📩 Messages
        </NavLink>
      </nav>
    </aside>
  );
}
