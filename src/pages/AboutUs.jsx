import React from "react";
import "../styles/AboutUs.css"; // Import the CSS file

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Raven Luke Bengil",
      role: "Project Leader",
      image: "/images/raven.jpg",
      description:
        "Raven oversees the project timeline and ensures every milestone is met on time. His leadership keeps the team aligned and focused on the team's goals.",
    },
    {
      name: "Daniel Guinita",
      role: "Full Stack Developer",
      image: "/images/daniel.png",
      description:
        "Daniel leads the development team, building robust code structures and tackling complex technical challenges to keep our project on track.",
    },
    {
      name: "Jasmin Oca",
      role: "Full Stack Developer",
      image: "/images/Oca.jpg",
      description:
        "Jasmin is responsible for the platform’s visual design and user experience, ensuring that our Math-hew platform is engaging and easy to navigate.",
    },
    {
      name: "Roy Niño Patigayon",
      role: "Full Stack Developer",
      image: "/images/roy.jpg",
      description:
        "Roy supports the project by integrating technical solutions and enhancing functionality, ensuring that the project meets quality standards and runs efficiently for all users.",
    },
    {
      name: "Jon Miguel Gutierrez",
      role: "Full Stack Developer",
      image: "/images/jon.png",
      description:
        "Jon contributes to the project by managing essential technical tasks, ensuring that all systems and software function smoothly. His attention to detail keeps the team’s work efficient and on track toward achieving our objectives.",
    },
  ];

  return (
    <div className="aboutus-container">
      <div className="w-full max-w-6xl text-center relative">
        <h1 className="aboutus-title">About Math-hew</h1>
        <p className="aboutus-subtext">
          Welcome to Math-hew, an engaging e-learning platform designed
          specifically for 4th-grade students to make learning math fun and
          interactive. With Math-hew as a friendly guide, students can explore
          the world of math while climbing leaderboards and tracking progress,
          making education an adventure rather than a chore. Let’s make
          learning math an exciting journey!
        </p>
        {/* Bouncing Logo */}
        <img
          src="/images/mathhew.png"
          alt="Math-hew Logo"
          className="bouncing-logo"
        />
      </div>

      <div id="team" className="team-section mt-20">
        <h2 className="team-title">Meet the Team 🎉</h2>
        <div className="grid-layout">
          {teamMembers.map((member, index) => (
            <div key={index} className="member-card">
              <img
                src={member.image}
                alt={member.name}
                className="member-card-img"
              />
              <div className="member-card-info">
                <h3 className="member-card-name">{member.name}</h3>
                <p className="member-card-role">{member.role}</p>
                <p className="member-card-description">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;