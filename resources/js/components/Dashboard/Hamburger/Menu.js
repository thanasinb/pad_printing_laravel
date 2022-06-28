//Core
import React from "react";
import styles from "./HamburgerMenu.module.scss";

const Menu = ({ className }) => (
  <div className={className}>
    <ul className={styles.navigation__list}>
      <li className={styles.navigation__item}>
        <a href="">ABC</a>{" "}
      </li>
      <li className={styles.navigation__item}>
        <a href="">DEF</a>
      </li>
      <li className={styles.navigation__item}>
        <a href="">GHI</a>
      </li>
      <li className={styles.navigation__item}>
        <a href="">JKL</a>
      </li>
    </ul>
  </div>
);

export default Menu;
