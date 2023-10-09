// import React, { useEffect, useRef } from "react";
// import ReactPlayer from "react-player";
// import flvjs from "flv.js";
// import ReactFlvPlayer from 'react-flv-player'


// function FLVPlayer() {
  //   const videoRef = useRef(null);

  //   useEffect(() => {
  //     const videoElement = videoRef.current;

  //     const flvPlayer = flvjs.createPlayer({
  //       type: 'flv',
  //       url: 'http://127.0.0.1:4090/stream',
  //     });
  //     if (videoElement) {
  //       flvPlayer.attachMediaElement(videoElement);
  //     //   flvPlayer.load();
  //     //   flvPlayer.play();
  //     }

  //     return () => {
  //       flvPlayer && flvPlayer.destroy();
  //     };
  //   }, []);

  //   return (
  //     <div>
  //       <video ref={videoRef} controls />
  //     </div>
  //   );
  //   return (
  //     <ReactPlayer
  //       url="http://127.0.0.1:4090/stream"
  //       playing
  //       controls
  //       width="640px"
  //       height="480px"
  //     />
  //   );
//   return (
//     <>
//      <ReactFlvPlayer
//           url = "http://127.0.0.1:4090/stream"
//           heigh = "800px"
//           width = "800px"
//           isMuted={true}
//         />
//     </>
//   )
// }

// export default FLVPlayer;

import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoJS = ({ options, onReady }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
      });
    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options]);

  useEffect(() => {
    return () => {
      const player = playerRef.current;
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
}

export default VideoJS;

