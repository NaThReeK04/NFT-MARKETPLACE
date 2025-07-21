import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AiFillFire, AiFillHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import { TbArrowBigLeftLines, TbArrowBigRightLine } from "react-icons/tb";

// INTERNAL IMPORT
import Style from "./BigNFTSilder.module.css";
import images from "../../img";
import keerthan from "../../img/keerthan.jpg";

const BigNFTSilder = () => {
  const [idNumber, setIdNumber] = useState(0);
  const [timeLeft, setTimeLeft] = useState({});

  const SIX_HOURS_MS = 1000 * 60 * 60 * 6;

  const sliderData = [
    {
      title: "Hello NFT",
      id: 1,
      name: "Keerthan Ghodiwal",
      collection: "GYm",
      price: "00664 ETH",
      like: 243,
      image: keerthan,
      nftImage: images.nft_image_1,
      endTime: new Date(Date.now() + SIX_HOURS_MS),
    },
    {
      title: "Buddy NFT",
      id: 2,
      name: "Keerthan Ghodiwal",
      collection: "Home",
      price: "0000004 ETH",
      like: 243,
      image: keerthan,
      nftImage: images.nft_image_2,
      endTime: new Date(Date.now() + SIX_HOURS_MS),
    },
    {
      title: "Gym NFT",
      id: 3,
      name: "Keerthan Ghodiwal",
      collection: "GYm",
      price: "0000064 ETH",
      like: 243,
      image: keerthan,
      nftImage: images.nft_image_3,
      endTime: new Date(Date.now() + SIX_HOURS_MS),
    },
    {
      title: "Home NFT",
      id: 4,
      name: "Keerthan Ghodiwal",
      collection: "GYm",
      price: "4664 ETH",
      like: 243,
      image: keerthan,
      nftImage: images.nft_image_1,
      endTime: new Date(Date.now() + SIX_HOURS_MS),
    },
  ];

  const calculateTimeLeft = (endTime) => {
    const difference = +new Date(endTime) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minutes: Math.floor((difference / 1000 / 60) % 60),
        Seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { Days: 0, Hours: 0, Minutes: 0, Seconds: 0 };
    }

    return timeLeft;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(sliderData[idNumber].endTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [idNumber]);

  const inc = useCallback(() => {
    if (idNumber + 1 < sliderData.length) {
      setIdNumber(idNumber + 1);
    }
  }, [idNumber, sliderData.length]);

  const dec = useCallback(() => {
    if (idNumber > 0) {
      setIdNumber(idNumber - 1);
    }
  }, [idNumber]);

  return (
    <div className={Style.bigNFTSlider}>
      <div className={Style.bigNFTSlider_box}>
        <div className={Style.bigNFTSlider_box_left}>
          <h2>{sliderData[idNumber].title}</h2>
          <div className={Style.bigNFTSlider_box_left_creator}>
            <div className={Style.bigNFTSlider_box_left_creator_profile}>
              <Image
                className={Style.bigNFTSlider_box_left_creator_profile_img}
                src={sliderData[idNumber].image}
                alt="profile image"
                width={50}
                height={50}
              />
              <div className={Style.bigNFTSlider_box_left_creator_profile_info}>
                <p>Creator</p>
                <h4>
                  {sliderData[idNumber].name}{" "}
                  <span>
                    <MdVerified />
                  </span>
                </h4>
              </div>
            </div>

            <div className={Style.bigNFTSlider_box_left_creator_collection}>
              <AiFillFire
                className={Style.bigNFTSlider_box_left_creator_collection_icon}
              />
              <div
                className={Style.bigNFTSlider_box_left_creator_collection_info}
              >
                <p>Collection</p>
                <h4>{sliderData[idNumber].collection}</h4>
              </div>
            </div>
          </div>

          <div className={Style.bigNFTSlider_box_left_bidding}>
            <div className={Style.bigNFTSlider_box_left_bidding_box}>
              <small>Current Bid</small>
              <p>
                {sliderData[idNumber].price} <span>$221,21</span>
              </p>
            </div>

            <p className={Style.bigNFTSlider_box_left_bidding_box_auction}>
              <MdTimer
                className={Style.bigNFTSlider_box_left_bidding_box_icon}
              />
              <span>Auction ending in</span>
            </p>

            <div className={Style.bigNFTSlider_box_left_bidding_box_timer}>
              {Object.entries(timeLeft).map(([label, value]) => (
                <div
                  key={label}
                  className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
                >
                  <p>{value}</p>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={Style.bigNFTSlider_box_left_sliderBtn}>
            <TbArrowBigLeftLines
              className={Style.bigNFTSlider_box_left_sliderBtn_icon}
              onClick={() => dec()}
            />
            <TbArrowBigRightLine
              className={Style.bigNFTSlider_box_left_sliderBtn_icon}
              onClick={() => inc()}
            />
          </div>
        </div>

        <div className={Style.bigNFTSlider_box_right}>
          <div className={Style.bigNFTSlider_box_right_box}>
            <Image
              src={sliderData[idNumber].nftImage}
              alt="NFT IMAGE"
              className={Style.bigNFTSlider_box_right_box_img}
            />
            <div className={Style.bigNFTSlider_box_right_box_like}>
              <AiFillHeart />
              <span>{sliderData[idNumber].like}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigNFTSilder;
