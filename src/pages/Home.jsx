import React from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import '../styles/Home.css';

const Home = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const [homeRef, homeInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [contactRef, contactInView] = useInView({ triggerOnce: true, threshold: 0.3 });

  const handleStartLearningClick = () => {
    if (currentUser) {
      navigate("/main-page");
    } else {
      navigate("/sign-in");
    }
  };

  // const features = [
  //   {
  //     title: "Lesson Viewing",
  //     description:
  //       "Explore math problems, topics, and trusted sources to help 4th graders master new skills.",
  //     gif: "/gifs/example.gif", 
  //   },
  //   {
  //     title: "Video Tutorials",
  //     description:
  //       "Watch engaging videos that simplify math concepts and make learning fun and interactive.",
  //     gif: "/gifs/example2.gif",
  //   },
  //   {
  //     title: "Leaderboard",
  //     description:
  //       "Compete with friends and classmates for top spots while celebrating your achievements.",
  //     gif: "/gifs/leaderboard.gif",
  //   },
  //   {
  //     title: "Quiz Games",
  //     description:
  //       "Play exciting math games like 'Memory Match' to earn points and reinforce your skills.",
  //     gif: "/gifs/quiz_games.gif",
  //   },
  //   {
  //     title: "Learning Buddy",
  //     description:
  //       "Get hints and guidance from your friendly Math-hew Learning Buddy whenever you need help.",
  //     gif: "/gifs/learning_buddy.gif",
  //   },
  //   {
  //     title: "Progress Tracking",
  //     description:
  //       "See your progress over time with charts and graphs that show how far you've come!",
  //     gif: "/gifs/progress_tracking.gif",
  //   },
  // ];

  return (
    <div ref={homeRef} className={`home-container ${homeInView ? "fade-in" : ""}`}>
      <section className="section home-section">
        <div className="home-content">
          <div className="home-logo">
            <img
              src="/images/mathhew.png"
              alt="Math-hew Mascot waving"
              className="mascot-img"
            />
          </div>
          <div className="home-text">
            <h1 className="home-title">Welcome to Math-hew!</h1>
            <p className="home-description">
              Ready to explore the amazing world of 4th Grade Mathematics?
            </p>
            <button
              className={`learn-button ${!currentUser ? "disabled" : ""}`}
              onClick={handleStartLearningClick}
            >
              Start Learning Now!
            </button>
          </div>
        </div>
      </section>
{/* 
      <section ref={featuresRef} className={`section features-section ${featuresInView ? "fade-in" : ""}`}>
        <div className="features-content">
          <h2 className="features-title">Explore Math-hew's Amazing Features!</h2>
          <p className="home-description">
            Designed to make learning math a fun-filled adventure for every 4th grader.
          </p>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`feature ${featuresInView ? "fade-in" : ""}`}
                style={{ transitionDelay: `${index * 0.2}s` }} 
              >
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="hover-window">
                  <img src={feature.gif} alt={`${feature.title} animation`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <section ref={aboutRef} id="about-us" className={`section ${aboutInView ? "fade-in" : ""}`}>
        <AboutUs />
      </section>

      <section ref={contactRef} id="contact-us" className={`section ${contactInView ? "fade-in" : ""}`}>
        <ContactUs />
      </section>
    </div>
  );
};

export default Home;
