import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <div className='bg-[#0F3B34]'>
            <div>
                <div className='flex items-center gap-8 max-w-[104.9rem] mx-auto pt-[6.38rem]'>
                <Image src="/assets/Footer-logo.png" alt="ScapeSync Logo" height={76} width={207} />

                <div className='max-w-[25.25rem] mr-[7.94rem] ml-[4.63rem]'>
                    <p className='text-[#CFD8D6] font-medium text-[16px]'>Your all-in-one platform for job scheduling, employee management, and client service built to keep your business running smoothly from anywhere.</p>
                </div>
                <div className='flex gap-5'>
                   <Link href="https://www.apple.com/app-store/" target='_blank'><Image src="/assets/App-store.png" alt="App Store" height={60} width={170} /></Link>
                   <Link href="https://play.google.com/store" target='_blank'><Image src="/assets/Playstore.png" alt="Play Store" height={60} width={161} /></Link>
                </div>
            </div>
            </div>
            <div className='flex gap-8 mt-[6.2rem] max-w-[104.9rem] mx-auto mb-[3.5rem]'>
                <Link href="https://www.youtube.com/" target='_blank'><Image src="/assets/youtube.png" alt="Privacy Policy" height={17} width={24} /></Link>
                <Link href="https://x.com/SayraSanzida" target='_blank'><Image src="/assets/X.png" alt="X" height={17} width={24} /></Link>
                <Link href="https://www.facebook.com/sanzida.sayra" target='_blank'><Image src="/assets/facebook.png" alt="Facebook" height={17} width={24} /></Link>
                <Link href="https://www.instagram.com/" target='_blank'><Image src="/assets/instagram.png" alt="Instagram" height={17} width={24} /></Link>
            </div>

            <div className="border-t border-[#E5E5E5] " />

            <div>
                <p className='text-[#E5E5E5] max-w-[104.9rem] mx-auto'>© 2021-2025, ScapeSync. All Rights Reserved.</p>
            </div>
            
        </div>
    );
};

export default Footer;