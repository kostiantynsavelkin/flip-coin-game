// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Container, Typography } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { useWallet } from 'use-wallet';
import Web3 from 'web3';

//
import { varFadeInUp, MotionInView } from '../animate';
import nftABI from '../contracts/nftABI';
import PopDialog from '../landing-page/PopDialog';
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
  maxWidth: '841px',
  paddingTop: '7rem',
  [theme.breakpoints.down(1614)]: {
    maxWidth: '741px',
    paddingTop: '6rem'
  },
  [theme.breakpoints.down(1270)]: { paddingTop: '5rem', maxWidth: '541px' },
  [theme.breakpoints.down(950)]: {
    paddingTop: '4rem',
    maxWidth: '441px'
  },
  [theme.breakpoints.down(650)]: {
    paddingTop: '3rem',
    maxWidth: '371px',
    background: 'transparent',
    border: 'solid 0px #91181D'
  }
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
  padding: '0rem 3rem 3rem 3rem',
  [theme.breakpoints.down(1614)]: {
    padding: '0 2.5rem 2.5rem 2.5rem'
  },
  [theme.breakpoints.down(1270)]: {
    padding: '0 1.8rem 1.8rem 1.8rem'
  },
  [theme.breakpoints.down(950)]: {
    padding: '0 1rem 1rem 1rem'
  },
  [theme.breakpoints.down(650)]: {
    padding: '0 0.5rem 0.5rem 0.5rem'
  }
}));

const TitleLetterStyle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Arcade Normal',
  fontStyle: 'normal',
  fontWeight: 400,
  width: '100%',
  textAlign: 'center',
  fontSize: '30px',
  lineHeight: '65px',
  color: '#fff',
  [theme.breakpoints.down(1614)]: {
    fontSize: '26px',
    lineHeight: '60px'
  },
  [theme.breakpoints.down(1270)]: {
    fontSize: '20px',
    lineHeight: '55px'
  },
  [theme.breakpoints.down(950)]: {
    fontSize: '18px',
    lineHeight: '43px'
  },
  [theme.breakpoints.down(650)]: {
    fontSize: '14px',
    lineHeight: '39px'
  }
}));

const LetterStyle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Arcade Normal',
  fontStyle: 'normal',
  fontWeight: 400,
  width: '100%',
  textAlign: 'center',
  fontSize: '20px',
  lineHeight: '30px',
  color: '#fff',
  margin: '1rem 0',
  [theme.breakpoints.down(1614)]: {
    fontSize: '16px',
    lineHeight: '25px',
    margin: '0.8rem 0'
  },
  [theme.breakpoints.down(1270)]: {
    fontSize: '13px',
    lineHeight: '20px',
    margin: '0.6rem 0'
  },
  [theme.breakpoints.down(950)]: {
    fontSize: '11px',
    lineHeight: '18px',
    margin: '0.4rem 0'
  },
  [theme.breakpoints.down(650)]: {
    fontSize: '9px',
    lineHeight: '16px',
    margin: '0.3rem 0'
  }
}));

const SmallLetterStyle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Arcade Normal',
  fontStyle: 'normal',
  fontWeight: 400,
  width: '100%',
  textAlign: 'center',
  fontSize: '15px',
  lineHeight: '30px',
  color: '#fff',
  margin: '2rem 0 1rem 0',
  [theme.breakpoints.down(1614)]: {
    fontSize: '13px',
    lineHeight: '25px',
    margin: '1.8rem 0 0.8rem 0'
  },
  [theme.breakpoints.down(1270)]: {
    fontSize: '10px',
    lineHeight: '20px',
    margin: '1.6rem 0 0.6rem 0'
  },
  [theme.breakpoints.down(950)]: {
    fontSize: '8px',
    lineHeight: '18px',
    margin: '1.4rem 0 0.4rem 0'
  },
  [theme.breakpoints.down(650)]: {
    fontSize: '6px',
    lineHeight: '16px',
    margin: '1.3rem 0 0.3rem 0'
  }
}));

const NoteLetterStyle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Arcade Normal',
  fontStyle: 'normal',
  fontWeight: 400,
  width: '100%',
  textAlign: 'center',
  fontSize: '13px',
  lineHeight: '30px',
  color: '#000',
  margin: '2rem 0 2rem 0',
  [theme.breakpoints.down(1614)]: {
    fontSize: '11px',
    lineHeight: '25px',
    margin: '1.8rem 0 1.8rem 0'
  },
  [theme.breakpoints.down(1270)]: {
    fontSize: '8px',
    lineHeight: '20px',
    margin: '1.6rem 0 1.3rem 0'
  },
  [theme.breakpoints.down(950)]: {
    fontSize: '6px',
    lineHeight: '18px',
    margin: '0.4rem 0 0.9rem 0'
  },
  [theme.breakpoints.down(650)]: {
    fontSize: '5px',
    lineHeight: '16px',
    margin: '0.1rem 0 0.6rem 0'
  }
}));

