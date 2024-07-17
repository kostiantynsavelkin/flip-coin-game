// material
import {
  experimentalStyled as styled,
  makeStyles
} from '@material-ui/core/styles';
import { Box, Container, Typography } from '@material-ui/core';
import { useState, useEffect, useRef } from 'react';
import Web3 from 'web3';
import { useWallet } from 'use-wallet';
import axios from 'axios';
import closeFill from '@iconify/icons-eva/close-fill';
import { useSnackbar } from 'notistack';
import { Icon } from '@iconify/react';

//
import { varFadeInUp, MotionInView, varFadeInLeft } from '../animate';

import PopDialog from './PopDialog';
import flipcoinABI from '../contracts/flipcoinABI';
import mmfABI from '../contracts/mmfABI';
import { MIconButton } from '../@material-extend';
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  volume: {
    marginTop: '6rem',
    [theme.breakpoints.down(1614)]: {
      marginTop: '5rem'
    },
    [theme.breakpoints.down(1270)]: {
      marginTop: '4rem'
    },
    [theme.breakpoints.down(950)]: {
      marginTop: '3rem'
    },
    [theme.breakpoints.down(650)]: {
      marginTop: '2rem'
    }
  }
}));

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

const MenuBtnContainerStyle = styled(Box)(({ theme }) => ({
  width: '163px',
  height: '90px',
  position: 'relative',
  marginLeft: '0.5rem',
  marginRight: '0.5rem',
  [theme.breakpoints.down(1614)]: {
    width: '147px',
    height: '78px'
  },
  [theme.breakpoints.down(1270)]: {
    width: '107px',
    height: '68px'
  },
  [theme.breakpoints.down(950)]: {
    width: '87px',
    height: '48px'
  },
  '&:hover': {
    cursor: 'pointer'
  }
}));

const ImgBtnStyle = styled('img')(({ theme }) => ({
  width: '163px',
  height: '90px',
  [theme.breakpoints.down(1614)]: {
    width: '147px',
    height: '78px'
  },
  [theme.breakpoints.down(1270)]: {
    width: '107px',
    height: '68px'
  },
  [theme.breakpoints.down(950)]: {
    width: '87px',
    height: '48px'
  }
}));

const ImgBtnLetterStyle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Arcade Normal',
  fontStyle: 'normal',
  fontWeight: 400,
  width: '100%',
  textAlign: 'center',
  fontSize: '21px',
  lineHeight: '49.79px',
  color: '#000000',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) !important',
  [theme.breakpoints.down(1614)]: {
    fontSize: '17px'
  },
  [theme.breakpoints.down(1270)]: {
    fontSize: '14px'
  },
  [theme.breakpoints.down(950)]: {
    fontSize: '11px'
  }
}));

const BtnContainerStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  marginBottom: '8rem',
  marginTop: '4rem',
  [theme.breakpoints.down(1614)]: { marginBottom: '7rem', marginTop: '3.5rem' },
  [theme.breakpoints.down(1270)]: {
    marginBottom: '6rem',
    marginTop: '3rem'
  },
  [theme.breakpoints.down(950)]: {
    marginBottom: '5rem',
    marginTop: '2.5rem'
  },
  [theme.breakpoints.down(650)]: {
    marginBottom: '4rem',
    marginTop: '2rem'
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

const CoinMenuBtnContainerStyle = styled(Box)(({ theme }) => ({
  width: '145px',
  height: '49px',
  position: 'relative',
  marginLeft: '0.5rem',
  marginRight: '0.5rem',
  [theme.breakpoints.down(1614)]: {
    width: '115px',
    height: '40px'
  },
  [theme.breakpoints.down(1270)]: {
    width: '95px',
    height: '35px'
  },
  [theme.breakpoints.down(950)]: {
    width: '80px',
    height: '32px'
  },
  [theme.breakpoints.down(650)]: {
    width: '75px',
    height: '30px'
  },
  '&:hover': {
    cursor: 'pointer'
  }
}));

const CoinImgBtnStyle = styled('img')(({ theme }) => ({
  width: '145px',
  height: '49px',
  [theme.breakpoints.down(1614)]: {
    width: '115px',
    height: '40px'
  },
  [theme.breakpoints.down(1270)]: {
    width: '95px',
    height: '35px'
  },
  [theme.breakpoints.down(950)]: {
    width: '80px',
    height: '32px'
  },
  [theme.breakpoints.down(650)]: {
    width: '75px',
    height: '30px'
  }
}));

const CoinImgBtnLetterStyle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Arcade Normal',
  fontStyle: 'normal',
  fontWeight: 400,
  width: '100%',
  textAlign: 'center',
  fontSize: '19px',
  lineHeight: '24.89px',
  color: '#91181D',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) !important',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down(1614)]: {
    fontSize: '15px'
  },
  [theme.breakpoints.down(1270)]: {
    fontSize: '12px'
  },
  [theme.breakpoints.down(950)]: {
    fontSize: '11px'
  },
  [theme.breakpoints.down(650)]: {
    fontSize: '10px'
  }
}));

const PolygonStyle = styled('img')(({ theme }) => ({
  width: '20px',
  height: '20px',
  marginLeft: '0.2rem',
  [theme.breakpoints.down(1614)]: {
    width: '18px',
    height: '18px',
    marginLeft: '0.2rem'
  },
  [theme.breakpoints.down(1270)]: {
    width: '14px',
    height: '14px',
    marginLeft: '0.2rem'
  },
  [theme.breakpoints.down(950)]: {
    width: '12px',
    height: '12px',
    marginLeft: '0.2rem'
  },
  [theme.breakpoints.down(650)]: {
    width: '10px',
    height: '10px',
    marginLeft: '0.2rem'
  }
}));

const CoinGroupStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  paddingTop: '3rem',
  paddingBottom: '3rem',
  [theme.breakpoints.down(1614)]: {
    paddingTop: '2.5rem',
    paddingBottom: '2.5rem'
  },
  [theme.breakpoints.down(1270)]: {
    paddingTop: '1.8rem',
    paddingBottom: '1.8rem'
  },
  [theme.breakpoints.down(950)]: {
    paddingTop: '1rem',
    paddingBottom: '1rem'
  },
  [theme.breakpoints.down(650)]: {
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem'
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
  [theme.breakpoints.down(650)]: { width: '143px', height: '35px' }
}));

const ToggleLeftBtn = styled('img')(({ theme }) => ({
  width: '99px',
  height: '99px',
  position: 'absolute',
  top: '50%',
  left: '0%',
  transform: 'translate(-50%, -50%) !important',
  [theme.breakpoints.down(1614)]: { width: '85px', height: '85px' },
  [theme.breakpoints.down(1270)]: { width: '72px', height: '72px' },
  [theme.breakpoints.down(950)]: { width: '62px', height: '62px' },
  [theme.breakpoints.down(650)]: { width: '52px', height: '52px' },
  '&:hover': {
    cursor: 'pointer !important'
  }
}));

const ToggleRightBtn = styled('img')(({ theme }) => ({
  width: '113px',
  height: '113px',
  position: 'absolute',
  top: '50%',
  right: '0%',
  transform: 'translate(50%, -50%) !important',
  [theme.breakpoints.down(1614)]: { width: '99px', height: '99px' },
  [theme.breakpoints.down(1270)]: { width: '85px', height: '85px' },
  [theme.breakpoints.down(950)]: { width: '72px', height: '72px' },
  [theme.breakpoints.down(650)]: { width: '52px', height: '52px' },
  '&:hover': {
    cursor: 'pointer !important'
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

const BetBtn = styled(Box)(({ theme }) => ({
  border: '2px solid #91181D',
  background:
    'linear-gradient(180deg, #F4E693 0%, #F4B83B 20.02%, #F4B331 40.86%, #F46E31 72.11%, #F46531 100%)',
  position: 'relative',
  width: '334px',
  height: '80px',
  borderRadius: '10px',
  margin: 'auto',
  marginTop: '4rem',
  marginBottom: '4rem',
  [theme.breakpoints.down(1614)]: { width: '285px', height: '68px' },
  [theme.breakpoints.down(1270)]: {
    width: '224px',
    height: '50px',
    marginTop: '3rem',
    marginBottom: '3rem'
  },
  [theme.breakpoints.down(950)]: {
    width: '204px',
    height: '45px',
    marginTop: '2rem',
    marginBottom: '2rem'
  },
  [theme.breakpoints.down(650)]: {
    width: '184px',
    height: '40px',
    marginTop: '1rem',
    marginBottom: '1rem'
  },
  '&:hover': {
    cursor: 'pointer'
  }
}));

const BetTypoStyle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Arcade Normal',
  width: '319px',
  height: '64px',
  background: '#EB2F23',
  borderRadius: '10px',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '17px',
  lineHeight: '22.4px',
  color: '#FFFFFF',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) !important',
  [theme.breakpoints.down(1614)]: {
    width: '272px',
    height: '54px',
    fontSize: '14px'
  },
  [theme.breakpoints.down(1270)]: {
    width: '212px',
    height: '39px',
    fontSize: '12px'
  },
  [theme.breakpoints.down(950)]: {
    width: '182px',
    height: '32px',
    fontSize: '10px'
  },
  [theme.breakpoints.down(650)]: {
    width: '172px',
    height: '29px',
    fontSize: '8px'
  },
  '&:hover': {
    cursor: 'pointer',
    background: '#cd3d34'
  }
}));

const RibbonRecentStyle = styled('img')(({ theme }) => ({
  width: '420px',
  height: '88px',
  position: 'absolute',
  top: '0%',
  left: '50%',
  transform: 'translate(-50%, -44px)!important',
  [theme.breakpoints.down(1614)]: {
    width: '317px',
    height: '66px',
    transform: 'translate(-50%, -33px)!important'
  },
  [theme.breakpoints.down(1270)]: {
    width: '267px',
    height: '56px',
    transform: 'translate(-50%, -28px)!important'
  },
  [theme.breakpoints.down(950)]: {
    width: '227px',
    height: '46px',
    transform: 'translate(-50%, -23px)!important'
  },
  [theme.breakpoints.down(650)]: {
    width: '190px',
    height: '40px',
    transform: 'translate(-50%, -20px)!important'
  }
}));

const RecentListStyle = styled(Box)(({ theme }) => ({
  border: '4px solid #AB383B',
  background: '#fff',
  position: 'relative',
  width: '100%',
  height: '64px',
  borderRadius: '16px',
  margin: '0.5rem 0',
  [theme.breakpoints.down(1614)]: { height: '64px' },
  [theme.breakpoints.down('md')]: {},
  '&:hover': {
    cursor: 'pointer'
  }
}));

const RecentListContentStyle = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) !important',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 1rem',
  width: '100%',
  [theme.breakpoints.down(1614)]: {},
  [theme.breakpoints.down('md')]: {},
  '&:hover': {
    cursor: 'pointer'
  }
}));

const RecentListTypographyStyle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Arcade Normal',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '15px',
  lineHeight: '20px',
  color: '#F4B331',
  textAlign: 'center',
  [theme.breakpoints.down(1614)]: {
    fontSize: '12px'
  },
  [theme.breakpoints.down(1270)]: {
    fontSize: '8px'
  },
  [theme.breakpoints.down(950)]: {
    fontSize: '6px'
  },
  [theme.breakpoints.down(650)]: {
    fontSize: '6px'
  }
}));

