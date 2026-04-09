import React, { FC, useEffect, useState } from "react";
import axios from "axios";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    console.log("=== CoursePlayer Debug ===");
    console.log("Received videoUrl:", videoUrl);
    console.log("videoUrl type:", typeof videoUrl);
    
    axios
      .post("http://localhost:8000/api/v1/getVdoCipherOTP", {
        videoId: videoUrl,
      })
      .then((res) => {
        console.log("=== API Response ===");
        console.log("otp:", res.data.otp);
        console.log("playbackInfo:", res.data.playbackInfo);
        setVideoData(res.data);
      })
      .catch((err) => {
        console.error("API Error:", err);
      });
  }, [videoUrl]);

  console.log("videoData.otp:", videoData.otp);
  console.log("videoData.playbackInfo:", videoData.playbackInfo);

  return (
    <div
      style={{ position: "relative", paddingTop: "56.25%", overflow: "hidden" }}
    >
      {videoData.otp && videoData.playbackInfo !== "" && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData?.playbackInfo}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: 0
          }}
          allowFullScreen={true}
          allow="encrypted-media"
        ></iframe>
      )}
    </div>
  );
};

export default CoursePlayer;