const NFTLogoBtn = styled('img')(({ theme }) => ({
  width: '205px',
  height: '205px',
  margin: 'auto',
  [theme.breakpoints.down(1614)]: { width: '185px', height: '185px' },
  [theme.breakpoints.down(1270)]: { width: '145px', height: '145px' },
  [theme.breakpoints.down(950)]: { width: '105px', height: '105px' },
  [theme.breakpoints.down(650)]: { width: '85px', height: '85px' },
  '&:hover': {
    cursor: 'pointer !important'
  }
}));

const CoinTypeToggle = styled(Box)(({ theme }) => ({
  border: '4px solid #F48131',
  background: '#91181D',
  position: 'relative',
  width: '328px',
  height: '60px',
  borderRadius: '1rem',
  margin: 'auto',
  marginTop: '1rem',
  marginBottom: '1rem',
  [theme.breakpoints.down(1614)]: { width: '283px', height: '55px' },
  [theme.breakpoints.down(1270)]: { width: '223px', height: '45px' },
  [theme.breakpoints.down(950)]: { width: '180px', height: '40px' },
  [theme.breakpoints.down(650)]: {
    width: '143px',
    height: '35px',
    borderRadius: '0.7rem',
    border: '3px solid #F48131'
  }
}));

const CoinBtnTypeToggle = styled(Box)(({ theme }) => ({
  border: '4px solid #F48131',
  background: '#91181D',
  position: 'relative',
  width: '60px',
  height: '60px',
  borderRadius: '1rem',
  margin: 'auto',
  marginTop: '1rem',
  marginBottom: '1rem',
  [theme.breakpoints.down(1614)]: { width: '55px', height: '55px' },
  [theme.breakpoints.down(1270)]: { width: '45px', height: '45px' },
  [theme.breakpoints.down(950)]: { width: '40px', height: '40px' },
  [theme.breakpoints.down(650)]: {
    width: '35px',
    height: '35px',
    borderRadius: '0.7rem',
    border: '3px solid #F48131'
  },
  '&:hover': {
    cursor: 'pointer',
    background: '#af474b'
  }
}));

const ToggleBtnTypographyStyle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Arcade Normal',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '22px',
  lineHeight: '39.83px',
  color: '#FFFFFF',
  textAlign: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) !important',
  [theme.breakpoints.down(1614)]: { fontSize: '18px' },
  [theme.breakpoints.down(1270)]: { fontSize: '14px' },
  [theme.breakpoints.down(950)]: { fontSize: '12px' },
  [theme.breakpoints.down(650)]: { fontSize: '8px' }
}));

const MenuBtnContainerStyle = styled(Box)(({ theme }) => ({
  width: '140px',
  height: '48px',
  position: 'relative',
  margin: '0.3rem auto',
  [theme.breakpoints.down(1614)]: {
    width: '140px',
    height: '48px'
  },
  [theme.breakpoints.down(1270)]: {
    width: '120px',
    height: '40px'
  },
  [theme.breakpoints.down(950)]: {
    width: '99px',
    height: '35px',
    margin: '0.1rem auto'
  },
  [theme.breakpoints.down(650)]: {
    width: '69px',
    height: '30px',
    margin: '0rem auto'
  },
  '&:hover': {
    cursor: 'pointer',
    [theme.breakpoints.down(650)]: {
      color: 'white!important'
    }
  }
}));

const ImgBtnStyle = styled('img')(({ theme }) => ({
  width: '140px',
  height: '48px',
  [theme.breakpoints.down(1614)]: {
    width: '140px',
    height: '48px'
  },
  [theme.breakpoints.down(1270)]: {
    width: '120px',
    height: '40px'
  },
  [theme.breakpoints.down(950)]: {
    width: '99px',
    height: '35px'
  },
  [theme.breakpoints.down(650)]: {
    width: '69px',
    height: '30px'
  }
}));

const ImgBtnLetterStyle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Arcade Normal',
  fontStyle: 'normal',
  fontWeight: 400,
  width: '100%',
  textAlign: 'center',
  fontSize: '11.5px',
  lineHeight: '14px',
  color: '#000000',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) !important',
  [theme.breakpoints.down(1614)]: {},
  [theme.breakpoints.down(1270)]: {
    fontSize: '10px',
    lineHeight: '14px'
  },
  [theme.breakpoints.down(950)]: {
    fontSize: '8.5px',
    lineHeight: '16px'
  },
  [theme.breakpoints.down(650)]: {
    fontSize: '6px',
    lineHeight: '46px',
    '&:hover': {
      color: '#fff'
    }
  }
}));

// ----------------------------------------------------------------------

