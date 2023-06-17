import React from "react";
import logo from "../assets/fit.png";
import {RiShoppingCartLine, RiHome2Line, RiLogoutBoxRLine} from "react-icons/ri"
import styles from "./Navbar.module.css";

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <img src={logo} alt="logo" className={styles.logo}></img>
            </div>
            <ul className={styles.navbar_links}>
                <li><a href="index.html"><RiHome2Line /></a></li>
                <li><a href="index.html"><RiShoppingCartLine /></a></li>
                <li><a href="index.html"><RiLogoutBoxRLine /></a></li>
            </ul>
        </nav>
    )
}
export default Navbar;