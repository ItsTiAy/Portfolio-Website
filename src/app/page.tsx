'use client'

import Footer from "./components/footer";
import ExperienceTemplate from "./components/experienceTemplate";
import { useState } from "react";
import ProjectTemplate from "./components/projectTemplate";

export default function Home() {

  const [activeButton, setActiveButton] = useState(0);

  const handleClick = (state) => {
    setActiveButton(state);
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-tr from-blue-800 via-pink-900 to-purple-900">
      <div className="absolute w-72 h-72 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full mix-blend-hard-light filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute w-72 h-72 bg-gradient-to-r from-yellow-400 via-green-500 to-teal-500 rounded-full mix-blend-hard-light filter blur-xl opacity-70 animate-blob2"></div>
      <div className="absolute w-72 h-72 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 rounded-full mix-blend-hard-light filter blur-xl opacity-70 animate-blob3"></div>
      
      <div className={`m-4 absolute text-center transition-all duration-500 
        ${activeButton == 1 ? "translate-x-[100vw]" : ""}
        ${activeButton == 2 ? "translate-y-[100vh]" : ""}
        ${activeButton == 3 ? "translate-x-[-100vw]" : ""}`}>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">Thomas Stanway</h1>
        <p className="text-lg md:text-xl">Software Developer</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          <button className={`py-2 border-2 bg-transparent text-white rounded-lg hover:shadow-lg transition-all duration-300`} onClick={() => handleClick(1)}>About</button>
          <button className={`py-2 border-2 bg-transparent text-white rounded-lg hover:shadow-lg transition-all duration-300`} onClick={() => handleClick(2)}>Experience</button>
          <button className={`py-2 border-2 bg-transparent text-white rounded-lg hover:shadow-lg transition-all duration-300`} onClick={() => handleClick(3)}>Projects</button>
        </div>
      <Footer/>
      </div>

      <div className={`m-4 absolute transition-all duration-500 ${activeButton == 1 ? "" : "absolute translate-x-[-100vw]"}`}>
        <h1 className="text-4xl md:text-4xl lg:text-6xl font-bold">About</h1>
        <div className="container mx-auto mb-4">
          <p className="mt-4 max-w-3xl mx-auto">
            I am a graduate from the University of Sussex with a first class degree in Computer Science.
          </p>
          <p className="mt-4 max-w-3xl mx-auto">
            I am a technically skilled, creative, and diligent individual and I have the ability to learn new technical skills quickly and effectively. I can think analytically and logically and enjoy solving problems.
          </p>
          <p className="mt-4 max-w-3xl mx-auto">
            I have extensive experience using the Unity game engine coding in C# as well as knowledge of Java, JavaScript, Python, C, C++, Coldfusion, PHP, and MySQL, along with using Github for version control. 
          </p>
          </div>
        <button className={`w-32 py-2 border-2 bg-transparent text-white rounded-lg hover:shadow-lg transition-all duration-300`} onClick={() => handleClick(0)}>Back</button>
      </div>

      <div className={`m-4 absolute transition-all duration-500 ${activeButton == 2 ? "" : "translate-y-[-100vh]"}`}>
        <h1 className="text-4xl md:text-4xl lg:text-6xl font-bold">Experience</h1>
        <div className="max-h-96 mt-4 mb-4 overflow-y-auto snap-y">
          <ExperienceTemplate date="July 2024 - Present" title="Software Developer" company="Thoughtbubble" description="Dont forget to put a descripton here"/>
          <ExperienceTemplate date="August - October 2023" title="Games programmer internship" company="Huey Games" description="Working as part of a programming team developing a new puzzle-platforming game called Mechinus. My role was to implement and improve some of the game mechanics, using design documentation and responding to feedback from senior game designers. As well as gaining more experience with the Unity games engine, I used Discord, Plastic SCM, and Google Workspace to collaborate with my colleagues."/>
        </div>
        <button className={`w-32 py-2 border-2 bg-transparent text-white rounded-lg hover:shadow-lg transition-all duration-300`} onClick={() => handleClick(0)}>Back</button>
      </div>

      <div className={`m-4 absolute transition-all duration-500 ${activeButton == 3 ? "" : "translate-x-[100vw]"}`}>
        <h1 className="text-4xl md:text-4xl lg:text-6xl font-bold">Projects</h1>
        <div className="max-h-96 mt-4 mb-4 overflow-y-auto snap-y max-w-3xl">
          <ProjectTemplate title="An AI-Enabled Top-Down Shooter Game" 
                          description='A game based on the minigame "Tanks" from Wii Play created as a final year university project made using the Unity game engine.' 
                          link="/games/topdownshooter"/>

          <ProjectTemplate title="Recipe Storing App" 
                          description="An app created using the .NET MAUI cross-platform framework to store and view recipes. Recipes are stored locally inside a database using SQLite and can be easily viewed and searched for on the app's home page." 
                          link=""/>

          <ProjectTemplate title="Polygon Triangulation" 
                          description='Implementation of a triangulation algorithm using a sweep line approach. This allows the algorithm to work with more complex polygons such as ones with holes. Created using the Unity game engine.' 
                          link=""/>

          <ProjectTemplate title="Lunar Launch - SpeedJam #3 Game" 
                          description='A game created in 72 hours on the theme "Gravity / Zero Gravity" for SpeedJam #3 called "Lunar Launch". Your goal is to navigate the lunar lander around the asteroids upwards to the goal as quick as possible. Created using the Unity game engine.'
                          link="/games/lunarlaunch"/>
          
          <ProjectTemplate title="Tilt Maze Plus - Acerola Jam 0" 
                          description='A games created in 2 weeks on the theme "Aberration" for the Acerola Jam 0 called "Tilt Maze Plus". Each level of the game uses the same maze layout but changes an aspect of the gameplay in unique way. This was created using the Unity game engine.' 
                          link="/games/tiltmazeplus"/>

          <ProjectTemplate title="Vector Display Effect" 
                          description="An effect to mimic the look of a vector monitor but allow for more complex geometry to be drawn to the screen such as 3D shapes. Made using the Unity game engine."
                          link=""/>
          
          <ProjectTemplate title="A 3D Web Application" 
                          description='A website with 3D elements created using HTML5, CSS3, X3D (X3DOM), JavaScript, jQuery, Bootstrap, AJAX, PHP, SQLite, all configured in an MVC design pattern. Models were created using Autodesk 3ds Max and Blender. Created as coursework at university.' 
                          link=""/>

          <ProjectTemplate title="A Networked Multiplayer Drawing Gamee" 
                          description='A game based on "Pictionary" created for an A-level project made using the Unity game engine.'
                          link=""/>
        </div>
        <button className={`w-32 py-2 border-2 bg-transparent text-white rounded-lg hover:shadow-lg transition-all duration-300`} onClick={() => handleClick(0)}>Back</button>
      </div>
    </div>
  );
}
// Need to mark buttons off screen as not interactable or something
// Need to move button stuff so whole page isnt use client