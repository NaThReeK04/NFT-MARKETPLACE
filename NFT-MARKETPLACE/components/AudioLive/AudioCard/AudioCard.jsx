import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TbPlayerPlay, TbPlayerPause } from "react-icons/tb";

// INTERNAL IMPORT
import Style from "./AudioCard.module.css";
import images from "../../../img";
import LikeProfile from "../../LikeProfile/LikeProfile";

const AudioCard = () => {
  const [like, setLike] = useState(false);
  const [play, setPlay] = useState(false);
  const [timeLeft, setTimeLeft] = useState({});

  // Set countdown to 4 hours from mount
  const endTime = new Date(Date.now() + 4 * 60 * 60 * 1000);

  const calculateTimeLeft = () => {
    const difference = +endTime - +new Date();
    if (difference > 0) {
      return {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return null; // Time expired
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = calculateTimeLeft();
      if (newTime) {
        setTimeLeft(newTime);
      } else {
        clearInterval(timer);
        setTimeLeft(null);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const likeNft = () => setLike(!like);
  const playMusic = () => setPlay(!play);

  return (
    <div className={Style.audioCard}>
      <div className={Style.audioCard_box}>
        <div className={Style.audioCard_box_like_time}>
          <div className={Style.audioCard_box_like} onClick={likeNft}>
            {like ? (
              <AiFillHeart className={Style.audioCard_box_like_icon} />
            ) : (
              <AiOutlineHeart
                className={Style.audioCard_box_like_icon_unlike}
              />
            )}
            <span>24</span>
          </div>

          <div className={Style.audioCard_box_time}>
            <div className={Style.audioCard_box_like_time_remaing}>
              <small>Remaining time</small>
              <h5>
                {timeLeft
                  ? `${timeLeft.hours}h : ${timeLeft.minutes}m : ${timeLeft.seconds}s`
                  : "Expired"}
              </h5>
            </div>
          </div>
        </div>

        <div className={Style.audioCard_box_player}>
          <Image src={images.musiceWave} alt="music wave" width={200} />
          <div className={Style.audioCard_box_musicPlayer} onClick={playMusic}>
            <div className={Style.audioCard_box_musicPlayer_icon}>
              {play ? <TbPlayerPause /> : <TbPlayerPlay />}
            </div>
          </div>
        </div>

        <div className={Style.audioCard_box_details}>
          <div className={Style.audioCard_box_details_info}>
            <h4>NFT music #1123</h4>
            <div className={Style.audioCard_box_details_info_price}>
              <small>Price</small>
              <p>$3,221.33</p>
            </div>
          </div>

          <div className={Style.audioCard_box_details_stock}>
            <LikeProfile />
            <small>24 in stock</small>
          </div>
        </div>

        <div className={Style.audioCard_box_img}>
          <Image
            src={images.creatorbackground10}
            alt="background"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioCard;
