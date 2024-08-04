import React from "react";
import { TbActivityHeartbeat } from "react-icons/tb";
import { IoLogoReact } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <>
      <div className="w-[90%] mx-auto">
        <div className="2xl:container 2xl:mx-auto lg:mt-15 lg:px-5 md:mt-10 md:px-6 py-9 px-4">
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="w-full lg:w-5/12 flex flex-col justify-center">
              <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4 dark:text-white">
                About Us
              </h1>
              <p className="font-normal text-base leading-6 text-gray-600 dark:text-white">
                This is blog is a place where you can find all the latest news
                and updates about the latest technologies, trends, and
                innovations in the world of technology. We are dedicated to
                providing our readers with the most up-to-date information and
                insights on the latest technologies, trends, and innovations in
                the world of technology. the users can create their own blog and
                post their own blogs and share their knowledge with others.
              </p>
            </div>
            <div className="w-full lg:w-8/12 ">
              <img
                className="w-full h-full"
                src="https://i.ibb.co/FhgPJt8/Rectangle-116.png"
                alt="A group of People"
              />
            </div>
          </div>

          <div className="flex lg:flex-row flex-col gap-8 pt-12">
            <div className="w-full lg:w-5/12 flex flex-col justify-center">
              <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4 dark:text-white">
                Our Story
              </h1>
              <p className="font-normal text-base leading-6 text-gray-600 dark:text-white ">
                This is an demo blog website created by a student. some of the
                component are taken from the website and some are made by me. i
                created this blog website to share my knowledge with others and
                to learn about the reactjs and Tailwind css and i hope this blog
                website will be helpful for you.
              </p>
            </div>
            <div className="w-auto lg:pt-8">
              <div className="grid md:grid-cols-2 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md ">
                <div className="p-4 pb-6 flex justify-center flex-col items-center">
                  <img
                    className="md:block hidden"
                    src="https://i.ibb.co/FYTKDG6/Rectangle-118-2.png"
                    alt="Alexa featured Img"
                  />
                  <img
                    className="md:hidden block"
                    src="https://i.ibb.co/zHjXqg4/Rectangle-118.png"
                    alt="Alexa featured Img"
                  />
                  <p className="font-medium text-xl leading-5 text-gray-800 mt-4 dark:text-white">
                    Alexa
                  </p>
                </div>

                <div className="p-4 pb-6 flex justify-center flex-col items-center">
                  <img
                    className="md:block hidden"
                    src="https://i.ibb.co/7nSJPXQ/Rectangle-121.png"
                    alt="Elijah featured img"
                  />
                  <img
                    className="md:hidden block"
                    src="https://i.ibb.co/ThZBWxH/Rectangle-121.png"
                    alt="Elijah featured img"
                  />
                  <p className="font-medium text-xl leading-5 text-gray-800 mt-4 dark:text-white">
                    Elijah
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="text-gray-500 dark:bg-[#181818] body-font">
          <div className="container px-5 mt-5 mx-auto">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-center text-white mb-20">
              Blog
            </h1>
            <div className="flex flex-wrap m-2 md:space-y-0 space-y-6 -mt-16">
              <div className="p-4 md:w-1/3 flex">
                <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-gray-800 text-indigo-400 mb-4 flex-shrink-0">
                  <TbActivityHeartbeat size={24} />
                </div>
                <div className="flex-grow pl-6">
                  <h2 className="dark:text-white text-lg title-font font-medium mb-2">
                    Shooting Stars
                  </h2>
                  <p className="leading-relaxed text-base">
                    Blue bottle crucifix vinyl post-ironic four dollar toast
                    vegan taxidermy. Gastropub indxgo juice poutine, ramps
                    microdosing banh mi pug VHS try-hard ugh iceland kickstarter
                    tumblr live-edge tilde.
                  </p>
                  <a className="mt-3 text-indigo-400 inline-flex items-center">
                    Learn More{" "}
                    <FaLongArrowAltRight size={20} className="mt-1 ml-1" />
                  </a>
                </div>
              </div>
              <div className="p-4 md:w-1/3 flex">
                <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-gray-800 text-indigo-400 mb-4 flex-shrink-0">
                  <IoLogoReact size={24} />
                </div>
                <div className="flex-grow pl-6">
                  <h2 className="dark:text-white text-lg title-font font-medium mb-2">
                    The Catalyzer
                  </h2>
                  <p className="leading-relaxed text-base">
                    React apps are made out of components. A component is a
                    piece of the UI (user interface) that has its own logic and
                    appearance. A component can be as small as a button, or as
                    large as an entire page.
                  </p>
                  <Link
                    to={"https://react.dev/"}
                    target="_blank"
                    className="mt-3 text-indigo-400 inline-flex items-center"
                  >
                    Learn More
                    <FaLongArrowAltRight size={20} className="mt-1 ml-1" />
                  </Link>
                </div>
              </div>
              <div className="p-4 md:w-1/3 flex">
                <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-gray-800 text-indigo-400 mb-4 flex-shrink-0">
                  <FiUser size={24} />
                </div>
                <div className="flex-grow pl-6">
                  <h2 className="dark:text-white text-lg title-font font-medium mb-2">
                    Prasanth
                  </h2>
                  <p className="leading-relaxed text-base">
                    As a passionate BCA student and web developer, My journey in
                    web development has been an exciting blend of creativity and
                    problem-solving. I love crafting user-friendly interfaces
                    and bringing ideas to life through code.
                  </p>

                  <Link
                    to={"https://github.com/prasanth0402"}
                    target="_blank"
                    className="mt-3 text-indigo-400 inline-flex items-center"
                  >
                    Learn More
                    <FaLongArrowAltRight size={20} className="mt-1 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
