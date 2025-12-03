import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Developer</h4>
                <h5>Tech Solutions Inc.</h5>
              </div>
              <h3>2021</h3>
            </div>
            <p>
              Developed and maintained responsive web applications using React, Node.js, 
              and TypeScript. Collaborated with designers and backend engineers to deliver 
              high-quality, scalable solutions.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI & Automation Engineer</h4>
                <h5>SmartLink</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Designed AI chatbots, automated workflows, and AI agents to optimize business 
              processes. Integrated AI solutions with web and mobile platforms, improving efficiency and user experience.

            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Lead Developer & Designer</h4>
                <h5>Freelance / Own Projects</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Leading full-stack, AI, and mobile app development projects. Delivering cutting-edge 
              digital experiences across web, iOS, Android, and hardware-integrated platforms. 
              Specializing in creative design and high-performance applications.

            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
