import UnityViewer from "@/app/components/unityViewer";

export default function Page() {
  return (
    <div className="relative w-full h-svh flex items-center justify-center">
      <UnityViewer gameName="TiltMazePlus"/>
    </div>
  );
}