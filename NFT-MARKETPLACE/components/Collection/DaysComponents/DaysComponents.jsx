import React from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";

// INTERNAL IMPORT
import Style from "./DaysComponents.module.css";
import images from "../../../img";
import keerthan from "../../../img/keerthan.jpg"; // ✅ Already imported

const DaysComponents = ({ el, i }) => {
  return (
    <div className={Style.daysComponent}>
      <div className={Style.daysComponent_box}>
        <div className={Style.daysComponent_box_img}>
          <Image
            src={el.background}
            className={Style.daysComponent_box_img_img}
            alt="profile background"
            width={500}
            height={300}
            objectFit="cover"
          />
        </div>

        <div className={Style.daysComponent_box_profile}>
          <Image
            src={images[`creatorbackground${i + 2}`]}
            alt="profile"
            width={200}
            height={200}
            className={Style.daysComponent_box_img_1}
            objectFit="cover"
          />
          <Image
            src={images[`creatorbackground${i + 4}`]}
            alt="profile"
            width={200}
            height={200}
            className={Style.daysComponent_box_img_2}
            objectFit="cover"
          />
          <Image
            src={images[`creatorbackground${i + 3}`]}
            alt="profile"
            width={200}
            height={200}
            className={Style.daysComponent_box_img_3}
            objectFit="cover"
          />
        </div>

        <div className={Style.daysComponent_box_title}>
          <h2>Amazing Collection</h2>
          <div className={Style.daysComponent_box_title_info}>
            <div className={Style.daysComponent_box_title_info_profile}>
              <Image
                src={keerthan} // ✅ Replaced `el.user` with `keerthan`
                alt="profile"
                width={30}
                height={30}
                objectFit="cover"
                className={Style.daysComponent_box_title_info_profile_img}
              />
              <p>
                Creator
                <span>
                  Keerthan Ghodiwal
                  <small>
                    <MdVerified />
                  </small>
                </span>
              </p>
            </div>

            <div className={Style.daysComponent_box_title_info_price}>
              <small>{i + 4}.255 ETH</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaysComponents;
