import React from "react";

const styles = {
  title: {
    color: "#ff5733",
    marginBottom: "0.5rem",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  description: {
    color: "black",
    marginBottom: "1rem",
    fontSize: "1.125rem",
  },
  card: {
    padding: "1.5rem",
    textAlign: "left",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "1rem",
    backgroundImage: "linear-gradient(to right, #ffffff, #f9fafb)",
    transition: "transform 0.3s, box-shadow 0.3s",
    display: "flex",
    alignItems: "center",
    marginBottom: "1.5rem",
    overflow: "hidden",
    position: "relative",
    border: "1px solid #E5E7EB",
  },
  cardHover: {
    transform: "translateY(-10px)",
    boxShadow: "0 12px 20px rgba(0, 0, 0, 0.2)",
  },
  cardBefore: {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("/path-to-your-pattern-image.png")', // Update this path if you have a pattern image
    opacity: 0.1,
    zIndex: 0,
  },
  content: {
    marginLeft: "1rem",
    zIndex: 1, // Ensure content is above background pattern
  },
};

const FeatureCard = ({ title, description }) => {
  return (
    <div
      className="hover:transform hover:-translate-y-2 hover:shadow-2xl transition-transform duration-300 relative"
      style={styles.card}
    >
      <div style={styles.cardBefore}></div>
      <div style={styles.content}>
        <h5 style={styles.title}>{title}</h5>
        <p style={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default function Features() {
  const features = [
    {
      title: "Lesson Viewing",
      description:
        "Students can see math problems, topics, sources, etc. where the 4th graders can learn from trusted sources.",
    },
    {
      title: "Chatbot",
      description:
        "Use a chatbot system that can answer students' questions about math topics, offer hints when they're stuck, and provide explanations for specific problems.",
    },
    {
      title: "Video Tutorials",
      description:
        "Create short segments/videos with the help of visuals to explain math concepts. This keeps students interested and helps them visualise abstract ideas.",
    },
    {
      title: "Quiz Games",
      description:
        "Integrate games where students earn points to keep the engagement high. Games such as ‘Math Memory Match’ where students have to flip over cards and match related pairs.",
    },
    {
      title: "Learning Buddy",
      description: "Developed a Learning Buddy feature that offers hints when students struggle with a problem.",
    },
    {
      title: "Progress Tracking",
      description:
        "Implement a dashboard where students can track their performance over time. Provide visual representations (graphs, charts) of their progress in different areas.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-red-50 dark:from-gray-700 dark:to-gray-900 flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-6xl text-center">
        <h2 className="mt-6 text-3xl sm:text-5xl font-bold text-gray-800 dark:text-white">
          Features Tailored for Young Learners
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg sm:text-xl">
        Math-hew’s features are crafted to turn learning into an adventure. Explore
        our interactive lessons, games, and tools that make understanding math easy,
        fun, and rewarding for every student.
        </p>
        <div className="mt-20 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
}
