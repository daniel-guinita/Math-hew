import React from "react";
import "../styles/AboutUs.css";  // Import the CSS file

const AboutUs = () => {
  // Placeholder data for team members with personalized descriptions
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
      image: "/path/to/image3.jpg",
      description:
        "Alice is responsible for the platform’s visual design and user experience, ensuring that our Math-hew platform is engaging and easy to navigate.",
    },
    {
      name: "Roy Niño Patigayon",
      role: "Full Stack Developer",
      image: "/images/roy.jpg",
      description:
        "Michael works behind the scenes, developing and maintaining the server and database to keep the platform secure and efficient.",
    },
    {
      name: "Jon Miguel Gutierrez",
      role: "Full Stack Developer",
      image: "/path/to/image5.jpg",
      description:
        "Sarah brings designs to life on screen, creating responsive and interactive features to make learning math an enjoyable experience.",
    },
  ];

  return (
    <div className="aboutus-container flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-6xl text-center">
        <h1 className="aboutus-title">
          About Math-hew
        </h1>
        <p className="aboutus-subtext">
          Welcome to Math-hew, an engaging e-learning platform designed
          specifically for 4th-grade students to make learning math fun and
          interactive. Our goal is to transform the way students approach
          mathematics, using games, challenges, and guided lessons to build
          confidence and mastery in key concepts. With Math-hew as a friendly
          guide, students can explore the world of math at their own pace while
          climbing leaderboards and tracking progress, making education an
          adventure rather than a chore. Together, let's make learning math an
          exciting journey!
        </p>

        <div id="team" className="team-section mt-20">
          <h2 className="team-title">
            Our Members
          </h2>

          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="member-card-container"
            >
              {/* Left side with card */}
              <div className="member-card-left">
                <div className="member-card">
                  <img
                    src={member.image}
                    alt={`${member.name}`}
                    className="w-full h-60 object-cover"
                  />
                  <div className="member-card-info">
                    <div className="member-card-name">
                      {member.name}
                    </div>
                    <p className="member-card-role">
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right side with personalized description */}
              <div className="member-card-right">
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
