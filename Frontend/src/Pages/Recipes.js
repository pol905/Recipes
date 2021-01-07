import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import RecipeCard from "../Components/RecipeCard";
import Login from "../Components/Login";
import Logout from "../Components/Logout";
import { Link } from "react-router-dom";
import ScrollReveal from "scrollreveal";
import { makeStyles } from "@material-ui/core/styles";
import CreateRecipe from "../Components/CreateRecipe";
import fetchRecipes from "../helpers/fetchRecipes";

const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop: "7em",
  },
  button: {
    marginTop: "14em",
    marginLeft: "45%",
    "@media(max-width: 500px)": {
      marginLeft: "32%",
    },
  },
}));

const Recipes = (props) => {
  const classes = useStyles();
  const [recipes, setRecipes] = useState([]);
  const { isLoggedIn } = props;
  useEffect(() => {
    async function setAllRecipes() {
      const allRecipes = await fetchRecipes();
      setRecipes(() => {
        return [...allRecipes];
      });
    }
    setAllRecipes();
    const showMenu = (toggleId, navId) => {
      const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);

      // Validate that variables exist
      if (toggle && nav) {
        toggle.addEventListener("click", () => {
          // We add the show-menu class to the div tag with the nav__menu class
          nav.classList.toggle("show-menu");
        });
      }
    };
    showMenu("nav-toggle", "nav-menu");

    /*==================== REMOVE MENU MOBILE ====================*/
    const navLink = document.querySelectorAll(".nav__link");

    function linkAction() {
      const navMenu = document.getElementById("nav-menu");
      // When we click on each nav__link, we remove the show-menu class
      navMenu.classList.remove("show-menu");
    }
    navLink.forEach((n) => n.addEventListener("click", linkAction));

    /*==================== CHANGE BACKGROUND HEADER ====================*/
    function scrollHeader() {
      const nav = document.getElementById("header");
      // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
      if (this.scrollY >= 200) nav.classList.add("scroll-header");
      else nav.classList.remove("scroll-header");
    }
    window.addEventListener("scroll", scrollHeader);

    /*==================== SHOW SCROLL TOP ====================*/
    function scrollTop() {
      const scrollTop = document.getElementById("scroll-top");
      // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
      if (this.scrollY >= 560) scrollTop.classList.add("show-scroll");
      else scrollTop.classList.remove("show-scroll");
    }
    window.addEventListener("scroll", scrollTop);

    /*==================== DARK LIGHT THEME ====================*/
    const themeButton = document.getElementById("theme-button");
    const darkTheme = "dark-theme";
    const iconTheme = "bx-sun";

    // Previously selected topic (if user selected)
    const selectedTheme = localStorage.getItem("selected-theme");
    const selectedIcon = localStorage.getItem("selected-icon");

    // We obtain the current theme that the interface has by validating the dark-theme class
    const getCurrentTheme = () =>
      document.body.classList.contains(darkTheme) ? "dark" : "light";
    const getCurrentIcon = () =>
      themeButton.classList.contains(iconTheme) ? "bx-moon" : "bx-sun";

    // We validate if the user previously chose a topic
    if (selectedTheme) {
      // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
      document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
        darkTheme
      );
      themeButton.classList[selectedIcon === "bx-moon" ? "add" : "remove"](
        iconTheme
      );
    }

    // Activate / deactivate the theme manually with the button
    themeButton.addEventListener("click", () => {
      // Add or remove the dark / icon theme
      document.body.classList.toggle(darkTheme);
      themeButton.classList.toggle(iconTheme);
      // We save the theme and the current icon that the user chose
      localStorage.setItem("selected-theme", getCurrentTheme());
      localStorage.setItem("selected-icon", getCurrentIcon());
    });

    /*==================== SCROLL REVEAL ANIMATION ====================*/
    const sr = ScrollReveal({
      origin: "top",
      distance: "30px",
      duration: 2000,
      reset: true,
    });

    sr.reveal(
      `.home__data, .home__img,
            .about__data, .about__img,
            .services__content, .menu__content,
            .app__data, .app__img,
            .contact__data, .contact__button,
            .footer__content`,
      {
        interval: 200,
      }
    );
  }, []);
  return (
    <>
      <a href="#" className="scrolltop" id="scroll-top">
        <i className="bx bx-chevron-up scrolltop__icon"></i>
      </a>

      <header className="l-header" id="header">
        <nav className="nav bd-container">
          <a href="/" className="nav__logo">
            Tasty
          </a>

          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
              <li className="nav__item">
                <a href="/" className="nav__link active-link">
                  Home
                </a>
              </li>
              {isLoggedIn ? (
                <li className="nav__item">
                  <a href="/recipes" className="nav__link">
                    My Recipes
                  </a>
                </li>
              ) : null}
              <li className="nav__item">
                <a href="/allrecipes" className="nav__link">
                  All Recipes
                </a>
              </li>
              <li className="nav__item">
                {isLoggedIn ? <Logout /> : <Login />}
              </li>

              <li>
                <i className="bx bx-moon change-theme" id="theme-button"></i>
              </li>
            </ul>
          </div>

          <div className="nav__toggle" id="nav-toggle">
            <i className="bx bx-menu"></i>
          </div>
        </nav>
      </header>
      <CreateRecipe setRecipes={setRecipes} />
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        className={classes.grid}
      >
        {recipes.map((recipe) => {
          return (
            <RecipeCard
              recipe={recipe}
              key={recipe._id}
              setRecipes={setRecipes}
            />
          );
        })}
      </Grid>
    </>
  );
};

export default Recipes;
