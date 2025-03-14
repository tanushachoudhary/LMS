import React from "react";

const ViewProfile = () => {
  const user = {
    name: "John Doe",
    profilePic: "https://via.placeholder.com/150",
    coursesEnrolled: [
      {
        title: "React for Beginners",
        thumbnail: "https://via.placeholder.com/100",
      },
      {
        title: "Advanced Node.js",
        thumbnail: "https://via.placeholder.com/100",
      },
      {
        title: "MongoDB Essentials",
        thumbnail: "https://via.placeholder.com/100",
      },
      {
        title: "MongoDB Essentials",
        thumbnail: "https://via.placeholder.com/100",
      },
    ],
    wishlist: [
      {
        title: "GraphQL Masterclass",
        thumbnail: "https://via.placeholder.com/100",
      },
      {
        title: "Docker & Kubernetes",
        thumbnail: "https://via.placeholder.com/100",
      },
      {
        title: "Python Data Science",
        thumbnail: "https://via.placeholder.com/100",
      },
      {
        title: "Python Data Science",
        thumbnail: "https://via.placeholder.com/100",
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-12 m-6 max-w-5xl w-full text-center">
        <img
          className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500"
          src={user.profilePic}
          alt="Profile"
        />
        <h2 className="text-2xl font-semibold mt-4">{user.name}</h2>

        <div className="mt-4 text-left">
          <h3 className="text-xl font-semibold">Courses you're enrolled in</h3>
          <div className="grid grid-cols-2 gap-6 text-gray-600 my-4">
            {user.coursesEnrolled.map((course, index) => (
              <div
                key={index}
                className="bg-gray-200 p-2 rounded-md text-center flex flex-col items-center"
              >
                <img
                  className="w-16 h-16 rounded-md"
                  src={course.thumbnail}
                  alt={course.title}
                />
                <p className="mt-2">{course.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 text-left">
          <h3 className="text-xl font-semibold">Wishlist</h3>
          <div className="grid grid-cols-2 gap-6 text-gray-600 my-4">
            {user.wishlist.map((course, index) => (
              <div
                key={index}
                className="bg-gray-200 p-2 rounded-md text-center flex flex-col items-center"
              >
                <img
                  className="w-16 h-16 rounded-md"
                  src={course.thumbnail}
                  alt={course.title}
                />
                <p className="mt-2">{course.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
