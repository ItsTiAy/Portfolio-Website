import Background from "@/app/components/background";
import UnityViewer from "@/app/components/unityViewer";

export default function Page() {
  return (
    <div className="fixed w-full h-screen flex items-center justify-center">
      <Background/>
      <div className="relative w-full h-screen flex items-center justify-center">
        <UnityViewer gameName="LunarLaunch"/>
      </div>
    </div>
  );
}