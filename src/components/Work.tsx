import { useLayoutEffect, useRef } from "react";
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

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const flex = flexRef.current;
    if (!section || !flex) return;

    let ctx = gsap.context(() => {
      // --------------------------------------------------------
      // THE FIX: PRECISE CALCULATION + SAFETY BRAKE
      // --------------------------------------------------------
      const getScrollAmount = () => {
        // Ensure we get a valid width even if loading screen is active
        let raceWidth = window.innerWidth;
        if (raceWidth === 0) raceWidth = document.documentElement.clientWidth;

        const isMobile = raceWidth <= 768;

        // 1. Define sizes exactly as they appear in CSS
        const cardWidth = isMobile ? (raceWidth * 0.85) : 600;
        const cardGap = isMobile ? 20 : 0; // Mobile has 20px gap, Desktop has 0 (borders)
        const containerPaddingLeft = 20; // Mobile padding-left is 20px

        // 2. Calculate the TRUE width of the content strip
        // (6 Cards) + (5 Gaps) + (Initial Padding)
        const totalContentWidth = 
          (projects.length * cardWidth) + 
          ((projects.length - 1) * cardGap) + 
          containerPaddingLeft;

        // 3. Calculate Scroll Distance
        // We want to move left until the end of content aligns with right of screen.
        // Formula: Content Width - Visible Screen Width
        let distance = totalContentWidth - raceWidth;

        // 4. SAFETY BRAKE (Critical Fix)
        // On mobile, we reduce the distance by 50px to stop slightly EARLY.
        // This ensures we never scroll into the empty black void.
        if (isMobile) {
            distance = distance - 50; 
        }

        // Return negative value to move left
        return -Math.max(0, distance);
      };

      const scrollDistance = getScrollAmount;

      gsap.fromTo(
        flex,
        { x: 0 },
        {
          x: scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top", 
            end: () => `+=${Math.abs(scrollDistance())}`, // Duration matches distance
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true, 
          },
        }
      );
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