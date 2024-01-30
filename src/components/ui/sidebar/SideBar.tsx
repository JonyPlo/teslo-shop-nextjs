'use client'

import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";

export const SideBar = () => {
  return <div className="">

    
{/* Background black */}
    <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"/>
      



    
    
    {/* Blur */}

    
    <div className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"/>
      

{/* Side Menu */}


    <nav className="fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300">
      

      <IoCloseOutline
      
        size={50}
        className="absolute top-5 right-5 cursor-pointer"
        onClick={() => console.log('click')}
      
      />


      {/* Input */}



      <div className="relative mt-14">
<IoSearchOutline size={20} className="absolute top-2 left-2"/>
        <input type="text" placeholder="Search" className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500
" />

      </div>


</nav>
      



  </div>;
};
