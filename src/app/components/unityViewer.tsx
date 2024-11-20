"use client"

import React, { useEffect, useRef } from 'react';
import './../../../public/unity/TemplateData/style.css';

interface UnityViewerParams {
    gameName: string;
}

const UnityViewer: React.FC<UnityViewerParams> = ({ gameName }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const loadingBarRef = useRef<HTMLDivElement>(null);
    const progressBarFullRef = useRef<HTMLDivElement>(null);
    const fullscreenButtonRef = useRef<HTMLDivElement>(null);
    const warningBannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
    
        const container = containerRef.current;
        const canvas = canvasRef.current;
        const loadingBar = loadingBarRef.current;
        const progressBarFull = progressBarFullRef.current;
        const fullscreenButton = fullscreenButtonRef.current
        const warningBanner = warningBannerRef.current;

        if (!container || !canvas || !loadingBar || !progressBarFull || !fullscreenButton || !warningBanner) return;

        function unityShowBanner(msg, type)
        {
            function updateBannerVisibility()
            {
                warningBanner.style.display = warningBanner?.children.length ? 'block' : 'none';
            }
            const div = document.createElement('div');
            div.innerHTML = msg;
            warningBanner.appendChild(div);
            if (type == 'error') 
            {
                div.setAttribute("style", 'background: red; padding: 10px;');
            }
            else 
            {
                if (type == 'warning') div.setAttribute("style", 'background: yellow; padding: 10px;');
                setTimeout(function() {
                warningBanner.removeChild(div);
                updateBannerVisibility();
                }, 5000);
            }
            updateBannerVisibility();
        }
    
        const buildUrl = `/unity/${gameName}/Build`;
        const loaderUrl = buildUrl + "/Builds.loader.js";
        const config = {
            dataUrl: buildUrl + "/Builds.data.unityweb",
            frameworkUrl: buildUrl + "/Builds.framework.js.unityweb",
            codeUrl: buildUrl + "/Builds.wasm.unityweb",
            streamingAssetsUrl: "/unity/StreamingAssets",
            companyName: "DefaultCompany",
            productName: "Final Year Project",
            productVersion: "0.1.1",
            showBanner: unityShowBanner,
        };
    
        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
        {
            const meta = document.createElement('meta');
            meta.name = 'viewport';
            meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
            document.getElementsByTagName('head')[0].appendChild(meta);
            container.className = "unity-mobile";
            canvas.className = "unity-mobile";
        
            unityShowBanner('WebGL builds are not supported on mobile devices.', String);
        } 
        else 
        {
            canvas.style.width = "960px";
            canvas.style.height = "540px";
        }
    
        loadingBar.style.display = "block";
    
        const script = document.createElement("script");
        script.src = loaderUrl;
        script.onload = () => {
            (window as any).createUnityInstance(canvas, config, (progress: number) => {
                progressBarFull.style.width = 100 * progress + "%";
                console.log(100 * progress);
            }).then((unityInstance: { SetFullscreen: (arg0: number) => void; }) => {
            console.log("Hi");
            loadingBar.style.display = "none";
            fullscreenButton.onclick = () => {
            unityInstance.SetFullscreen(1);
            };
        }).catch((message: unknown) => {
            console.log("Error :(")
            alert(message);
        });
        };
        document.body.appendChild(script);
    }, []);

  return (
    <div id="unity-container" ref={containerRef} className="unity-desktop absolute shadow-2xl">
      <canvas id="unity-canvas" ref={canvasRef} width={960} height={540}></canvas>
      <div id="unity-loading-bar" ref={loadingBarRef}>
        <div id="unity-logo"></div>
        <div id="unity-progress-bar-empty">
          <div id="unity-progress-bar-full" ref={progressBarFullRef}></div>
        </div>
      </div>
      <div id="unity-warning" ref={warningBannerRef}></div>
      <div id="unity-footer" className="hidden">
        <div id="unity-webgl-logo"></div>
        <div id="unity-fullscreen-button" ref={fullscreenButtonRef}></div>
      </div>
    </div>
  );
};

export default UnityViewer;