const RecentListSecondStyle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Arcade Normal',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '15px',
  lineHeight: '17px',
  color: '#F4B331',
  textAlign: 'center',
  [theme.breakpoints.down(1614)]: {
    fontSize: '12px'
  },
  [theme.breakpoints.down(1270)]: {
    fontSize: '8px'
  },
  [theme.breakpoints.down(950)]: {
    fontSize: '6px'
  },
  [theme.breakpoints.down(650)]: {
    fontSize: '6px'
  }
}));

const DoubledStyle = styled('span')(({ theme }) => ({
  color: '#16A86C',
  fontFamily: 'Arcade Normal',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '15px',
  lineHeight: '20px',
  textAlign: 'center',
  [theme.breakpoints.down(1614)]: {
    fontSize: '12px'
  },
  [theme.breakpoints.down(1270)]: {
    fontSize: '8px'
  },
  [theme.breakpoints.down(950)]: {
    fontSize: '6px'
  },
  [theme.breakpoints.down(650)]: {
    fontSize: '6px'
  }
}));

const LostStyle = styled('span')(({ theme }) => ({
  color: '#D4421D',
  fontFamily: 'Arcade Normal',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '15px',
  lineHeight: '20px',
  textAlign: 'center',
  [theme.breakpoints.down(1614)]: {
    fontSize: '12px'
  },
  [theme.breakpoints.down(1270)]: {
    fontSize: '8px'
  },
  [theme.breakpoints.down(950)]: {
    fontSize: '6px'
  },
  [theme.breakpoints.down(650)]: {
    fontSize: '6px'
  }
}));

const GoFlipStyle = styled('img')(({ theme }) => ({
  width: '520px',
  height: '233px',
  margin: 'auto',
  [theme.breakpoints.down(1614)]: {
    width: '410px',
    height: '193px'
  },
  [theme.breakpoints.down(1270)]: {
    width: '358px',
    height: '158px'
  },
  [theme.breakpoints.down(960)]: {
    width: '255px',
    height: '123px'
  },
  [theme.breakpoints.down(650)]: {
    width: '205px',
    height: '93px'
  }
}));

const WinLoseStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  [theme.breakpoints.down(650)]: {}
}));

const WinLosePanCointerStyle = styled(Box)(({ theme }) => ({
  marginTop: '6rem',
  marginBottom: '6rem',
  [theme.breakpoints.down(1614)]: {
    marginTop: '5rem',
    marginBottom: '5rem'
  },
  [theme.breakpoints.down(1270)]: {
    marginTop: '4rem',
    marginBottom: '4rem'
  },
  [theme.breakpoints.down(960)]: {
    marginTop: '3rem',
    marginBottom: '3rem'
  },
  [theme.breakpoints.down(650)]: {
    marginTop: '2rem',
    marginBottom: '2rem'
  }
}));

const WinLosePanStyle = styled('img')(({ theme }) => ({
  width: '213px',
  height: '213px',
  [theme.breakpoints.down(1614)]: {
    width: '173px',
    height: '173px'
  },
  [theme.breakpoints.down(1270)]: {
    width: '153px',
    height: '153px'
  },
  [theme.breakpoints.down(960)]: {
    width: '123px',
    height: '123px'
  },
  [theme.breakpoints.down(650)]: {
    width: '103px',
    height: '103px'
  }
}));

const WinLosePanLetter1Style = styled(Typography)(({ theme }) => ({
  fontFamily: 'Arcade Normal',
  fontStyle: 'normal',
  fontWeight: 400,
  width: '100%',
  textAlign: 'center',
  fontSize: '15px',
  lineHeight: '25px',
  color: '#000000',
  position: 'absolute',
  top: '88px',
  [theme.breakpoints.down(1614)]: {
    fontSize: '12px',
    top: '72px'
  },
  [theme.breakpoints.down(1200)]: {
    fontSize: '10px',
    top: '60px'
  },
  [theme.breakpoints.down(950)]: {
    fontSize: '8px',
    top: '50px'
  },
  [theme.breakpoints.down(650)]: {
    fontSize: '7px',
    top: '38px'
  }
}));

const WinLosePanLetter2Style = styled(Typography)(({ theme }) => ({
  fontFamily: 'Arcade Normal',
  fontStyle: 'normal',
  fontWeight: 400,
  width: '100%',
  textAlign: 'center',
  fontSize: '17px',
  lineHeight: '25px',
  color: '#000000',
  position: 'absolute',
  top: '133px',
  [theme.breakpoints.down(1614)]: {
    fontSize: '14px',
    top: '103px'
  },
  [theme.breakpoints.down(1200)]: {
    fontSize: '11px',
    top: '94px'
  },
  [theme.breakpoints.down(950)]: {
    fontSize: '10px',
    top: '74px'
  },
  [theme.breakpoints.down(650)]: {
    fontSize: '9px',
    top: '57px'
  }
}));

// ----------------------------------------------------------------------

