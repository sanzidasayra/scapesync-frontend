import Image from 'next/image';
import React from 'react';

const Navbar = () => {
    return (
        <div>
            <div className='flex justify-between items-center h-[100px]'>
             <Image src="/logo.png" alt="ScapeSync Logo" width={147} height={60}  />
             <button className='px-[26px] py-2.5 bg-[#3BA334] rounded-lg text-white font-bold'>Get Started</button>
            </div>
        </div>
    );
};

export default Navbar;