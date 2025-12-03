import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WorkImage from "./WorkImage";
import "./styles/Work.css";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  // FIXED: Added <HTMLDivElement> to solve the "type 'never'" error from your screenshot
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

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const flex = flexRef.current;
    if (!section || !flex) return;

    let ctx = gsap.context(() => {
      // 1. Dynamic Calculation Function
      // We use a function so we can re-calculate if the screen size changes
      const getScrollAmount = () => {
        // Calculate the width of the scrolling content minus the window width
        let amount = flex.scrollWidth - window.innerWidth;
        
        // Safety fix: If it calculates as 0 (due to loading screen), 
        // fallback to a manual calculation based on your CSS
        if (amount <= 0) {
           const isMobile = window.innerWidth <= 768;
           const cardWidth = isMobile ? window.innerWidth * 0.85 : 600;
           const gap = isMobile ? 20 : 30; // 20px gap on mobile, 30px implicit on desktop
           const totalWidth = (projects.length * cardWidth) + ((projects.length - 1) * gap) + 50;
           amount = totalWidth - window.innerWidth;
        }

        return -Math.max(0, amount);
      };

      // 2. The Animation
      gsap.fromTo(
        flex,
        { x: 0 },
        {
          x: () => getScrollAmount(), // Use function for dynamic values
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${Math.abs(getScrollAmount())}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true, // Critical for mobile resize
          },
        }
      );

      // 3. THE FIX: ResizeObserver
      // This watches the element. As soon as the Loading Screen vanishes
      // and the element gets its real width, this triggers a refresh.
      const observer = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });
      observer.observe(flex);

      // Cleanup observer when component unmounts
      return () => observer.disconnect();

    }, section);

    return () => ctx.revert();
  }, [projects]);

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