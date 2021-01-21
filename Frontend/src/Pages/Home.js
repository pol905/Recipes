import React, { useEffect, useState } from "react";
import "../assets/css/styles.css";
import about from "../assets/img/about.jpg";
import home from "../assets/img/home.png";
import ScrollReveal from "scrollreveal";
import axios from "axios";
import Login from "../Components/Login";
import Logout from "../Components/Logout";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const theme = useTheme();
  let size = useMediaQuery(theme.breakpoints.down("md"));
  useEffect(() => {
    async function getSession() {
      const cookie = await axios.get("/v1/whoami/");
      if (cookie.data.username) {
        {
          setIsLoggedIn(true);
        }
      } else {
        setIsLoggedIn(false);
      }
    }
    getSession();
  }, []);
  useEffect(() => {
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
          <Link to="/" className="nav__logo">
            Tasty
          </Link>

          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
              <li className="nav__item">
                <Link to="/" className="nav__link active-link">
                  Home
                </Link>
              </li>
              {isLoggedIn ? (
                <li className="nav__item">
                  <Link to="/recipes" className="nav__link" id="">
                    My Recipes
                  </Link>
                </li>
              ) : null}
              <li className="nav__item">
                <Link to="/allrecipes" className="nav__link">
                  All Recipes
                </Link>
              </li>
              <li className="nav__item">
                {isLoggedIn ? <Logout /> : <Login width={size} />}
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

      <main className="l-main">
        <section className="home" id="home">
          <div className="home__container bd-container bd-grid">
            <div className="home__data">
              <h1 className="home__title">Tasty</h1>
              <h2 className="home__subtitle">
                Share your recipes <br /> also explore new ones.
              </h2>
            </div>

            <img src={home} alt="" className="home__img" />
          </div>
        </section>

        <section className="about section bd-container" id="about">
          <div className="about__container  bd-grid">
            <div className="about__data">
              <span className="section-subtitle about__initial">About us</span>
              <h2 className="section-title about__initial">
                We keep
                <br /> your recipes
              </h2>
              <p className="about__description">
                Your special food's recipe needs a place to be stored and shared
                with other food lovers. Using tasty ou can categorize all your
                recipes and also explore more variety of foods others want to
                share all in a place.
              </p>
            </div>

            <img src={about} alt="" className="about__img" />
          </div>
        </section>
        <section className="contact section bd-container" id="contact">
          <div className="contact__container bd-grid">
            <div className="contact__data">
              <span className="section-subtitle contact__initial">
                Let's talk
              </span>
              <h2 className="section-title contact__initial">Contact us</h2>
              <p className="contact__description">
                If you want to give suggestions and feedbacks please do let us
                know.
              </p>
            </div>
            <div className="contact__button">
              <a href="mailto:exampleemail@gmail.com" className="button">
                Contact us now
              </a>
            </div>
          </div>
        </section>
        <section className="contact section bd-container" id="contact">
          <div className="contact__container bd-grid">
            <div className="contact__data">
              <h2 className="section-title contact__initial">Address</h2>
              <p>
                RNSIT <br />
                Karnataka
                <br />
                BANGALORE-560078
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
