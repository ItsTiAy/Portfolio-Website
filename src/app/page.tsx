'use client'

import { SetStateAction, useState } from "react";
import Footer from "@/app/components/footer";
import ExperienceTemplate from "@/app/components/experienceTemplate";
import ProjectTemplate from "@/app/components/projectTemplate";

import { useStore } from "@/app/components/utils/store";

export default function Home() {

  const { animationsEnabled } = useStore();
  const [activeButton, setActiveButton] = useState(0);

  const handleClick = (state: SetStateAction<number>) => 
  {
    setActiveButton(state);
  };

  return (
      <div className="fixed w-full h-svh flex items-center justify-center content">
        <div className={`flex flex-col h-svh max-h-[40rem] text-center justify-center p-5 ${animationsEnabled ? "duration-500" : ""} 
          ${activeButton == 1 ? "translate-x-[100vw]" : ""}
          ${activeButton == 2 ? "translate-y-[100vh]" : ""}
          ${activeButton == 3 ? "translate-x-[-100vw]" : ""}`}>
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold mb-4">Thomas Stanway</h1>
          <p className="text-white text-lg md:text-xl">Software Developer</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
            <button tabIndex={activeButton == 0 ? 0 : -1} className={`py-2 border-2 bg-transparent rounded-lg hover:shadow-lg transition-all ${animationsEnabled ? "duration-300" : ""}`} onClick={() => handleClick(1)}>About</button>
            <button tabIndex={activeButton == 0 ? 0 : -1} className={`py-2 border-2 bg-transparent rounded-lg hover:shadow-lg transition-all ${animationsEnabled ? "duration-300" : ""}`} onClick={() => handleClick(2)}>Experience</button>
            <button tabIndex={activeButton == 0 ? 0 : -1} className={`py-2 border-2 bg-transparent rounded-lg hover:shadow-lg transition-all ${animationsEnabled ? "duration-300" : ""}`} onClick={() => handleClick(3)}>Projects</button>
          </div>
        <Footer button={activeButton}/>
        </div>

        <div className={`flex flex-col h-svh max-h-[40rem] justify-center p-5 absolute ${animationsEnabled ? "duration-500" : ""} ${activeButton == 1 ? "" : "absolute translate-x-[-100vw]"}`}>
          <h1 className="text-4xl md:text-4xl lg:text-6xl font-bold">About</h1>
          <div className="my-4 overflow-y-auto snap-y max-w-3xl">
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
          <button tabIndex={activeButton == 1 ? 0 : -1} className={`w-32 py-2 border-2 bg-transparent text-white rounded-lg hover:shadow-lg transition-all ${animationsEnabled ? "duration-300" : ""}`} onClick={() => handleClick(0)}>Back</button>
        </div>

        <div className={`flex flex-col h-svh max-h-[40rem] justify-center p-5 absolute ${animationsEnabled ? "duration-500" : ""} ${activeButton == 2 ? "" : "translate-y-[-100vh]"}`}>
          <h1 className="text-4xl md:text-4xl lg:text-6xl font-bold">Experience</h1>
          <div className="my-4 overflow-y-auto snap-y max-w-3xl">
            <ExperienceTemplate date="July 2024 - Present" title="Software Developer Work Experience" company="Thoughtbubble" description="Web development using ColdFusion and Bootstrap. Updating existing websites and gaining knowledge and experience of current web development tools, including database connectivity and customising video player features."/>
            <ExperienceTemplate date="August - October 2023" title="Games Programmer Internship" company="Huey Games" description="Working as part of a programming team developing a new puzzle-platforming game called Mechinus. My role was to implement and improve some of the game mechanics, using design documentation and responding to feedback from senior game designers. As well as gaining more experience with the Unity games engine, I used Discord, Plastic SCM, and Google Workspace to collaborate with my colleagues."/>
          </div>
          <button tabIndex={activeButton == 2 ? 0 : -1} className={`w-32 py-2 border-2 bg-transparent text-white rounded-lg hover:shadow-lg transition-all ${animationsEnabled ? "duration-300" : ""}`} onClick={() => handleClick(0)}>Back</button>
        </div>

        <div className={`flex flex-col h-svh max-h-[40rem] justify-center p-5 absolute ${animationsEnabled ? "duration-500" : ""} ${activeButton == 3 ? "" : "translate-x-[100vw]"}`}>
          <h1 className="text-4xl md:text-4xl lg:text-6xl font-bold">Projects</h1>
          <div className="my-4 overflow-y-auto snap-y max-w-3xl">
            <ProjectTemplate title="An AI-Enabled Top-Down Shooter Game" 
                            description={`A game based on the minigame "Tanks" from Wii Play created as a final year university project made using the Unity game engine.` + activeButton}
                            link="/games/topdownshooter"
                            source="https://github.com/ItsTiAy/Final-Year-Project"
                            button={activeButton}/>

            <ProjectTemplate title="Portfolio Website" 
                            description="This website crated using Next.js and Tailwind css. The website also allows you to view and play some of the game projects that I have created." 
                            source="https://github.com/ItsTiAy/Portfolio-Website"
                            button={activeButton}/>
                
            <ProjectTemplate title="Recipe Storing App" 
                            description="An app created using the .NET MAUI cross-platform framework to store and view recipes. Recipes are stored locally inside a database using SQLite and can be easily viewed and searched for on the app's home page." 
                            button={activeButton}/>

            <ProjectTemplate title="Polygon Triangulation" 
                            description='Implementation of a triangulation algorithm using a sweep line approach. This allows the algorithm to work with more complex polygons such as ones with holes. Created using the Unity game engine.' 
                            button={activeButton}/>

            <ProjectTemplate title="Lunar Launch - SpeedJam #3 Game" 
                            description='A game created in 72 hours on the theme "Gravity / Zero Gravity" for SpeedJam #3 called "Lunar Launch". Your goal is to navigate the lunar lander around the asteroids upwards to the goal as quick as possible. Created using the Unity game engine.'
                            link="/games/lunarlaunch"
                            button={activeButton}/>
            
            <ProjectTemplate title="Tilt Maze Plus - Acerola Jam 0" 
                            description='A game created in 2 weeks on the theme "Aberration" for the Acerola Jam 0 called "Tilt Maze Plus". Each level of the game uses the same maze layout but changes an aspect of the gameplay in unique way. This was created using the Unity game engine.' 
                            link="/games/tiltmazeplus"
                            button={activeButton}/>

            <ProjectTemplate title="Vector Display Effect" 
                            description="An effect to mimic the look of a vector monitor but allow for more complex geometry to be drawn to the screen such as 3D shapes. Made using the Unity game engine."
                            button={activeButton}/>
            
            <ProjectTemplate title="A 3D Web Application" 
                            description='A website with 3D elements created using HTML5, CSS3, X3D (X3DOM), JavaScript, jQuery, Bootstrap, AJAX, PHP, SQLite, all configured in an MVC design pattern. Models were created using Autodesk 3ds Max and Blender. Created as coursework at university.'
                            source="https://github.com/ItsTiAy/Web-3D-Applications"
                            button={activeButton}/>

            <ProjectTemplate title="A Networked Multiplayer Drawing Gamee" 
                            description='A game based on "Pictionary" created for an A-level project made using the Unity game engine.'
                            button={activeButton}/>
          </div>
          <button tabIndex={activeButton == 3 ?   0 : -1} className={`w-32 py-2 border-2 bg-transparent text-white rounded-lg hover:shadow-lg transition-all ${animationsEnabled ? "duration-300" : ""}`} onClick={() => handleClick(0)}>Back</button>
        </div>
      </div>
  );
}