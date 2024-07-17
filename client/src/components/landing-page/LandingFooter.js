// material
import { Container, Typography } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
//
import { MotionInView, varFadeInDown } from '../animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({ position: 'relative' }));

const ImgBtnStyle = styled('img')(({ theme }) => ({
  width: '52.61px',
  height: '52.61px',
  margin: '0 0.3rem',
  [theme.breakpoints.down(1614)]: {
    width: '52.61px',
    height: '52.61px',
    margin: '0 0.2rem'
  },
  [theme.breakpoints.down(1270)]: {
    width: '42.61px',
    height: '42.61px'
  },
  [theme.breakpoints.down(950)]: { width: '32.61px', height: '32.61px' },
  [theme.breakpoints.down(650)]: { width: '22.61px', height: '22.61px' },
  '&:hover': {
    cursor: 'pointer',
    background: '#2c5f72',
    borderRadius: '10px'
  }
}));

const TermsStyle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Arcade Normal',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '17px',
  color: '#FFFFFF',
  height: '52.6px',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down(1270)]: {
    fontSize: '12px'
  },
  [theme.breakpoints.down(950)]: { fontSize: '10px' },
  [theme.breakpoints.down(650)]: { fontSize: '6px' },
  '&:hover': {
    color: '#d7d1d1',
    cursor: 'pointer'
  }
}));

const BackStyle = styled('div')(({ theme }) => ({
  background: '#000000',
  opacity: '0.52',
  height: '369px',
  positon: 'absolute',
  top: '0px',
  zIndex: 0,
  [theme.breakpoints.down(1270)]: {
    fontSize: '12px',
    height: '309px'
  },
  [theme.breakpoints.down(950)]: { height: '249px' },
  [theme.breakpoints.down(650)]: { height: '189px' }
}));

const ContainerStyle = styled(Container)(({ theme }) => ({
  textAlign: 'center',
  position: 'relative',
  top: '100px',
  zIndex: 1,
  [theme.breakpoints.down(1270)]: {
    fontSize: '12px'
  }
}));

const CopyRightStyle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19px',
  color: '#FFFFFF',
  height: '49px',
  alignItems: 'center',
  background: '#7C7C7C',
  opacity: '0.5',
  bottom: '15px',
  zIndex: 1,
  display: 'flex',
  justifyContent: 'center',
  position: 'absolute',
  width: '100%',
  [theme.breakpoints.down(1270)]: {
    fontSize: '12px',
    height: '39px'
  },
  [theme.breakpoints.down(950)]: { fontSize: '10px', height: '29px' },
  [theme.breakpoints.down(650)]: { fontSize: '8px', height: '19px' }
}));

export default function LandingFooter() {
  return (
    <RootStyle>
      <ContainerStyle maxWidth="lg">
        <MotionInView
          variants={varFadeInDown}
          display="flex"
          justifyContent="center"
          sx={{ position: 'absolute', alignItems: 'center', height: '100%' }}
        >
          <ImgBtnStyle
            src="/static/home/twitter.png"
            onClick={() => {
              window.open('https://twitter.com/letsgoflip');
            }}
          />
          <ImgBtnStyle
            src="/static/home/discord.png"
            onClick={() => {
              window.open('https://discord.gg/9Exq5ECpDv');
            }}
          />
          <ImgBtnStyle
            src="/static/home/instagram.png"
            onClick={() => {
              window.open(
                'https://medium.com/@TheSportsNFT/lets-go-flip-6e2c21cb61a9'
              );
            }}
          />
        </MotionInView>
        <MotionInView
          variants={varFadeInDown}
          display="flex"
          justifyContent="center"
          zIndex="10"
          onClick={() => {
            window.open(
              'https://medium.com/@TheSportsNFT/lets-go-flip-terms-and-conditions-8ed28b534c68'
            );
          }}
        >
          <TermsStyle>Terms & Conditions</TermsStyle>
        </MotionInView>
      </ContainerStyle>
      <CopyRightStyle>Copyright@2022</CopyRightStyle>
      <BackStyle />
    </RootStyle>
  );
}
