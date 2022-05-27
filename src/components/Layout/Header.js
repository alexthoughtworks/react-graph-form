import React, { Fragment } from "react";
import classes from "./Header.module.css";

import mealsImage from "../../assets/meals.jpeg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Meals</h1>
        <HeaderCartButton onClick={props.onShownCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="Delicious food" />
      </div>
    </Fragment>
  );
};

export default Header;
