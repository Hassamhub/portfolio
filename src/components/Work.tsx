import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  // -----------------------------------
  // ⭐ 6 UNIQUE PROJECTS (EDIT ANY TIME)
  // -----------------------------------
  const projects = [
    {
      name: "Cassie.codes",
      category: "Personal portfolio",
      tools: "React, Three.js, GSAP",
      image: "/images/cassie.png",
    },
    {
      name: "Patch Specialist",
      category: "Business / E‑commerce Website",
      tools: "Next.js, Stripe API",
      image: "/images/patchspecialist.com.png",
    },
    {
      name: "Landing Page",
      category: "Modern Frontend",
      tools: "HTML, CSS, GSAP",
      image: "/images/food.png",
    },
    {
      name: "Energy Monitoring System",
      category: "Dashboard / IoT Monitoring",
      tools: "Next.js, MongoDB, React",
      image: "/images/EMS.jpeg",
    },
    {
      name: "Qari For Kids",
      category: "Landing Page / Front-end Website",
      tools: "HTML, CSS, JavaScript",
      image: "/images/Qari.png",
    },
    {
      name: "Spelinx – Premium Gaming Platform",
      category: "Gaming Platform",
      tools: "Next.js (React), TypeScript, CSS, MongoDB",
      image: "/images/spel2.png",
    },
  ];

  // -----------------------------------
  // ⭐ GSAP SCROLL ANIMATION (UNCHANGED)
  // -----------------------------------
  useEffect(() => {
    const workSection = document.querySelector(".work-section");
    const workFlex = document.querySelector(".work-flex");

    if (!workSection || !workFlex) return;

    const boxes = document.querySelectorAll(".work-box");

    const setupAnimation = () => {
      if (window.innerWidth < 900) {
        (workFlex as HTMLElement).style.width = "100%";
        ScrollTrigger.getAll().forEach((st) => st.kill());
        return;
      }

      const containerStyle = window.getComputedStyle(workSection);
      const containerPaddingLeft = parseFloat(containerStyle.paddingLeft) || 0;

      let totalWidth = 0;

      boxes.forEach((box) => {
        const htmlBox = box as HTMLElement;
        const style = window.getComputedStyle(htmlBox);
        const margin =
          parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        totalWidth += htmlBox.offsetWidth + margin;
      });

      totalWidth -= containerPaddingLeft / 2;

      const leftOffset = 0;
      totalWidth -= leftOffset;

      (workFlex as HTMLElement).style.width = `${totalWidth}px`;

      ScrollTrigger.getAll().forEach((st) => st.kill());

      gsap.to(workFlex, {
        x: () => `-${totalWidth - workSection.clientWidth}px`,
        ease: "none",
        scrollTrigger: {
          trigger: workSection,
          start: "top top",
          end: () => `+=${totalWidth - workSection.clientWidth}`,
          scrub: true,
          pin: true,
          pinSpacing: true,
        },
      });
    };

    setupAnimation();

    const handleResize = () => setupAnimation();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  // -----------------------------------
  // ⭐ UI SECTION (CSS CLASSNAMES SAME)
  // -----------------------------------
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>

                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>

              <WorkImage image={project.image} alt={project.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
