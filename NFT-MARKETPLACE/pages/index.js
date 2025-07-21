import React, { useState, useEffect, useContext } from "react";

// INTERNAL IMPORT
import Style from "../styles/index.module.css";
import {
  HeroSection,
  Service,
  BigNFTSilder,
  Subscribe,
  Title,
  Category,
  Filter,
  NFTCard,
  Collection,
  AudioLive,
  FollowerTab,
  Slider,
  Brand,
  Video,
  Loader,
} from "../components/componentsindex";
import { getTopCreators } from "../TopCreators/TopCreators";

// IMPORTING CONTRACT DATA
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const Home = () => {
  const { checkIfWalletConnected, currentAccount, fetchNFTs } = useContext(
    NFTMarketplaceContext
  );

  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  // Connect wallet on load
  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  // Fetch NFTs when wallet is connected
  useEffect(() => {
    if (currentAccount) {
      fetchNFTs()
        .then((items) => {
          if (Array.isArray(items)) {
            setNfts(items.reverse());
            setNftsCopy(items);
          } else {
            console.warn("⚠️ fetchNFTs did not return an array:", items);
          }
        })
        .catch((err) => {
          console.error("❌ Failed to fetch NFTs:", err);
        });
    }
  }, [currentAccount]);

  // Safely generate top creators
  const creators = getTopCreators(nfts);

  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <BigNFTSilder />
      <Title
        heading="Audio Collection"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <AudioLive />
      {creators.length === 0 ? (
        <Loader />
      ) : (
        <FollowerTab TopCreator={creators} />
      )}

      <Slider />
      <Collection />
      <Title
        heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <Filter />
      {nfts.length === 0 ? <Loader /> : <NFTCard NFTData={nfts} />}

      <Title
        heading="Browse by category"
        paragraph="Explore the NFTs in the most featured categories."
      />
      <Category />
      <Subscribe />
      <Brand />
      <Video />
    </div>
  );
};

export default Home;
