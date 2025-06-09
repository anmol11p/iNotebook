import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { IoIosLock } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const slides = [
  {
    title: "Secure Notes",
    desc: "Your notes are encrypted and stored securely in the cloud. Only you have access.",
    img: <IoIosLock />,
  },
  {
    title: "Access Anywhere",
    desc: "Use iNotebook from any device. Your notes are always in sync and available.",
    img: <FaStar />,
  },
  {
    title: "Blazing Fast",
    desc: "Designed for speed — your notes load instantly, even with thousands of entries.",
    img: <FaLocationDot />,
  },
];

const About = () => {
  const { darkmode } = useContext(UserContext);
  const [current, setCurrent] = useState(0);
  const nextSlide = () => setCurrent((current + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((current - 1 + slides.length) % slides.length);

  return (
    <div
      className={`bg-gradient-to-br ${
        darkmode
          ? "bg-gray-950 text-white"
          : "from-blue-100 via-white to-blue-50"
      }  min-h-screen flex items-center justify-center text-gray-800`}
    >
      <div className="w-full max-w-4xl px-4 py-12 text-center relative">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-blue-800">
          About iNotebook
        </h1>

        <div
          className={`${
            darkmode ? "bg-black" : "bg-white"
          } border border-blue-100 rounded-xl p-8 shadow-xl transition-all duration-500`}
        >
          {/* <img
            src={slides[current].img}
            alt={slides[current].title}
            className="w-20 text-white h-20 mx-auto mb-6 animate-bounce"
          /> */}
          <div className="text-7xl  grid place-items-center mb-6 animate-bounce">
            <i className={darkmode ? "text-white" : "text-black"}>
              {" "}
              {slides[current].img}
            </i>
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-blue-700">
            {slides[current].title}
          </h2>
          <p className="text-lg text-gray-600">{slides[current].desc}</p>
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={prevSlide}
            className="bg-blue-200 cursor-pointer hover:bg-blue-300 text-blue-900 px-4 py-2 rounded-full font-medium transition"
          >
            ◀
          </button>
          <button
            onClick={nextSlide}
            className="bg-blue-200 cursor-pointer hover:bg-blue-300 text-blue-900 px-4 py-2 rounded-full font-medium transition"
          >
            ▶
          </button>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                current === idx ? "bg-blue-700 scale-125" : "bg-blue-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
