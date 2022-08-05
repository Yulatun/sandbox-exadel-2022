import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react';

import { WalletCard } from '../WalletCard';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

export const WalletCarousel = ({ wallets }) => {
  const percentage = useBreakpointValue({
    lg: 33.3,
    base: 50
  });
  return (
    <Box width="100%" px="10px">
      <Carousel
        showThumbs={false}
        showStatus={false}
        centerMode
        centerSlidePercentage={percentage}
        showIndicators={false}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <IconButton
              size="sm"
              isRound
              type="button"
              onClick={onClickHandler}
              title={label}
              style={{
                left: 15,
                position: 'absolute',
                zIndex: 2,
                top: 'calc(50% - 15px)',

                cursor: 'pointer'
              }}
            >
              <Icon as={ChevronLeftIcon} />
            </IconButton>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <IconButton
              isRound
              size="sm"
              type="button"
              onClick={onClickHandler}
              title={label}
              style={{
                position: 'absolute',
                zIndex: 2,
                top: 'calc(50% - 15px)',
                cursor: 'pointer',
                right: 15
              }}
            >
              <Icon as={ChevronRightIcon} />
            </IconButton>
          )
        }
      >
        {wallets.map((wallet) => (
          <Box key={wallet.id} display="block" mx="5px" py="10px">
            <WalletCard wallet={wallet} showLink />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};
