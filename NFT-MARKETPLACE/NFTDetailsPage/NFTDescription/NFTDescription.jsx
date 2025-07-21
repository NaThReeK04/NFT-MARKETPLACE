import React, { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  MdVerified,
  MdCloudUpload,
  MdReportProblem,
  MdOutlineDeleteSweep,
} from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { FaWallet, FaPercentage } from "react-icons/fa";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
import { BiTransferAlt, BiDollar } from "react-icons/bi";

// INTERNAL IMPORT
import Style from "./NFTDescription.module.css";
import images from "../../img";
import { Button } from "../../components/componentsindex.js";

// IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const NFTDescription = ({ nft }) => {
  const [social, setSocial] = useState(false);
  const [NFTMenu, setNFTMenu] = useState(false);
  const [offerMode, setOfferMode] = useState(false);
  const [offerAmount, setOfferAmount] = useState("");
  const [currentBid, setCurrentBid] = useState(nft.price);

  const router = useRouter();
  const { buyNFT, currentAccount } = useContext(NFTMarketplaceContext);

  const openSocial = () => {
    setSocial(!social);
    setNFTMenu(false);
  };

  const openNFTMenu = () => {
    setNFTMenu(!NFTMenu);
    setSocial(false);
  };

  const handleOfferSubmit = () => {
    if (!offerAmount || isNaN(offerAmount)) return;
    setCurrentBid(offerAmount);
    setOfferMode(false);
    setOfferAmount("");
  };

  return (
    <div className={Style.NFTDescription}>
      <div className={Style.NFTDescription_box}>
        {/* SHARE + MENU */}
        <div className={Style.NFTDescription_box_share}>
          <p>Virtual Worlds</p>
          <div className={Style.NFTDescription_box_share_box}>
            <MdCloudUpload
              className={Style.NFTDescription_box_share_box_icon}
              onClick={openSocial}
            />
            {social && (
              <div className={Style.NFTDescription_box_share_box_social}>
                <a href="#">
                  <TiSocialFacebook /> Facebook
                </a>
                <a href="#">
                  <TiSocialInstagram /> Instagram
                </a>
                <a href="#">
                  <TiSocialLinkedin /> LinkedIn
                </a>
                <a href="#">
                  <TiSocialTwitter /> Twitter
                </a>
                <a href="#">
                  <TiSocialYoutube /> YouTube
                </a>
              </div>
            )}
            <BsThreeDots
              className={Style.NFTDescription_box_share_box_icon}
              onClick={openNFTMenu}
            />
            {NFTMenu && (
              <div className={Style.NFTDescription_box_share_box_social}>
                <a href="#">
                  <BiDollar /> Change price
                </a>
                <a href="#">
                  <BiTransferAlt /> Transfer
                </a>
                <a href="#">
                  <MdReportProblem /> Report abuse
                </a>
                <a href="#">
                  <MdOutlineDeleteSweep /> Delete item
                </a>
              </div>
            )}
          </div>
        </div>

        {/* PROFILE SECTION */}
        <div className={Style.NFTDescription_box_profile}>
          <h1>
            {nft.name} #{nft.tokenId}
          </h1>

          {/* BIDDING SECTION */}
          <div className={Style.NFTDescription_box_profile_biding}>
            <div className={Style.NFTDescription_box_profile_biding_box_price}>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_price_bid
                }
              >
                <small>Current Bid</small>
                <p>
                  {currentBid} ETH <span>( ≈ $3,221.22)</span>
                </p>
              </div>
              <span>[96 in stock]</span>
            </div>

            <div className={Style.NFTDescription_box_profile_biding_box_button}>
              {currentAccount === nft.seller.toLowerCase() ? (
                <p>You can't buy your own NFT</p>
              ) : currentAccount === nft.owner.toLowerCase() ? (
                <Button
                  icon={<FaWallet />}
                  btnName="List on Marketplace"
                  handleClick={() =>
                    router.push(
                      `/reSellToken?id=${nft.tokenId}&tokenURI=${nft.tokenURI}&price=${nft.price}`
                    )
                  }
                  classStyle={Style.button}
                />
              ) : (
                <Button
                  icon={<FaWallet />}
                  btnName="Buy NFT"
                  handleClick={() => buyNFT(nft)}
                  classStyle={Style.button}
                />
              )}

              <Button
                icon={<FaPercentage />}
                btnName="Make offer"
                handleClick={() => setOfferMode(true)}
                classStyle={Style.button}
              />
            </div>

            {/* OFFER FORM */}
            {offerMode && (
              <div className={Style.NFTDescription_offer_input}>
                <input
                  type="number"
                  placeholder="Enter your offer in ETH"
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(e.target.value)}
                  className={Style.inputBox}
                />
                <Button
                  btnName="Submit Offer"
                  handleClick={handleOfferSubmit}
                  classStyle={Style.button}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDescription;
