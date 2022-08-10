import { Carousel } from 'react-responsive-carousel';
import { Link as RouterLink } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Icon,
  IconButton,
  Link,
  useBreakpointValue
} from '@chakra-ui/react';

import { useCentralTheme } from '@/theme';

import { WalletCard } from '../WalletCard';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

export const WalletCarousel = ({ walletsData }) => {
  const percentage = useBreakpointValue({
    lg: 33.33,
    base: 50
  });

  const { bgColor, popupTextColor } = useCentralTheme();

  return (
    <Box w="70%">
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
                position: 'absolute',
                top: 'calc(50% - 15px)',
                left: 0,
                zIndex: 2,
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
                top: 'calc(50% - 15px)',
                right: 0,
                zIndex: 2,
                cursor: 'pointer'
              }}
            >
              <Icon as={ChevronRightIcon} />
            </IconButton>
          )
        }
      >
        {walletsData.map((wallet) => (
          <Link
            key={wallet.id}
            as={RouterLink}
            to={`wallet/${wallet.id}`}
            size="lg"
            color={popupTextColor}
            _hover={{ textDecoration: 'none', bgColor: { bgColor } }}
          >
            <WalletCard walletData={wallet} showLink />
          </Link>
        ))}
      </Carousel>
    </Box>
  );
};
