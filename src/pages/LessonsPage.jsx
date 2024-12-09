// import React, { useState, useEffect } from "react";
// import React from "react";
// import '../styles/video.css';

// export default function LessonsPage() {
//   const lessons = [
//     { id: 1, title: "Lesson 1: Introduction to Fractions", description: "Learn the basics of fractions." },
//     { id: 2, title: "Lesson 2: Multiplication", description: "Understand the fundamentals of multiplication." },
//   ];

//   const videos = [
//     { id: 1, title: "Video 1: Fractions Overview", description: "A video introduction to fractions.",  url:"https://www.youtube.com/embed/N3__8MmaiLE" },
//     { id: 2, title: "Video 2: Multiplication Tips", description: "Tips for quick multiplication." },
//   ];

// import React, { useState } from "react";
// import "../styles/LessonsPage.css";

// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

// const LessonsPage = ({ userRole }) => {
//   const [lessons, setLessons] = useState([]);
//   const [videos, setVideos] = useState([]);
//   const [newLesson, setNewLesson] = useState({ title: "", description: "" });
//   const [newVideo, setNewVideo] = useState({ title: "", url: "" });
//   const [selectedLesson, setSelectedLesson] = useState(null);
//   const [editLesson, setEditLesson] = useState(null);
//   const [editVideo, setEditVideo] = useState(null);
  

//   // Fetch lessons and videos
//   useEffect(() => {
//     const fetchLessonsAndVideos = async () => {
//       try {
//         const lessonsResponse = await fetch(`${API_URL}/lessons`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           },
//         });
//         const lessonsData = await lessonsResponse.json();
//         console.log("Lessons API Response:", lessonsData); // Debugging log
//         setLessons(Array.isArray(lessonsData) ? lessonsData : []);
  
//         const videosResponse = await fetch(`${API_URL}/videos`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           },
//         });
//         const videosData = await videosResponse.json();
//         setVideos(Array.isArray(videosData) ? videosData : []); // Safeguard against non-array response
//       } catch (error) {
//         console.error("Error fetching lessons or videos:", error);
//       }
//     };
  
//     fetchLessonsAndVideos();
//   }, []);
  

//   const handleAddLesson = async () => {
//     if (newLesson.title && newLesson.description) {
//       try {
//         const response = await fetch(`${API_URL}/lessons`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           },
//           body: JSON.stringify(newLesson),
//         });
//         const data = await response.json();
//         setLessons((prev) => [...prev, data]);
//         setNewLesson({ title: "", description: "" });
//       } catch (error) {
//         console.error("Error adding lesson:", error);
//       }
//     }
//   };

//   const handleEditLesson = async () => {
//     if (editLesson.title && editLesson.description) {
//       try {
//         const response = await fetch(`${API_URL}/lessons/${editLesson.id}`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           },
//           body: JSON.stringify(editLesson),
//         });
//         const updatedLesson = await response.json();
//         setLessons((prev) =>
//           prev.map((lesson) =>
//             lesson.id === updatedLesson.id ? updatedLesson : lesson
//           )
//         );
//         setEditLesson(null);
//       } catch (error) {
//         console.error("Error updating lesson:", error);
//       }
//     }
//   };

//   const handleDeleteLesson = async (id) => {
//     try {
//       await fetch(`${API_URL}/lessons/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//         },
//       });
//       setLessons((prev) => prev.filter((lesson) => lesson.id !== id));
//     } catch (error) {
//       console.error("Error deleting lesson:", error);
//     }
//   };
  

//   const handleAddVideo = async (lessonId) => {
//     if (newVideo.title && newVideo.url && lessonId) {
//       try {
//         const response = await fetch(`${API_URL}/videos`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           },
//           body: JSON.stringify({ ...newVideo, lesson_id: lessonId }),
//         });
//         const data = await response.json();
//         setVideos((prev) => [...prev, data]);
//         setNewVideo({ title: "", url: "" });
//       } catch (error) {
//         console.error("Error adding video:", error);
//       }
//     }
//   };

//   const handleEditVideo = async () => {
//     if (editVideo.title && editVideo.url) {
//       try {
//         const response = await fetch(`${API_URL}/videos/${editVideo.id}`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           },
//           body: JSON.stringify(editVideo),
//         });
//         const updatedVideo = await response.json();
//         setVideos((prev) =>
//           prev.map((video) => (video.id === updatedVideo.id ? updatedVideo : video))
//         );
//         setEditVideo(null);
//       } catch (error) {
//         console.error("Error updating video:", error);
//       }
//     }
//   };

//   const handleDeleteVideo = async (id) => {
//     try {
//       await fetch(`${API_URL}/videos/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//         },
//       });
//       setVideos((prev) => prev.filter((video) => video.id !== id));
//     } catch (error) {
//       console.error("Error deleting video:", error);
//     }
//   };
  

