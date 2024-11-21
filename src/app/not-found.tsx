import Link from 'next/link'
import Background from './components/background';

export default function NotFound() {
  return (
    <div className="fixed w-full h-screen flex items-center justify-center">
      <Background/>
      <div className="relative w-full h-screen flex items-center justify-center">
        <h1 className="text-4xl md:text-4xl lg:text-6xl font-bold pr-10 mr-10 border-r-2">404</h1>
        <p className='text-2xl mr-10'>This page could not be found. <Link className='hover:underline' href={"/"}>Go back to home</Link></p>
      </div>
    </div>
  );
}