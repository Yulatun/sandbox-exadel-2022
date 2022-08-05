import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Icon } from '@chakra-ui/react';

import { WalletCard } from '../WalletCard';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

export const WalletCarousel = ({ wallets }) => {
  return (
    <>
      <Carousel
        width="500px"
        showThumbs={false}
        showStatus={false}
        centerMode={true}
        centerSlidePercentage={30}
        showIndicators={false}
        infiniteLoop={true}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              style={{
                left: 15,
                position: 'absolute',
                zIndex: 2,
                top: 'calc(90% - 15px)',
                width: 30,
                height: 30,
                cursor: 'pointer'
              }}
            >
              <Icon as={ArrowBackIcon} />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              style={{
                position: 'absolute',
                zIndex: 2,
                top: 'calc(90% - 15px)',
                width: 30,
                height: 30,
                cursor: 'pointer',
                right: 15
              }}
            >
              <Icon as={ArrowForwardIcon} />
            </button>
          )
        }
      >
        {wallets.map((wallet) => (
          <WalletCard key={wallet.id} wallet={wallet} />
        ))}
      </Carousel>
    </>
  );
};
