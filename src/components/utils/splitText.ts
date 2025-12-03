import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  split?: SplitText;
}

// Register plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

export default function setSplitText() {
  // Wait for fonts to load before running SplitText
  document.fonts.ready.then(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });
    if (window.innerWidth < 900) return;

    const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
    const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

    const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
    const ToggleAction = "play pause resume reverse";

    paras.forEach((para: ParaElement) => {
      para.classList.add("visible");

      if (para.anim) {
        para.anim.progress(1).kill();
        para.split?.revert();
      }

      para.split = new SplitText(para, {
        type: "lines,words",
        linesClass: "split-line",
      });

      para.anim = gsap.fromTo(
        para.split.words,
        { autoAlpha: 0, y: 80 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.02,
          scrollTrigger: {
            trigger: para.parentElement?.parentElement,
            start: TriggerStart,
            toggleActions: ToggleAction,
          },
        }
      );
    });

    titles.forEach((title: ParaElement) => {
      if (title.anim) {
        title.anim.progress(1).kill();
        title.split?.revert();
      }

      title.split = new SplitText(title, {
        type: "chars,lines",
        linesClass: "split-line",
      });

      title.anim = gsap.fromTo(
        title.split.chars,
        { autoAlpha: 0, y: 80, rotate: 10 },
        {
          autoAlpha: 1,
          y: 0,
          rotate: 0,
          duration: 0.8,
          ease: "power2.inOut",
          stagger: 0.03,
          scrollTrigger: {
            trigger: title.parentElement?.parentElement,
            start: TriggerStart,
            toggleActions: ToggleAction,
          },
        }
      );
    });

    // Refresh SplitText on ScrollTrigger refresh
    ScrollTrigger.addEventListener("refresh", () => setSplitText());
  });
}
