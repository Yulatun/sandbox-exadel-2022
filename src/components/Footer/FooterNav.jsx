import {
  FaFacebook,
  FaLinkedinIn,
  FaTwitter,
  FaWhatsapp,
  FaYoutube
} from 'react-icons/fa';

import { FooterNavIcons } from './FooterNavIcons';

export const FooterNav = () => {
  return (
    <>
      <FooterNavIcons
        elem={<FaTwitter />}
        color="twitter"
        href={'https://twitter.com'}
      />
      <FooterNavIcons
        elem={<FaYoutube />}
        color="red"
        href={'https://youtube.com'}
      />
      <FooterNavIcons
        elem={<FaFacebook />}
        color="facebook"
        href={'https://facebook.com'}
      />
      <FooterNavIcons
        elem={<FaWhatsapp />}
        color="whatsapp"
        href={'https://whatsapp.com'}
      />
      <FooterNavIcons
        elem={<FaLinkedinIn />}
        color="linkedin"
        href={'https://linkedin.com'}
      />
    </>
  );
};
