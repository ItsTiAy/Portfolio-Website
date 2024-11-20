import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-tr from-blue-800 via-pink-900 to-purple-900">
      <div className="absolute w-72 h-72 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full mix-blend-hard-light filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute w-72 h-72 bg-gradient-to-r from-yellow-400 via-green-500 to-teal-500 rounded-full mix-blend-hard-light filter blur-xl opacity-70 animate-blob2"></div>
      <div className="absolute w-72 h-72 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 rounded-full mix-blend-hard-light filter blur-xl opacity-70 animate-blob3"></div>
      <div className="relative text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">Thomas Stanway</h1>
        <p className="text-lg md:text-xl">Programmer</p>
        <div className="items-center">
          <button className="mt-6 px-6 py-2 border-2 bg-transparent text-white rounded-lg hover:shadow-lg mr-2">About</button>
          <button className="mt-6 px-6 py-2 border-2 bg-transparent text-white rounded-lg hover:shadow-lg ml-2">Projects</button>
        </div>
      <Footer/>
      </div>
    </div>
  );
}
