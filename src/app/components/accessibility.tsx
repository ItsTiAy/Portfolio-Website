"use client"

import { useState, useEffect } from "react";
import { FiSettings } from "react-icons/fi";
import { useStore } from "../components/utils/store";

const Accessibility: React.FC = () => {

    const [accessibilityMenuOpen, setMenu] = useState(false);

    const toggleMenu = () =>
    {
        setMenu(!accessibilityMenuOpen);
    };

    const { animationsEnabled, backgroundEnabled, setAnimationsEnabled, setBackgroundEnabled } = useStore();

    useEffect(() => {
        const savedAnimations = localStorage.getItem("animationsEnabled");
        const savedBackground = localStorage.getItem("backgroundEnabled");
    
        if (savedAnimations !== null) {
          setAnimationsEnabled(savedAnimations === "true");
        }
    
        if (savedBackground !== null) {
          setBackgroundEnabled(savedBackground === "true");
        }
      }, [setAnimationsEnabled, setBackgroundEnabled]);

    const handleAnimationsChange = () => 
    {
        const newValue = !animationsEnabled;
        setAnimationsEnabled(newValue);
        localStorage.setItem("animationsEnabled", newValue.toString());
    };

    const handleBackgroundChange = () => 
    {
        const newValue = !backgroundEnabled;
        setBackgroundEnabled(newValue);
        localStorage.setItem("backgroundEnabled", newValue.toString());
    };

    return (
        <div className="flex justify-center absolute top-0 right-0 m-3 p-2 z-10">

            <button onClick={() => toggleMenu()} className={`z-10 ${animationsEnabled ? "duration-500" : ""} ${accessibilityMenuOpen ? 'rotate-90' : 'rotate-0'}`}>
            <FiSettings size={24} />
            </button>

            <div className={`${accessibilityMenuOpen ? "w-52 h-24" : "w-10 h-10 pointer-events-none "} bg-slate-800 absolute top-0 right-0 rounded-[20px] shadow-lg origin-top-right ${animationsEnabled ? "duration-500" : ""} bg-clip-border overflow-hidden`}>
            <div className={`${accessibilityMenuOpen ? "opacity-100" : "opacity-0"} ${animationsEnabled ? "duration-500" : ""} absolute w-52 h-24 top-0 right-0 p-4 grid grid-rows-2 grid-cols-2 gap-4`}>
                <div className="flex items-center">Animations</div><input tabIndex={accessibilityMenuOpen ? 0 : -1} className="w-6 accent-slate-600" type="checkbox" checked={animationsEnabled} onChange={handleAnimationsChange}/>
                <div className="flex items-center">Background</div><input tabIndex={accessibilityMenuOpen ? 0 : -1} className="w-6 accent-slate-600" type="checkbox" checked={backgroundEnabled} onChange={handleBackgroundChange}/>
            </div>
            </div>
        </div>
    );
}

export default Accessibility;