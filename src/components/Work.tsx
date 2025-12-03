import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WorkImage from "./WorkImage";
import "./styles/Work.css";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  // FIXED: <HTMLDivElement> prevents the "type never" error
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
      // THE FIX: PURE MATH CALCULATION
      // We calculate the width manually. This makes it "Bulletproof"
      // because it works even if the loading screen is hiding the elements.
      // --------------------------------------------------------
      const getScrollAmount = () => {
        const raceWidth = window.innerWidth;
        
        // 1. Define sizes exactly as they appear in your CSS
        let cardWidth = 600; // Desktop default
        let cardGap = 30;    // Desktop default
        
        // Match CSS Media Queries Logic
        if (raceWidth <= 768) {
            // Mobile (matches CSS: width 85vw)
            cardWidth = raceWidth * 0.85;
            cardGap = 20;
        } else if (raceWidth <= 1400) {
            // Laptop (matches CSS: width 450px)
            cardWidth = 450;
            cardGap = 30;
        }

        // 2. Calculate the TRUE width of the content strip
        // Formula: (Cards * Width) + (Gaps * GapSize) + (End Padding Buffer)
        const totalContentWidth = 
          (projects.length * cardWidth) + 
          ((projects.length - 1) * cardGap) + 
          (raceWidth * 0.1); // 10% buffer for right padding

        // 3. Calculate how far we need to move left
        const distance = totalContentWidth - raceWidth;

        // Return negative value to move left. Max(0) prevents errors on huge screens.
        return -Math.max(0, distance);
      };

      // 4. Create the Animation
      const amount = getScrollAmount();
      
      gsap.fromTo(
        flex,
        { x: 0 },
        {
          x: amount, // Use the calculated math value
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top", 
            // The duration of the pin is exactly equal to the scroll distance
            end: () => `+=${Math.abs(amount)}`, 
            pin: true,
            scrub: 1,
            // We set invalidateOnRefresh to true, but we DO NOT use a ResizeObserver
            // This prevents the mobile "jump" when the address bar hides.
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