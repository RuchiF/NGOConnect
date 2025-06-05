import React from "react";
import { useNavigate } from "react-router-dom";
import { getUser, isLoggedIn, logout } from "../utils";
import styles from "./Navbar.module.css";

const Navbar = ({ title }) => {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>NGOConnect</div>
      <div className={styles.title}>{title}</div>
      {isLoggedIn() && (
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;