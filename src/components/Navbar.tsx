import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import HoverLinks from "./HoverLinks";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Navbar = () => {
  useEffect(() => {
    const links = document.querySelectorAll(".header ul .hover-link");

    links.forEach((linkElem) => {
      const link = linkElem as HTMLAnchorElement;

      const handleClick = (e: Event) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const targetId = link.getAttribute("href");
          if (!targetId) return;

          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            gsap.to(window, {
              duration: 1.2,
              ease: "power2.inOut",
              scrollTo: { y: targetEl, offsetY: 0 },
            });
          }
        }
      };

      link.addEventListener("click", handleClick);

      return () => link.removeEventListener("click", handleClick);
    });
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          portfolio
        </a>

        {/* Email link - opens Gmail compose in a new tab */}
        <a
          href="https://mail.google.com/mail/?view=cm&to=hassambasit4@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-connect"
          data-cursor="disable"
        >
          hassambasit4@gmail.com
        </a>

        <ul>
          <li>
            <HoverLinks text="ABOUT" href="#about" />
          </li>
          <li>
            <HoverLinks text="WORK" href="#work" />
          </li>
          <li>
            <HoverLinks text="CONTACT" href="#contact" />
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
