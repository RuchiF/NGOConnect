import React, { useState } from "react";
import {
  FaHome,
  FaCalendarAlt,
  FaUsers,
  FaUser,
  FaBars,
  FaTrophy,
} from "react-icons/fa";
import styles from "./Sidebar.module.css";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/ngo", icon: <FaHome />, label: "Dashboard" },
  // ...other links...
  { to: "/ngo/leaderboard", icon: <FaTrophy />, label: "Leaderboard" },
  { to: "/ngo/profile", icon: <FaUser />, label: "Profile" },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
      <button
        className={styles.collapseBtn}
        onClick={() => setCollapsed(!collapsed)}
      >
        <FaBars />
      </button>
      <nav>
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`${styles.navLink} ${
              location.pathname === link.to ? styles.active : ""
            }`}
            title={link.label}
          >
            <span className={styles.icon}>{link.icon}</span>
            {!collapsed && <span className={styles.label}>{link.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
