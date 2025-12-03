import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WorkImage from "./WorkImage";
import "./styles/Work.css";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const flexRef = useRef<HTMLDivElement>(null);

  const projects = [
    { name: "Cassie.codes", category: "Personal portfolio", tools: "React, Three.js, GSAP", image: "/images/cassie.png" },
    { name: "Patch Specialist", category: "Business / E-commerce Website", tools: "Next.js, Stripe API", image: "/images/patchspecialist.com.png" },
    { name: "Landing Page", category: "Modern Frontend", tools: "HTML, CSS, GSAP", image: "/images/food.png" },
    { name: "Energy Monitoring System", category: "Dashboard / IoT Monitoring", tools: "Next.js, MongoDB, React", image: "/images/EMS.jpeg" },
    { name: "Qari For Kids", category: "Landing Page / Front-end Website", tools: "HTML, CSS, JavaScript", image: "/images/Qari.png" },
    { name: "Spelinx – Premium Gaming Platform", category: "Gaming Platform", tools: "Next.js (React), TypeScript, CSS, MongoDB", image: "/images/spel2.png" },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const flex = flexRef.current;

    if (!section || !flex) return;

    let ctx = gsap.context(() => {
      // 1. Calculate the real distance to scroll
      const getScrollAmount = () => {
        return -(flex.scrollWidth - window.innerWidth);
      };

      // 2. Create the horizontal scroll animation
      // (Variable removed to fix 'never read' error)
      gsap.to(flex, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${flex.scrollWidth}`, // Scroll duration matches content width
          pin: true,
          scrub: 1, 
          invalidateOnRefresh: true, 
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div className="work-section" id="work" ref={sectionRef}>
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex" ref={flexRef}>
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