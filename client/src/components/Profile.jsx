// import React, { useState, useEffect } from "react";
// import api from "../api";

// TO MAKE PROFILE - Uncomment <Route path="/profile" element={<ProfilePicture />} />   on App.jsx

//Create new function to upload profile pictures.
// conts ProfilePicture    = () => { const [profilePhoto, setprofilePhoto] = useState([]);
// useEffect(() => {}
// };

// const SubscribedCourses = () => {
//   const [subscribedCourses, setSubscribedCourses] = useState([]);

//   useEffect(() => {
//     const fetchSubscribedCourses = async () => {
//       try {
//         const response = await api.get('/api/subscribed-courses');
//         setSubscribedCourses(response.data);
//       } catch (error) {
//         console.error('Failed to fetch subscribed courses', error);
//       }
//     };

//     fetchSubscribedCourses();
//   }, []);

//   return (
//     <div>
//       <h2>My Courses</h2>
//       <ul>
//         {subscribedCourses.map((course) => (
//           <li key={course.id}>{course.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProfilePicture;
