// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Container, Typography } from '@material-ui/core';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useWallet } from 'use-wallet';
import Web3 from 'web3';

//
import { varFadeInUp, MotionInView } from '../animate';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0, 10, 0),
  position: 'relative',
  [theme.breakpoints.down(1614)]: {
    padding: theme.spacing(1, 0, 10, 0)
  },
  [theme.breakpoints.down(650)]: {
    padding: theme.spacing(1, 0, 4, 0)
  }
}));

const PanContainerStyle = styled('div')(({ theme }) => ({
  borderColor: '#91181D',
  borderWidth: '1rem',
  border: 'solid 10px #91181D',
  borderRadius: '1rem',
  background:
    'linear-gradient(180.6deg, #F46531 0.73%, #F46D31 7.56%, #F48631 20.24%, #F4AD31 34.88%, #F4B331 36.83%, #F4B331 72.93%, #F4E795 98.3%)',
  position: 'relative',
  margin: 'auto',
  maxWidth: '1000px',
  paddingTop: '7rem',
  [theme.breakpoints.down(1614)]: {
    maxWidth: '841px',
    paddingTop: '6rem'
  },
  [theme.breakpoints.down(1270)]: { paddingTop: '5rem', maxWidth: '641px' },
  [theme.breakpoints.down(950)]: {
    paddingTop: '4rem',
    maxWidth: '441px'
  },
  [theme.breakpoints.down(650)]: { paddingTop: '3rem', maxWidth: '371px' }
}));

const RibbonForStyle = styled('img')(({ theme }) => ({
  width: '420px',
  height: '198px',
  position: 'absolute',
  top: '0%',
  left: '50%',
  transform: 'translate(-50%, -99px)!important',
  [theme.breakpoints.down(1614)]: {
    width: '317px',
    height: '166px',
    transform: 'translate(-50%, -83px)!important'
  },
  [theme.breakpoints.down(1270)]: {
    width: '267px',
    height: '126px',
    transform: 'translate(-50%, -63px)!important'
  },
  [theme.breakpoints.down(950)]: {
    width: '217px',
    height: '86px',
    transform: 'translate(-50%, -43px)!important'
  },
  [theme.breakpoints.down(650)]: {
    width: '190px',
    height: '76px',
    transform: 'translate(-50%, -38px)!important'
  }
}));

const GroupStyle = styled(Box)(({ theme }) => ({
  display: 'block',
  padding: '3rem',
  [theme.breakpoints.down(1614)]: {
    padding: '2.5rem'
  },
  [theme.breakpoints.down(1270)]: {
    padding: '1.8rem'
  },
  [theme.breakpoints.down(950)]: {
    padding: '1rem'
  },
  [theme.breakpoints.down(650)]: {
    padding: '0.5rem'
  }
}));

const LetterStyle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Arcade Normal',
  fontStyle: 'normal',
  fontWeight: 400,
  width: '100%',
  textAlign: 'left',
  fontSize: '22px',
  lineHeight: '65px',
  color: '#000000',
  [theme.breakpoints.down(1614)]: {
    fontSize: '18px',
    lineHeight: '60px'
  },
  [theme.breakpoints.down(1270)]: {
    fontSize: '15px',
    lineHeight: '55px'
  },
  [theme.breakpoints.down(950)]: {
    fontSize: '14px',
    lineHeight: '43px'
  },
  [theme.breakpoints.down(650)]: {
    fontSize: '11px',
    lineHeight: '39px'
  }
}));

// ----------------------------------------------------------------------

export default function LandingMyStats() {
  const wallet = useWallet();

  const [won, setWon] = useState(0);
  const [lost, setLost] = useState(0);
  const [wonMatic, setWonMatic] = useState(0);
  const [wonMMF, setWonMMF] = useState(0);

  // eslint-disable-next-line
  useEffect(async () => {
    if (
      wallet.status === 'connected' &&
      wallet.account !== '' &&
      wallet.account !== null
    ) {
      const web3 = new Web3(wallet.ethereum);
      web3.eth.defaultAccount = wallet.account;
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/bet/stats`,
        { betAddress: wallet.account }
      );
      if (response.data.message === 'success') {
        setWon(response.data.result.won);
        setLost(response.data.result.lose);
        setWonMatic(response.data.result.maticWon);
        setWonMMF(response.data.result.mmfWon);
      }
    }
  }, [wallet]);

  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <MotionInView variants={varFadeInUp}>
          <PanContainerStyle
            sx={{
              marginTop: { xs: '2rem', md: '6rem' }
            }}
          >
            <RibbonForStyle src="/static/home/ribbon-mystats.png" />
            <GroupStyle>
              <LetterStyle>GAMES WON : {won}</LetterStyle>
              <LetterStyle>GAMES LOST : {lost}</LetterStyle>
              <LetterStyle>
                MATIC WON : {(wonMatic / 10 ** 18).toFixed(2).toString()} MATIC
              </LetterStyle>
              <LetterStyle>
                MMF WON : {(wonMMF / 10 ** 18).toFixed(2).toString()} MMF
              </LetterStyle>
            </GroupStyle>
          </PanContainerStyle>
        </MotionInView>
      </Container>
    </RootStyle>
  );
}
