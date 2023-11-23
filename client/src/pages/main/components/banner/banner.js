import { useEffect, useState } from "react";
import { Icon } from "../../../../components";
import image1 from "../../../../assets/1.png";
import image2 from "../../../../assets/2.png";
import image3 from "../../../../assets/3.png";
import styled from "styled-components";

const BannerContainer = ({ className }) => {
  const banners = [image1, image2, image3];

  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
    }, 7000);

    return () => {
      clearInterval(interval);
    };
  }, [banners.length]);

  const handlePrevClick = () => {
    setCurrentBanner(
      (prevBanner) => (prevBanner - 1 + banners.length) % banners.length
    );
  };

  const handleNextClick = () => {
    setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
  };

  return (
    <div className={className}>
      <Icon
        className="arrow-left"
        id="la-arrow-left"
        onClick={handlePrevClick}
      />
      <img
        className="banner"
        key={currentBanner}
        src={banners[currentBanner]}
        alt={`Баннер ${currentBanner + 1}`}
      />
      <Icon
        className="arrow-right"
        id="la-arrow-right"
        onClick={handleNextClick}
      />
    </div>
  );
};

export const Banner = styled(BannerContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 6rem;

  & .banner {
    position: absolute;
    top: 6rem;
    height: 20rem;
    width: 50%;
    object-fit: contain;
    animation: fadein 1s ease-in-out;
    border-radius: 0.5rem;
  }

  & .arrow-left {
    position: absolute;
    left: 25rem;
    top: 15rem;
    color: #fff;
    z-index: 300;
  }
  & .arrow-right {
    position: absolute;
    right: 25rem;
    top: 15rem;
    color: #fff;
    z-index: 300;
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeout {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;
