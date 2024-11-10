import React from "react";

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
        "Jane leads the development team, building robust code structures and tackling complex technical challenges to keep our project on track.",
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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-orange-50 dark:from-gray-700 dark:to-gray-900 flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-6xl text-center">
        <h1 className="mt-6 text-3xl sm:text-5xl font-bold text-gray-800 dark:text-white">
          About Math-hew
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg sm:text-xl">
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

        <div id="team" className="mt-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-orange-500 dark:text-orange-300 mb-8">
            Our Members
          </h2>

          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="flex justify-center w-full max-w-5xl mb-10"
            >
              {/* Left side with card */}
              <div className="w-2/5 flex justify-end pr-6">
                <div className="bg-white dark:bg-gray-700 shadow-2xl rounded-xl overflow-hidden w-80 transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <img
                    src={member.image}
                    alt={`${member.name}`}
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-6">
                    <div className="font-bold text-xl mb-2 text-gray-800 dark:text-white">
                      {member.name}
                    </div>
                    <p className="text-orange-500 dark:text-orange-300 text-sm">
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right side with personalized description */}
              <div className="w-3/5 flex items-center pl-6">
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md">
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
