import React, { useRef, useState } from "react";
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa";
const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<null | any>(null);

  const handleTogglePlay = () => {
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };
  return (
    <div className="relative overflow-hidden mb-5 mt-3 max-h-[80vh] rounded-xl   ">
      <video
        className="overflow-hidden rounded-xl"
        data-src="https://lscoecomm.scene7.com/is/content/lscoecomm/24_H2_SPM_MAY_LAUNCH_D_HP_A_MOTION-0x1080-4991k"
        poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        aria-label=""
        ref={videoRef}
        autoPlay={true}
        playsInline={true}
        loop={true}
        data-v-1bff4e54=""
        src="https://lscoecomm.scene7.com/is/content/lscoecomm/24_H2_SPM_MAY_LAUNCH_D_HP_A_MOTION-0x1080-4991k"
        lsco-lazyload="loaded"
      ></video>
      {/* <div className="absolute top-[40%] flex items-center justify-center w-full font-semibold uppercase  ">
        <div className="bg-[rgba(0,0,0,.3)] w-fit sm:p-3 p-2 backdrop-blur-sm  text-center gap-2 flex-col flex rounded-md text-3xl max-md:text-2xl max-sm:text-sm ">
          <p className=" text-slate-200">new summer collection</p>
          <p className="text-white ">SOON</p>
        </div>
      </div> */}

      <button
        className="absolute right-4 bottom-4 bg-[rgba(0,0,0,0.2)] p-2 rounded-full backdrop-blur-md"
        onClick={handleTogglePlay}
      >
        {isPlaying ? (
          <FaPause className="text-xl text-slate-200" />
        ) : (
          <FaPlay className="text-xl text-slate-200" />
        )}
      </button>
    </div>
  );
};

export default VideoPlayer;