export default function LandingBet() {
  const wallet = useWallet();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [recentFlips, setRecentFlips] = useState([]);
  const [totalMatic, setTotalMatic] = useState(0);
  const [totalMMF, setTotalMMF] = useState(0);
  const [headsBtn, setHeadsBtn] = useState('/static/home/menu-btn-hover.png');
  const [tailsBtn, setTailsBtn] = useState('/static/home/menu-btn.png');
  const [headsBtnClick, setHeadsBtnClick] = useState(true);
  const [tailsBtnClick, setTailsBtnClick] = useState(false);

  const [matic5Btn, setMatic5Btn] = useState('/static/home/menu-btn-hover.png');
  const [matic10Btn, setMatic10Btn] = useState('/static/home/menu-btn.png');
  const [matic15Btn, setMatic15Btn] = useState('/static/home/menu-btn.png');
  const [matic25Btn, setMatic25Btn] = useState('/static/home/menu-btn.png');
  const [matic50Btn, setMatic50Btn] = useState('/static/home/menu-btn.png');

  const [matic5BtnClick, setMatic5BtnClick] = useState(true);
  const [matic10BtnClick, setMatic10BtnClick] = useState(false);
  const [matic15BtnClick, setMatic15BtnClick] = useState(false);
  const [matic25BtnClick, setMatic25BtnClick] = useState(false);
  const [matic50BtnClick, setMatic50BtnClick] = useState(false);

  const [mmf5Btn, setMMF5Btn] = useState('/static/home/menu-btn-hover.png');
  const [mmf10Btn, setMMF10Btn] = useState('/static/home/menu-btn.png');
  const [mmf15Btn, setMMF15Btn] = useState('/static/home/menu-btn.png');
  const [mmf25Btn, setMMF25Btn] = useState('/static/home/menu-btn.png');
  const [mmf50Btn, setMMF50Btn] = useState('/static/home/menu-btn.png');
  const [mmf5BtnClick, setMMF5BtnClick] = useState(true);
  const [mmf10BtnClick, setMMF10BtnClick] = useState(false);
  const [mmf15BtnClick, setMMF15BtnClick] = useState(false);
  const [mmf25BtnClick, setMMF25BtnClick] = useState(false);
  const [mmf50BtnClick, setMMF50BtnClick] = useState(false);

  const [coinPath, setCoinPath] = useState('/static/home/coin.png');

  const [betInfo, setBetInfo] = useState({
    betOwnerAddr: '0',
    betSide: '0',
    coinAmount: '0',
    coinType: '0',
    requestId: ''
  });

  const classes = useStyles();

  const [maticType, setMaticType] = useState(true);
  const [coinMaticAmount, setCoinMaticAmount] = useState(5);
  const [coinMMFAmount, setCoinMMFAmount] = useState(50);

  const [headsWins, setHeadsWins] = useState(0);
  const [tailsWins, setTailsWins] = useState(0);

  const [popOpen, setPopOpen] = useState(false);
  const [type, setType] = useState(2);

  const handlePopOpen = () => setPopOpen(true);
  const handlePopClose = async () => {
    getStatics();
    setBetInfo({
      betOwnerAddr: '0',
      betSide: '0',
      coinAmount: '0',
      coinType: '0',
      requestId: ''
    });
    setPopOpen(false);
  };

  const abbrAddr = (addr) =>
    addr.substring(0, 4) +
    '**' +
    addr.substring(addr.length - 2, addr.length) +
    ' ';

  const lastInterval = useRef();

  const handleBet = async () => {
    playBet();
  };

  const playBet = async () => {
    if (
      wallet.status === 'connected' &&
      wallet.account !== '' &&
      wallet.account !== null
    ) {
      const web3 = new Web3(wallet.ethereum);
      web3.eth.defaultAccount = wallet.account;
      const coinAmount = maticType === true ? coinMaticAmount : coinMMFAmount;

      let coinAmountIndex = 0;

      if (maticType === false) {
        switch (coinAmount) {
          case 150:
            coinAmountIndex = 1;
            break;
          case 300:
            coinAmountIndex = 2;
            break;
          case 400:
            coinAmountIndex = 3;
            break;
          case 500:
            coinAmountIndex = 4;
            break;
          default:
            coinAmountIndex = 0;
            break;
        }
      } else {
        switch (coinAmount) {
          case 10:
            coinAmountIndex = 1;
            break;
          case 15:
            coinAmountIndex = 2;
            break;
          case 25:
            coinAmountIndex = 3;
            break;
          case 50:
            coinAmountIndex = 4;
            break;
          default:
            coinAmountIndex = 0;
            break;
        }
      }

      const mainContractObj = new web3.eth.Contract(
        flipcoinABI,
        process.env.REACT_APP_MAIN_CONTRACT_ADDRESS
      );
      const mmfContractObj = new web3.eth.Contract(
        mmfABI,
        process.env.REACT_APP_MMF_CONTRACT_ADDRESS
      );

      const gasLimit = 1000000;
      const gasPrice = await web3.eth.getGasPrice();

      console.log('coinAmount', coinAmount);
      console.log('coinAmountIndex', coinAmountIndex);

      try {
        setType(2);
        if (!maticType) {
          setType(3);
          handlePopOpen();
          await mmfContractObj.methods
            .approve(
              process.env.REACT_APP_MAIN_CONTRACT_ADDRESS,
              web3.utils.toWei(coinAmount.toString(), 'ether').toString()
            )
            .send({
              from: wallet.account,
              gasPrice: web3.utils.toHex(gasPrice),
              gasLimit: web3.utils.toHex(gasLimit)
            });

          setType(4);
        } else {
          handlePopOpen();
        }

        const result = await mainContractObj.methods
          .requestFlipCoin(
            maticType === true ? 0 : 1,
            coinAmountIndex,
            headsBtnClick === true ? 0 : 1
          )
          .send({
            from: wallet.account,
            value:
              maticType === true
                ? web3.utils.toWei(coinAmount.toString(), 'ether').toString()
                : '0',
            gasPrice: web3.utils.toHex(gasPrice),
            gasLimit: web3.utils.toHex(gasLimit)
          });

        setBetInfo({
          betOwnerAddr:
            result.events.requestBetSignal.returnValues.betOwnerAddr,
          betSide: result.events.requestBetSignal.returnValues.betSide,
          coinAmount: result.events.requestBetSignal.returnValues.coinAmount,
          coinType: result.events.requestBetSignal.returnValues.coinType,
          requestId: result.events.requestBetSignal.returnValues[0]
        });
        setType(2);
      } catch (e) {
        console.log('playBet: error' + e);
        setPopOpen(false);
      }
    } else {
      enqueueSnackbar('Please connect your wallet.', {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    }
  };

  const getStatics = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/statics/get`,
        {}
      );
      if (response.data.message === 'success') {
        if (response.data.result[0].headsWin !== 0) {
          const total =
            response.data.result[0].tailsWin + response.data.result[0].headsWin;
          setHeadsWins(
            ((response.data.result[0].headsWin / total) * 100)
              .toFixed(0)
              .toString()
          );
        }
        if (response.data.result[0].tailsWin !== 0) {
          const total =
            response.data.result[0].tailsWin + response.data.result[0].headsWin;
          setTailsWins(
            ((response.data.result[0].tailsWin / total) * 100)
              .toFixed(0)
              .toString()
          );
        }
      }
    } catch (e) {
      console.log('getStatics err ', e);
    }
  };

  const getRecent = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/bet/recent`,
        {}
      );
      if (response.data.type === 'success') {
        const total = response.data.result;

        setRecentFlips(total);
      }
    } catch (e) {
      console.log('getRecent' + e.toString());
    }
  };

  const getVolume = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/bet/volume`,
        {}
      );
      if (response.data.type === 'success') {
        setTotalMatic(response.data.result.maticWon);
        setTotalMMF(response.data.result.mmfWon);
      }
    } catch (e) {
      console.log('getVolume' + e.toString());
    }
  };

  useEffect(() => {
    async function run() {
      if (
        wallet.status === 'connected' &&
        wallet.account !== '' &&
        wallet.account !== null
      ) {
        if (lastInterval.current) clearInterval(lastInterval.current);

        const web3 = new Web3(wallet.ethereum);
        web3.eth.defaultAccount = wallet.account;
        const mainContractObj = new web3.eth.Contract(
          flipcoinABI,
          process.env.REACT_APP_MAIN_CONTRACT_ADDRESS
        );

        // Check if account has changed
        lastInterval.current = setInterval(async () => {
          try {
            getRecent();
            getStatics();
            getVolume();
            const currentLength = await mainContractObj.methods.betResultMapLength
              .call(wallet.account, wallet.account)
              .call();
            if (currentLength !== '0') {
              const mInfo = await mainContractObj.methods.betResultMap
                .call(wallet.account, wallet.account, currentLength - 1)
                .call();
              if (mInfo.requestId === betInfo.requestId) {
                if (mInfo.betWonOrLoose) {
                  setType(0);
                } else {
                  setType(1);
                }
                const response = await axios.post(
                  `${process.env.REACT_APP_API_URL}/bet/duplicate`,
                  {
                    requestId: mInfo.requestId
                  }
                );
                if (response.data.message === 'success') {
                  if (response.data.result !== true) {
                    await axios.post(
                      `${process.env.REACT_APP_API_URL}/bet/add`,
                      {
                        betAddress: mInfo.betAddress,
                        betType: mInfo.betType,
                        betAmount: mInfo.betAmount,
                        betWonOrLoose: mInfo.betWonOrLoose,
                        betSide: mInfo.betSide,
                        requestId: mInfo.requestId
                      }
                    );
                  }
                }

                setBetInfo({
                  betOwnerAddr: '0',
                  betSide: '0',
                  coinAmount: '0',
                  coinType: '0',
                  requestId: ''
                });
              }
            }
          } catch (e) {
            console.log('Interval Error: ', e);
          }
        }, 1000);
      }
    }
    run();
  }, [wallet, betInfo]);

  useEffect(() => {
    getStatics();
    getRecent();
    getVolume();
  }, []);

  const getTimeFormat = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    if (hours !== 0) {
      return hours.toFixed(0) + ' hours';
    }
    const minutes = Math.floor(seconds / 60);
    if (minutes !== 0) {
      return minutes.toFixed(0) + ' minutes';
    }
    return (seconds % 60).toFixed(0) + ' seconds';
  };

  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <MotionInView variants={varFadeInLeft}>
          <GoFlipStyle src="/static/home/go-flip.png" />
        </MotionInView>
        <MotionInView variants={varFadeInUp}>
          <BtnContainerStyle>
            <MenuBtnContainerStyle
              onMouseEnter={() => {
                setHeadsBtn('/static/home/menu-btn-hover.png');
              }}
              onMouseLeave={() => {
                if (!headsBtnClick) setHeadsBtn('/static/home/menu-btn.png');
              }}
              onClick={() => {
                setHeadsBtn('/static/home/menu-btn-hover.png');
                setTailsBtn('/static/home/menu-btn.png');
                setHeadsBtnClick(true);
                setTailsBtnClick(false);
              }}
            >
              <ImgBtnStyle src={headsBtn} />
              <ImgBtnLetterStyle>HEADS</ImgBtnLetterStyle>
            </MenuBtnContainerStyle>
            <MenuBtnContainerStyle
              onMouseEnter={() => {
                setTailsBtn('/static/home/menu-btn-hover.png');
              }}
              onMouseLeave={() => {
                if (!tailsBtnClick) setTailsBtn('/static/home/menu-btn.png');
              }}
              onClick={() => {
                setTailsBtn('/static/home/menu-btn-hover.png');
                setHeadsBtn('/static/home/menu-btn.png');
                setHeadsBtnClick(false);
                setTailsBtnClick(true);
              }}
            >
              <ImgBtnStyle src={tailsBtn} />
              <ImgBtnLetterStyle>TAILS</ImgBtnLetterStyle>
            </MenuBtnContainerStyle>
          </BtnContainerStyle>
        </MotionInView>

        <MotionInView variants={varFadeInUp}>
          <PanContainerStyle className={classes.for}>
            <RibbonForStyle src="/static/home/ribbon-for.png" />
            {maticType === true && (
              <CoinGroupStyle>
                <CoinMenuBtnContainerStyle
                  onMouseEnter={() => {
                    setMatic5Btn('/static/home/menu-btn-hover.png');
                  }}
                  onMouseLeave={() => {
                    if (!matic5BtnClick)
                      setMatic5Btn('/static/home/menu-btn.png');
                  }}
                  onClick={() => {
                    setMatic5Btn('/static/home/menu-btn-hover.png');
                    setMatic10Btn('/static/home/menu-btn.png');
                    setMatic15Btn('/static/home/menu-btn.png');
                    setMatic25Btn('/static/home/menu-btn.png');
                    setMatic50Btn('/static/home/menu-btn.png');
                    setMatic5BtnClick(true);
                    setMatic10BtnClick(false);
                    setMatic15BtnClick(false);
                    setMatic25BtnClick(false);
                    setMatic50BtnClick(false);
                    setCoinMaticAmount(5);
                  }}
                >
                  <CoinImgBtnStyle src={matic5Btn} />
                  <CoinImgBtnLetterStyle>
                    5
                    <PolygonStyle src="/static/home/polygon.png" />
                  </CoinImgBtnLetterStyle>
                </CoinMenuBtnContainerStyle>
                <CoinMenuBtnContainerStyle
                  onMouseEnter={() => {
                    setMatic10Btn('/static/home/menu-btn-hover.png');
                  }}
                  onMouseLeave={() => {
                    if (!matic10BtnClick)
                      setMatic10Btn('/static/home/menu-btn.png');
                  }}
                  onClick={() => {
                    setMatic5Btn('/static/home/menu-btn.png');
                    setMatic10Btn('/static/home/menu-btn-hover.png');
                    setMatic15Btn('/static/home/menu-btn.png');
                    setMatic25Btn('/static/home/menu-btn.png');
                    setMatic50Btn('/static/home/menu-btn.png');
                    setMatic5BtnClick(false);
                    setMatic10BtnClick(true);
                    setMatic15BtnClick(false);
                    setMatic25BtnClick(false);
                    setMatic50BtnClick(false);
                    setCoinMaticAmount(10);
                  }}
                >
                  <CoinImgBtnStyle src={matic10Btn} />
                  <CoinImgBtnLetterStyle>
                    10
                    <PolygonStyle src="/static/home/polygon.png" />
                  </CoinImgBtnLetterStyle>
                </CoinMenuBtnContainerStyle>
                <CoinMenuBtnContainerStyle
                  onMouseEnter={() => {
                    setMatic15Btn('/static/home/menu-btn-hover.png');
                  }}
                  onMouseLeave={() => {
                    if (!matic15BtnClick)
                      setMatic15Btn('/static/home/menu-btn.png');
                  }}
                  onClick={() => {
                    setMatic5Btn('/static/home/menu-btn.png');
                    setMatic10Btn('/static/home/menu-btn.png');
                    setMatic15Btn('/static/home/menu-btn-hover.png');
                    setMatic25Btn('/static/home/menu-btn.png');
                    setMatic50Btn('/static/home/menu-btn.png');
                    setMatic5BtnClick(false);
                    setMatic10BtnClick(false);
                    setMatic15BtnClick(true);
                    setMatic25BtnClick(false);
                    setMatic50BtnClick(false);
                    setCoinMaticAmount(15);
                  }}
                >
                  <CoinImgBtnStyle src={matic15Btn} />
                  <CoinImgBtnLetterStyle>
                    15
                    <PolygonStyle src="/static/home/polygon.png" />
                  </CoinImgBtnLetterStyle>
                </CoinMenuBtnContainerStyle>
                <CoinMenuBtnContainerStyle
                  onMouseEnter={() => {
                    setMatic25Btn('/static/home/menu-btn-hover.png');
                  }}
                  onMouseLeave={() => {
                    if (!matic25BtnClick)
                      setMatic25Btn('/static/home/menu-btn.png');
                  }}
                  onClick={() => {
                    setMatic5Btn('/static/home/menu-btn.png');
                    setMatic10Btn('/static/home/menu-btn.png');
                    setMatic15Btn('/static/home/menu-btn.png');
                    setMatic25Btn('/static/home/menu-btn-hover.png');
                    setMatic50Btn('/static/home/menu-btn.png');
                    setMatic5BtnClick(false);
                    setMatic10BtnClick(false);
                    setMatic15BtnClick(false);
                    setMatic25BtnClick(true);
                    setMatic50BtnClick(false);
                    setCoinMaticAmount(25);
                  }}
                >
                  <CoinImgBtnStyle src={matic25Btn} />
                  <CoinImgBtnLetterStyle>
                    25
                    <PolygonStyle src="/static/home/polygon.png" />
                  </CoinImgBtnLetterStyle>
                </CoinMenuBtnContainerStyle>
                <CoinMenuBtnContainerStyle
                  onMouseEnter={() => {
                    setMatic50Btn('/static/home/menu-btn-hover.png');
                  }}
                  onMouseLeave={() => {
                    if (!matic50BtnClick)
                      setMatic50Btn('/static/home/menu-btn.png');
                  }}
                  onClick={() => {
                    setMatic5Btn('/static/home/menu-btn.png');
                    setMatic10Btn('/static/home/menu-btn.png');
                    setMatic15Btn('/static/home/menu-btn.png');
                    setMatic25Btn('/static/home/menu-btn.png');
                    setMatic50Btn('/static/home/menu-btn-hover.png');
                    setMatic5BtnClick(false);
                    setMatic10BtnClick(false);
                    setMatic15BtnClick(false);
                    setMatic25BtnClick(false);
                    setMatic50BtnClick(true);
                    setCoinMaticAmount(50);
                  }}
                >
                  <CoinImgBtnStyle src={matic50Btn} />
                  <CoinImgBtnLetterStyle>
                    50
                    <PolygonStyle src="/static/home/polygon.png" />
                  </CoinImgBtnLetterStyle>
                </CoinMenuBtnContainerStyle>
              </CoinGroupStyle>
            )}
            {maticType === false && (
              <CoinGroupStyle>
                <CoinMenuBtnContainerStyle
                  onMouseEnter={() => {
                    setMMF5Btn('/static/home/menu-btn-hover.png');
                  }}
                  onMouseLeave={() => {
                    if (!mmf5BtnClick) setMMF5Btn('/static/home/menu-btn.png');
                  }}
                  onClick={() => {
                    setMMF5Btn('/static/home/menu-btn-hover.png');
                    setMMF10Btn('/static/home/menu-btn.png');
                    setMMF15Btn('/static/home/menu-btn.png');
                    setMMF25Btn('/static/home/menu-btn.png');
                    setMMF50Btn('/static/home/menu-btn.png');
                    setMMF5BtnClick(true);
                    setMMF10BtnClick(false);
                    setMMF15BtnClick(false);
                    setMMF25BtnClick(false);
                    setMMF50BtnClick(false);
                    setCoinMMFAmount(50);
                  }}
                >
                  <CoinImgBtnStyle src={mmf5Btn} />
                  <CoinImgBtnLetterStyle>
                    50
                    <PolygonStyle src="/static/home/mmf-token.png" />
                  </CoinImgBtnLetterStyle>
                </CoinMenuBtnContainerStyle>
                <CoinMenuBtnContainerStyle
                  onMouseEnter={() => {
                    setMMF10Btn('/static/home/menu-btn-hover.png');
                  }}
                  onMouseLeave={() => {
                    if (!mmf10BtnClick)
                      setMMF10Btn('/static/home/menu-btn.png');
                  }}
                  onClick={() => {
                    setMMF5Btn('/static/home/menu-btn.png');
                    setMMF10Btn('/static/home/menu-btn-hover.png');
                    setMMF15Btn('/static/home/menu-btn.png');
                    setMMF25Btn('/static/home/menu-btn.png');
                    setMMF50Btn('/static/home/menu-btn.png');
                    setMMF5BtnClick(false);
                    setMMF10BtnClick(true);
                    setMMF15BtnClick(false);
                    setMMF25BtnClick(false);
                    setMMF50BtnClick(false);
                    setCoinMMFAmount(150);
                  }}
                >
                  <CoinImgBtnStyle src={mmf10Btn} />
                  <CoinImgBtnLetterStyle>
                    150
                    <PolygonStyle src="/static/home/mmf-token.png" />
                  </CoinImgBtnLetterStyle>
                </CoinMenuBtnContainerStyle>
                <CoinMenuBtnContainerStyle
                  onMouseEnter={() => {
                    setMMF15Btn('/static/home/menu-btn-hover.png');
                  }}
                  onMouseLeave={() => {
                    if (!mmf15BtnClick)
                      setMMF15Btn('/static/home/menu-btn.png');
                  }}
                  onClick={() => {
                    setMMF5Btn('/static/home/menu-btn.png');
                    setMMF10Btn('/static/home/menu-btn.png');
                    setMMF15Btn('/static/home/menu-btn-hover.png');
                    setMMF25Btn('/static/home/menu-btn.png');
                    setMMF50Btn('/static/home/menu-btn.png');
                    setMMF5BtnClick(false);
                    setMMF10BtnClick(false);
                    setMMF15BtnClick(true);
                    setMMF25BtnClick(false);
                    setMMF50BtnClick(false);
                    setCoinMMFAmount(300);
                  }}
                >
                  <CoinImgBtnStyle src={mmf15Btn} />
                  <CoinImgBtnLetterStyle>
                    300
                    <PolygonStyle src="/static/home/mmf-token.png" />
                  </CoinImgBtnLetterStyle>
                </CoinMenuBtnContainerStyle>
                <CoinMenuBtnContainerStyle
                  onMouseEnter={() => {
                    setMMF25Btn('/static/home/menu-btn-hover.png');
                  }}
                  onMouseLeave={() => {
                    if (!mmf25BtnClick)
                      setMMF25Btn('/static/home/menu-btn.png');
                  }}
                  onClick={() => {
                    setMMF5Btn('/static/home/menu-btn.png');
                    setMMF10Btn('/static/home/menu-btn.png');
                    setMMF15Btn('/static/home/menu-btn.png');
                    setMMF25Btn('/static/home/menu-btn-hover.png');
                    setMMF50Btn('/static/home/menu-btn.png');
                    setMMF5BtnClick(false);
                    setMMF10BtnClick(false);
                    setMMF15BtnClick(false);
                    setMMF25BtnClick(true);
                    setMMF50BtnClick(false);
                    setCoinMMFAmount(400);
                  }}
                >
                  <CoinImgBtnStyle src={mmf25Btn} />
                  <CoinImgBtnLetterStyle>
                    400
                    <PolygonStyle src="/static/home/mmf-token.png" />
                  </CoinImgBtnLetterStyle>
                </CoinMenuBtnContainerStyle>
                <CoinMenuBtnContainerStyle
                  onMouseEnter={() => {
                    setMMF50Btn('/static/home/menu-btn-hover.png');
                  }}
                  onMouseLeave={() => {
                    if (!mmf50BtnClick)
                      setMMF50Btn('/static/home/menu-btn.png');
                  }}
                  onClick={() => {
                    setMMF5Btn('/static/home/menu-btn.png');
                    setMMF10Btn('/static/home/menu-btn.png');
                    setMMF15Btn('/static/home/menu-btn.png');
                    setMMF25Btn('/static/home/menu-btn.png');
                    setMMF50Btn('/static/home/menu-btn-hover.png');
                    setMMF5BtnClick(false);
                    setMMF10BtnClick(false);
                    setMMF15BtnClick(false);
                    setMMF25BtnClick(false);
                    setMMF50BtnClick(true);
                    setCoinMMFAmount(500);
                  }}
                >
                  <CoinImgBtnStyle src={mmf50Btn} />
                  <CoinImgBtnLetterStyle>
                    500
                    <PolygonStyle src="/static/home/mmf-token.png" />
                  </CoinImgBtnLetterStyle>
                </CoinMenuBtnContainerStyle>
              </CoinGroupStyle>
            )}
            <CoinTypeToggle>
              {maticType === true && (
                <ToggleLeftBtn
                  src={coinPath}
                  onClick={() => {
                    setMaticType(!maticType);
                    setCoinPath('/static/home/coin.png');
                  }}
                  onMouseEnter={() => {
                    setCoinPath('/static/home/coin-click.png');
                  }}
                  onMouseLeave={() => {
                    setCoinPath('/static/home/coin.png');
                  }}
                />
              )}
              {maticType === false && (
                <ToggleRightBtn
                  src={coinPath}
                  onClick={() => {
                    setMaticType(!maticType);
                    setCoinPath('/static/home/coin.png');
                  }}
                  onMouseEnter={() => {
                    setCoinPath('/static/home/coin-click.png');
                  }}
                  onMouseLeave={() => {
                    setCoinPath('/static/home/coin.png');
                  }}
                />
              )}
              <ToggleBtnTypographyStyle>
                {maticType === true ? 'MATIC' : 'MMF'}
              </ToggleBtnTypographyStyle>
            </CoinTypeToggle>
            <BetBtn onClick={handleBet}>
              <BetTypoStyle>DOUBLE OR NOTHING</BetTypoStyle>
            </BetBtn>
          </PanContainerStyle>
        </MotionInView>

        <MotionInView variants={varFadeInUp}>
          <WinLoseStyle>
            <WinLosePanCointerStyle sx={{ position: 'relative' }}>
              <WinLosePanStyle src="/static/home/wincoin.png" />
              <WinLosePanLetter1Style>heads won</WinLosePanLetter1Style>
              <WinLosePanLetter2Style>{headsWins}%</WinLosePanLetter2Style>
            </WinLosePanCointerStyle>
            <WinLosePanCointerStyle sx={{ position: 'relative' }}>
              <WinLosePanStyle src="/static/home/wincoin.png" />
              <WinLosePanLetter1Style>tails won</WinLosePanLetter1Style>
              <WinLosePanLetter2Style>{tailsWins}%</WinLosePanLetter2Style>
            </WinLosePanCointerStyle>
          </WinLoseStyle>
        </MotionInView>

        <MotionInView variants={varFadeInUp}>
          <PanContainerStyle>
            <RibbonRecentStyle src="/static/home/ribbon-recent-flips.png" />
            <Box
              sx={{
                padding: {
                  md: '0rem 2rem 4rem 2rem',
                  xs: '0rem 1rem 2rem 1rem'
                }
              }}
            >
              {recentFlips.map((item, key) => (
                <RecentListStyle key={key}>
                  <RecentListContentStyle>
                    <RecentListTypographyStyle>
                      {abbrAddr(item.betAddress)}
                      flipped {item.betAmount} {item.type} and&nbsp;
                      {item.win === true ? (
                        <>
                          <DoubledStyle>DOUBLED</DoubledStyle>&nbsp;it up.
                        </>
                      ) : (
                        <>
                          <LostStyle>LOST</LostStyle>&nbsp;it all.
                        </>
                      )}{' '}
                    </RecentListTypographyStyle>
                    <RecentListSecondStyle>
                      {getTimeFormat(item.time)} AGO
                    </RecentListSecondStyle>
                  </RecentListContentStyle>
                </RecentListStyle>
              ))}
            </Box>
          </PanContainerStyle>
        </MotionInView>

        <MotionInView variants={varFadeInUp}>
          <PanContainerStyle className={classes.volume}>
            <RibbonRecentStyle src="/static/home/ribbon-volume.png" />
            <Box
              display="flex"
              sx={{
                padding: {
                  md: '0rem 2rem 4rem 2rem',
                  xs: '0rem 1rem 2rem 1rem'
                }
              }}
            >
              <CoinTypeToggle>
                <ToggleBtnTypographyStyle>
                  {(totalMatic / 10 ** 18).toFixed(2).toString()}&nbsp;MATIC
                </ToggleBtnTypographyStyle>
              </CoinTypeToggle>
              <CoinTypeToggle>
                <ToggleBtnTypographyStyle>
                  {(totalMMF / 10 ** 18).toFixed(2).toString()}&nbsp;MMF
                </ToggleBtnTypographyStyle>
              </CoinTypeToggle>
            </Box>
          </PanContainerStyle>
        </MotionInView>

        <PopDialog
          open={popOpen}
          handleClose={handlePopClose}
          type={maticType}
          won={type}
          amount={maticType === true ? coinMaticAmount : coinMMFAmount}
        />
      </Container>
    </RootStyle>
  );
}
