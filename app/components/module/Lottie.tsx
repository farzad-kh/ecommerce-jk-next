"use client"
import React from 'react';
import {Player} from "@lottiefiles/react-lottie-player"
import AnimationLogo from "../../../public/Animation.json"
const Lottie = () => {
    return (
        <div className='max-sm:w-[300px]'>
            <Player autoplay loop src={AnimationLogo}/>
        </div>
    );
};

export default Lottie;