//   const renderLessonList = () => (
//     <div className="lesson-list-container">
//       <h1 className="page-title">Lessons & Video Tutorials</h1>
//       <div className="lesson-grid">
//         {lessons.map((lesson) => (
//           <div
//             key={lesson.id}
//             className="lesson-card"
//             onClick={() => setSelectedLesson(lesson)}
//           >
//             <h3 className="lesson-title">
//               Lesson {lesson.id}: {lesson.title}
//             </h3>
//           </div>
//         ))}
//       </div>
//       {userRole !== "student" && (
//         <div className="admin-section">
//           <h2>Add New Lesson</h2>
//           <input
//             type="text"
//             placeholder="Lesson Title"
//             value={newLesson.title}
//             onChange={(e) =>
//               setNewLesson({ ...newLesson, title: e.target.value })
//             }
//             className="input-field visible-text"
//           />
//           <textarea
//             placeholder="Lesson Description"
//             value={newLesson.description}
//             onChange={(e) =>
//               setNewLesson({ ...newLesson, description: e.target.value })
//             }
//             className="input-field visible-text"
//           />
//           <button onClick={handleAddLesson} className="add-button">
//             ➕ Add Lesson
//           </button>
//         </div>
//       )}
//     </div>
//   );

//   const renderLessonDetail = () => (
//     <div className="lesson-detail-container">
//       <button
//         className="back-button"
//         onClick={() => setSelectedLesson(null)}
//       >
//         Back to Lessons
//       </button>
//       <h2 className="lesson-detail-title">
//         Lesson {selectedLesson.id}: {selectedLesson.title}
//       </h2>
//       <p className="lesson-detail-description">
//         {selectedLesson.description}
//       </p>
//       <div className="video-section">
//         <h3>Video Tutorials</h3>
//         {videos
//           .filter((video) => video.lesson_id === selectedLesson.id)
//           .map((video) => (
//             <div key={video.id} className="video-card">
//               <h4>{video.title}</h4>
//               <iframe
//                 width="100%"
//                 height="315"
//                 src={video.url}
//                 title={video.title}
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               ></iframe>
//               {userRole !== "student" && (
//                 <>
//                 <button
//                   onClick={() => setEditLesson(selectedLesson)}
//                   className="edit-button"
//                 >
//                   Edit Lesson
//                 </button>
//                 <button
//                   onClick={() => handleDeleteLesson(selectedLesson.id)}
//                   className="delete-button"
//                 >
//                   Delete Lesson
//                 </button>
//                 </>
//               )}
//             </div>
//           ))}
//       </div>
//       {userRole !== "student" && (
//         <div className="admin-section">
//           <h2>Add Video to This Lesson</h2>
//           <input
//             type="text"
//             placeholder="Video Title"
//             value={newVideo.title}
//             onChange={(e) =>
//               setNewVideo({ ...newVideo, title: e.target.value })
//             }
//             className="input-field visible-text"
//           />
//           <input
//             type="text"
//             placeholder="Video URL"
//             value={newVideo.url}
//             onChange={(e) =>
//               setNewVideo({ ...newVideo, url: e.target.value })
//             }
//             className="input-field visible-text"
//           />
//           <button
//             onClick={() => handleAddVideo(selectedLesson.id)}
//             className="add-button"
//           >
//             ➕ Add Video
//           </button>
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="lessons-page-container">
//       {selectedLesson ? renderLessonDetail() : renderLessonList()}
//       {/* Video Tutorials Placeholder */}
//       <div className="w-full max-w-4xl mx-auto p-10 bg-orange-500 rounded-lg text-white text-2xl font-semibold text-center">
//         Video Tutorials Placeholder

//       {/* Video Tutorials Section */}
//       <div className="w-full max-w-6xl mx-auto">
//         <h2 className="text-3xl font-semibold text-orange-600 dark:text-orange-400 mb-4">Video Tutorials</h2>
//         <div className="space-y-4">
//           {videos.map((video) => (
//             <div key={video.id} className="p-8 bg-orange-50 dark:bg-orange-700 rounded-lg shadow-lg">
//               <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{video.title}</h3>
//               <p className="text-gray-700 dark:text-gray-300">{video.description}</p>
//               <div className="video-responsive">
//           <iframe 
//             width="100%" 
//             height="515" 
//             src={video.url} 
//             title={video.title} 
//             frameBorder="0" 
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
//             allowFullScreen
//           ></iframe>
//         </div>
//             </div>
//           ))}
//         </div>
//       <div className="videos-section">
//         <h2 className="section-title">🎬 Video Tutorials</h2>
//         {videos.map((video) => (
//           <div key={video.id} className="content-card">
//             <h3 className="content-title">{video.title}</h3>
//             <p className="content-description">{video.description}</p>
//           </div>
//         ))}

//       </div>
//     </div>
//   );
// };

// export default LessonsPage;
