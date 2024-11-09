import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-200 to-orange-100 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-10 text-center dark:text-white">
        <h1 className="text-4xl sm:text-5xl font-bold text-orange-600 dark:text-orange-300 mb-8">
          Contact Us
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
          We’re here to support you on every step of your learning journey—reach out to us anytime!
        </p>

        {/* Contact Information with Icons */}
        <div className="text-left space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-orange-500 dark:text-orange-300 mb-3">
              Contact Information
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 flex items-center justify-center sm:justify-start">
              <FaEnvelope className="text-orange-500 dark:text-orange-300 mr-2" />
              <a
                href="mailto:mathhew.citu@gmail.com"
                className="hover:underline"
              >
                mathhew.citu@gmail.com
              </a>
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 flex items-center justify-center sm:justify-start">
              <FaPhone className="text-orange-500 dark:text-orange-300 mr-2" />
              <a href="tel:+1234567890" className="hover:underline">
                09090909090
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-orange-500 dark:text-orange-300 mb-3">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              View our official social media platforms!
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-500"
              >
                <FaTwitter />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-800"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-5xl mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-10 dark:text-white">
        <h2 className="text-3xl font-bold text-orange-500 dark:text-orange-300 mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6 text-left">
          <p className="text-xl font-semibold">How does Math-hew help students improve their math skills?</p>
          <p className="text-lg text-gray-300">
          By using challenges and guided tutorials, Math-hew reinforces key concepts in a fun way, 
          allowing students to learn at their own pace and gain confidence in their abilities.
          </p>
          <p className="text-xl font-semibold">Can parents track student progress in Math-hew?</p>
          <p className="text-lg text-gray-300">
          Yes! Math-hew includes a progress tracking feature that provides visual reports on a student’s
          performance over time. Parents can monitor milestones, identify areas where students may need
          extra help, and celebrate achievements along the learning journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
