import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const projects = [
    { name: "Cassie.codes", category: "Personal portfolio", tools: "React, Three.js, GSAP", image: "/images/cassie.png" },
    { name: "Patch Specialist", category: "Business / E-commerce Website", tools: "Next.js, Stripe API", image: "/images/patchspecialist.com.png" },
    { name: "Landing Page", category: "Modern Frontend", tools: "HTML, CSS, GSAP", image: "/images/food.png" },
    { name: "Energy Monitoring System", category: "Dashboard / IoT Monitoring", tools: "Next.js, MongoDB, React", image: "/images/EMS.jpeg" },
    { name: "Qari For Kids", category: "Landing Page / Front-end Website", tools: "HTML, CSS, JavaScript", image: "/images/Qari.png" },
    { name: "Spelinx – Premium Gaming Platform", category: "Gaming Platform", tools: "Next.js (React), TypeScript, CSS, MongoDB", image: "/images/spel2.png" },
  ];

  useEffect(() => {
    const section = document.querySelector(".work-section") as HTMLElement;
    const flex = document.querySelector(".work-flex") as HTMLElement;
    const boxes = Array.from(document.querySelectorAll(".work-box")) as HTMLElement[];

    if (!section || !flex || boxes.length === 0) return;

    const setupScroll = () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());

      const totalWidth = boxes.reduce((acc, box) => {
        const style = getComputedStyle(box);
        const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        return acc + box.offsetWidth + margin;
      }, 0);

      flex.style.width = `${totalWidth}px`;

      let scrollDistance = totalWidth - section.clientWidth;

      // 🔥 FIX: Ensure enough vertical height on mobile
      if (window.innerWidth <= 768) {
        const minHeight = scrollDistance + window.innerHeight * 1.5; // more scroll space
        section.style.height = `${minHeight}px`;
      } else {
        section.style.height = "100vh";
      }

      flex.style.transform = "translateX(0px)";

      gsap.to(flex, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    };

    setupScroll();
    window.addEventListener("resize", setupScroll);

    return () => {
      window.removeEventListener("resize", setupScroll);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

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
