import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WorkImage from "./WorkImage";
import "./styles/Work.css";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const flexRef = useRef<HTMLDivElement>(null);
  
  // This state ensures we trigger a re-render if needed
  const [isLoaded, setIsLoaded] = useState(false);

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

    let ctx: gsap.Context;

    // --------------------------------------------------------
    // THE FIX: DELAYED INITIALIZATION
    // We wait 2000ms (2 seconds) to ensure your Loading Screen 
    // is finished and the DOM is fully stable before measuring.
    // --------------------------------------------------------
    const timer = setTimeout(() => {
      
      ctx = gsap.context(() => {
        // 1. Get the precise scroll distance from the browser
        // Now that we waited, 'scrollWidth' will be 100% correct.
        const getScrollAmount = () => {
          let distance = flex.scrollWidth - window.innerWidth;
          
          // Safety Check: If for some reason it's still 0, force a mobile calculation
          if (distance <= 0) {
             const cardWidth = window.innerWidth * 0.85 + 20; // 85vw + gap
             distance = (cardWidth * projects.length) - window.innerWidth;
          }
          
          return -Math.max(0, distance);
        };

        const scrollDistance = getScrollAmount();

        // 2. Create the Animation
        gsap.fromTo(
          flex,
          { x: 0 },
          {
            x: scrollDistance,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${Math.abs(scrollDistance)}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true, // Handle resize events
            },
          }
        );

        // 3. FORCE REFRESH
        // This tells ScrollTrigger: "Hey, layout just changed, remeasure everything!"
        ScrollTrigger.refresh();
        
      }, section);

      setIsLoaded(true);

    }, 2500); // 2.5 second delay to be safe. Adjust if your loader is longer.

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, [projects]);

  return (
    <div className="work-section" id="work" ref={sectionRef}>
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        {/* We use opacity to prevent visual glitches before animation starts */}
        <div 
          className="work-flex" 
          ref={flexRef} 
          style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.5s" }}
        >
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