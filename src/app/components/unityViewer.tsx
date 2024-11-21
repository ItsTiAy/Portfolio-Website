"use client"

import React, { useEffect, useRef } from 'react';

interface UnityViewerParams {
    gameName: string;
}

const UnityViewer: React.FC<UnityViewerParams> = ({ gameName }) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {
        
        const canvas = canvasRef.current;
        
        if (!canvas) return;
        
        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
            // Mobile device style: fill the whole browser client area with the game canvas:
            const meta = document.createElement('meta');
            meta.name = 'viewport';
            meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
            document.getElementsByTagName('head')[0].appendChild(meta);
            
            canvas.style.width = "100%";
            canvas.style.height = "100%";
            canvas.style.position = "fixed";
            
            document.body.style.textAlign = "left";
        }
    
        const buildUrl = `/unity/${gameName}/`;
        
        const script = document.createElement("script");
        script.src = buildUrl + "Build/Build.loader.js";
        script.onload = () => {          
            console.log('Unity loader script loaded successfully.');
            
            window.createUnityInstance(canvas, {
                dataUrl: buildUrl + "Build/Build.data",
                frameworkUrl: buildUrl + "Build/Build.framework.js",
                codeUrl: buildUrl + "Build/Build.wasm",
                streamingAssetsUrl: "StreamingAssets",
                companyName: "DefaultCompany",
                productName: "Acerola Jam 0",
                productVersion: "0.1",
                // matchWebGLToCanvasSize: false, // Uncomment this to separately control WebGL canvas render size and DOM element size.
                // devicePixelRatio: 1, // Uncomment this to override low DPI rendering on high DPI displays.
            });
        };

        document.body.appendChild(script);

        return () => { script.remove(); };
    }, [gameName]);

  return (
    <div style={{textAlign: "center", padding: 0, border: 0, margin: 0}}>
        <canvas className="shadow-lg" id="unity-canvas" ref={canvasRef} width={1280} height={720} tabIndex={-1} style={{width: "1280px", height: "720px", background: "#CCCCCC"}}></canvas>
    </div>
  );
};

export default UnityViewer;

