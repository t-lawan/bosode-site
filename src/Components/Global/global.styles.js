import styled, { createGlobalStyle } from "styled-components";
import VanHelsing from '../../Assets/Font/VANHELSING.ttf'

export const size = {
  mobileS: "320px",
  mobileM: "420px",
  mobileL: "520px",
  mobileSL: "568px",
  mobileXL: "736px",
  tablet: "768px",
  tabletL: "1023px",
  laptop: "1024px",
  laptopM: "1124px",
  laptopL: "1400px",
  desktopS: "1600px",
  desktopM: "1900px",
  desktop: "2260px"
};

export const Colours = {
  purple: "#a841f4",
  yellow: "#E4EE3F",
  green: "#32CD32",
  grey: "#CCD6D7",
  blue: "rgb(0,0,255)",
  dark_grey: "	#707070",
  // green: "hsl(115, 100%, 42%)",
  environment_background: "#BABAB8"
  // blue: '#32cdcd'
};

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'VanHelsing';
    src: url(${VanHelsing}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  * {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    }

html, body {
  margin: 0;
  background: ${Colours.grey};
  width: 100%;
  -webkit-font-smoothing: antialiased;
}
h1,h2,h3,h4,h5,h6,p {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    font-weight: 100;
  font-family: 'VanHelsing';

    }
  a {
    text-decoration: underline;
    color: black;
    font-weight: 100 !important;
  }
  h1 {
  margin-bottom: 1.45rem;
  font-size: 2.5rem;
  line-height: 1.1;
  @media (max-width: ${size.tabletL}) {
    font-size: 2rem;

  }
}
h2 {
  margin-bottom: 1.45rem;
  font-size: 1.62671rem;
  line-height: 1.1;
}
h3 {
  margin-bottom: 1.45rem;
  font-size: 1.38316rem;
  line-height: 1.1;
}
h4 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  line-height: 1.1;
  word-break: break-all; 
}
h5 {
  margin-bottom: 1.45rem;
  font-size: 0.85028rem;
  line-height: 1.1;
}
h6 {
  margin-bottom: 1.45rem;
  font-size: 0.78405rem;
}
img {
  max-width: 100%;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
  margin-bottom: 1.45rem;
}
p, li, a, span{
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  margin-bottom: 0.5rem;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
  font-size: 1.5rem  !important;
  line-height: 1.3;
  font-weight: 100 !important;
  color: ${Colours.dark_grey};
  @media (max-width: ${size.tabletL}) {
    font-size: 1rem  !important;

  }
}

p {
  line-height: 1.35;
  font-size: 1.05rem;
  margin-bottom: 1.5rem;
  
}


`;
