import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Flex,
  Heading,
  Icon,
  Text,
  useColorModeValue
} from '@chakra-ui/react';

import { i18n } from '@/i18n';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

export const WalletCard = (props) => {
  const bgMain = useColorModeValue('orange.50', 'teal.800');
  const textColor = useColorModeValue('teal.900', 'orange.100');
  const bgBadge = useColorModeValue('orange.100', 'teal.700');

  const totalBalanceView = new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2
  }).format(props.totalBalance);

  return (
    <>
      <Carousel
        showThumbs={false}
        showStatus={false}
        centerMode={true}
        centerSlidePercentage={50}
        showIndicators={false}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              style={{
                left: -10,
                position: 'absolute',
                zIndex: 2,
                top: 'calc(50% - 15px)',
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
                top: 'calc(50% - 15px)',
                width: 30,
                height: 30,
                cursor: 'pointer',
                right: -10
              }}
            >
              <Icon as={ArrowForwardIcon} />
            </button>
          )
        }
      >
        <Box h="200px" m={5} mb={10} borderRadius={35} bg={bgMain} shadow="lg">
          <Badge
            ml="80%"
            mt="5%"
            fontSize="50%"
            align="center"
            p={1}
            bg={bgBadge}
            borderRadius={5}
            color={textColor}
          >
            {i18n.t('walletView.nameOfDefaultBadge')}
          </Badge>

          <Heading as="h1" size="md" color={textColor} ml={10}>
            {props.name}
          </Heading>

          <Flex direction="column" m={5} align="center" color={textColor}>
            <Flex>{i18n.t('walletView.headOfBalanceMessage')}</Flex>
            <Flex fontSize="2xl" fontWeight="bold" color={textColor}>
              {totalBalanceView}
            </Flex>
            <Text>{props.currency}</Text>
          </Flex>
          <Flex
            direction="column"
            p={2}
            m={2}
            align="start"
            justify="flex-end"
            h="20%"
          ></Flex>
        </Box>
      </Carousel>
    </>
  );
};