export default function LandingMint() {
  const wallet = useWallet();
  const [mintBtnURL, setMintBtnURL] = useState('/static/home/menu-btn.png');
  const [mintedNum, setMintedNum] = useState(0);
  const [multipleNum, setMultipleNum] = useState(1);
  const [popOpen, setPopOpen] = useState(false);
  const [type, setType] = useState(2);

  const handlePopOpen = () => setPopOpen(true);
  const handlePopClose = async () => {
    setPopOpen(false);
  };

  const getTotalSupply = async () => {
    if (
      wallet.status === 'connected' &&
      wallet.account !== '' &&
      wallet.account !== null
    ) {
      const web3 = new Web3(wallet.ethereum);
      web3.eth.defaultAccount = wallet.account;

      const nftContractObj = new web3.eth.Contract(
        nftABI,
        process.env.REACT_APP_NFT_CONTRACT_ADDRESS
      );

      try {
        const totalSupply = await nftContractObj.methods.totalSupply
          .call(wallet.account)
          .call();

        setMintedNum(totalSupply);
      } catch (e) {
        console.log('getTotalSupply: error' + e);
      }
    }
  };

  const handlePlus = () => {
    setMultipleNum(multipleNum + 1 > 5 ? 5 : multipleNum + 1);
  };

  const handleMinus = () => {
    setMultipleNum(multipleNum - 1 < 1 ? 1 : multipleNum - 1);
  };

  const handleMint = async () => {
    if (
      wallet.status === 'connected' &&
      wallet.account !== '' &&
      wallet.account !== null
    ) {
      const web3 = new Web3(wallet.ethereum);
      web3.eth.defaultAccount = wallet.account;

      const nftContractObj = new web3.eth.Contract(
        nftABI,
        process.env.REACT_APP_NFT_CONTRACT_ADDRESS
      );
      setType(7);
      handlePopOpen();
      try {
        const totalSupply = await nftContractObj.methods.totalSupply
          .call(wallet.account)
          .call();

        const nftPrice = await nftContractObj.methods.nftPrice
          .call(wallet.account)
          .call();

        const discount = await nftContractObj.methods.discount
          .call(wallet.account)
          .call();

        const whiteList = await nftContractObj.methods
          .checkWhiteList(wallet.account)
          .call();

        console.log('discount', (discount * nftPrice) / 100);
        console.log('whiteList', whiteList);

        console.log(
          'nftPrice',
          whiteList === '1' ? (discount * nftPrice) / 100 : nftPrice
        );

        const gasLimit = 10000000;
        const gasPrice = await web3.eth.getGasPrice();

        await nftContractObj.methods.MintDegenMascotsNft(multipleNum).send({
          from: wallet.account,
          value:
            whiteList === '1'
              ? (discount * nftPrice * multipleNum) / 100
              : (multipleNum * nftPrice).toString(),
          gasLimit: web3.utils.toHex(gasLimit),
          gasPrice: web3.utils.toHex(gasPrice)
        });

        setType(5);
        setMintedNum(totalSupply);
        getTotalSupply();
      } catch (e) {
        console.log('handleMint: error' + e);
        setType(6);
      }
    }
  };

  // eslint-disable-next-line
  useEffect(async () => {
    if (
      wallet.status === 'connected' &&
      wallet.account !== '' &&
      wallet.account !== null
    ) {
      const web3 = new Web3(wallet.ethereum);
      web3.eth.defaultAccount = wallet.account;
      getTotalSupply();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <RibbonForStyle src="/static/home/ribbon-polyflip.png" />
            <GroupStyle>
              <TitleLetterStyle>Degen Mascots nft</TitleLetterStyle>
              <LetterStyle>SUPPLY - 2000</LetterStyle>
              <LetterStyle>mint price - 100 MATIC</LetterStyle>
              <LetterStyle>Whitelist price - 85 MATIC</LetterStyle>
              <LetterStyle>
                Your Ticket to be part of Degen's Playground!
              </LetterStyle>
              <NFTLogoBtn src="/static/home/nft-logo.png" />
              <SmallLetterStyle>Minted : {mintedNum}/2000</SmallLetterStyle>
              <Box sx={{ display: 'flex', justifyContent: 'start-between' }}>
                <CoinBtnTypeToggle onClick={handleMinus}>
                  <ToggleBtnTypographyStyle>-</ToggleBtnTypographyStyle>
                </CoinBtnTypeToggle>
                <CoinTypeToggle>
                  <ToggleBtnTypographyStyle>
                    {multipleNum}
                  </ToggleBtnTypographyStyle>
                </CoinTypeToggle>
                <CoinBtnTypeToggle onClick={handlePlus}>
                  <ToggleBtnTypographyStyle>+</ToggleBtnTypographyStyle>
                </CoinBtnTypeToggle>
              </Box>
              <NoteLetterStyle>
                (Max 20 per wallet, 05 per transaction)
              </NoteLetterStyle>
              <MenuBtnContainerStyle
                onMouseEnter={() => {
                  setMintBtnURL('/static/home/menu-btn-hover.png');
                }}
                onMouseLeave={() => {
                  setMintBtnURL('/static/home/menu-btn.png');
                }}
                onClick={handleMint}
              >
                <ImgBtnStyle src={mintBtnURL} />
                <ImgBtnLetterStyle>Mint now</ImgBtnLetterStyle>
              </MenuBtnContainerStyle>
            </GroupStyle>
          </PanContainerStyle>
        </MotionInView>
        <PopDialog
          open={popOpen}
          handleClose={handlePopClose}
          type={1}
          won={type}
          amount={0}
        />
      </Container>
    </RootStyle>
  );
}
