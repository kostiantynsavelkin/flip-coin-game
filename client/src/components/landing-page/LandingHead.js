// material
import {
  makeStyles,
  experimentalStyled as styled,
  useTheme
} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Container, Box, Typography, useMediaQuery } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import { useWallet } from 'use-wallet';

//
import { MIconButton } from '../@material-extend';
// routes
//
import {
  varFadeInUp,
  MotionInView,
  varFadeInLeft,
  varFadeInRight
} from '../animate';
import ConnectModal from '../connectModal';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  height: '778px',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  [theme.breakpoints.down(1614)]: { height: '691px' },
  [theme.breakpoints.down(1270)]: { height: '535px' },
  [theme.breakpoints.down(950)]: {
    height: '463px'
  },
  [theme.breakpoints.down(650)]: {
    height: '160px'
  }
}));

const CoverImgStyle = styled('img')(() => ({
  flexShrink: 0
}));

const ContainerStyle = styled(Container)(({ theme }) => ({
  position: 'absolute',
  top: '0px',
  zIndex: 1,
  display: 'flex',
  justifyContent: 'space-between',
  maxWidth: '1440px !important',
  [theme.breakpoints.down(1614)]: { maxWidth: '1280px !important' },
  [theme.breakpoints.down(1270)]: {},
  [theme.breakpoints.down('md')]: {
    padding: '1rem 0'
  }
}));

const MenuBtnContainerStyle = styled(Box)(({ theme }) => ({
  width: '140px',
  height: '48px',
  position: 'relative',
  marginLeft: '0.3rem',
  marginRight: '0.3rem',
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
    marginLeft: '0.1rem',
    marginRight: '0.1rem'
  },
  [theme.breakpoints.down(650)]: {
    width: '60',
    height: '46px',
    marginLeft: '0rem',
    marginRight: '0rem'
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
    display: 'none'
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

const ImgBtnLeaderStyle = styled(Typography)(({ theme }) => ({
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
    lineHeight: '23px',
    position: 'absolute',
    top: '35%',
    left: '50%',
    transform: 'translate(-50%, -50%) !important',
    '&:hover': {}
  }
}));

const ImgBtnBoardStyle = styled(Typography)(({ theme }) => ({
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
    lineHeight: '23px',
    position: 'absolute',
    top: '65%',
    left: '50%',
    transform: 'translate(-50%, -50%) !important'
  }
}));

const LogoStyle = styled('img')(({ theme }) => ({
  width: '104px',
  height: '89px',
  cursor: 'pointer',
  [theme.breakpoints.down(1614)]: {
    width: '104px',
    height: '89px'
  },
  [theme.breakpoints.down(1270)]: {
    width: '106px',
    height: '90px'
  },
  [theme.breakpoints.down(950)]: {
    width: '75px',
    height: '65px'
  },
  [theme.breakpoints.down(650)]: {
    display: 'none'
  }
}));

const MenuListStyle = styled(Box)(() => ({
  border: '4px solid #AB383B',
  background:
    'linear-gradient(180deg, #F4DA7D 0%, #F4B638 33.04%, #F4B331 59.61%, #F46B31 100%)',
  position: 'relative',
  width: '100%',
  height: '54px',
  borderRadius: '16px',
  margin: '0rem 0',
  '&:hover': {
    cursor: 'pointer'
  }
}));

const MenuListContentStyle = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) !important',
  justifyContent: 'space-between',
  padding: '0rem',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    cursor: 'pointer'
  }
}));

const StickStyle = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: '-2rem',
  left: '-3rem',
  zIndex: '100',
  width: '112px',
  height: '56px',
  '&:hover': {
    // cursor: 'pointer',
    // transition: '0.5s ease',
    // left: '-1rem'
  },
  [theme.breakpoints.up(650)]: {
    display: 'none'
  }
}));

const StickImageStyle = styled('img')(({ theme }) => ({
  width: '112px',
  height: '56px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) !important',
  [theme.breakpoints.up(650)]: {
    display: 'none'
  }
}));

const StickTypoStyle = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) !important',
  fontFamily: 'Arcade Normal',
  fontStyle: 'normal',
  fontWeight: 400,
  width: '20px',
  textAlign: 'center',
  fontSize: '8px',
  lineHeight: '12px',
  marginLeft: '0.5rem',
  color: '#000000',
  [theme.breakpoints.up(650)]: {
    display: 'none'
  }
}));

const useStyles = makeStyles((theme) => ({
  goldBack: {
    width: '1140px',
    paddingTop: '7rem',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) !important',
    [theme.breakpoints.down(1614)]: {
      paddingTop: '8rem',
      width: '800px'
    },
    [theme.breakpoints.down(1270)]: {
      width: '650px',
      paddingTop: '10rem'
    },
    [theme.breakpoints.down(950)]: {
      width: '577px',
      paddingTop: '7rem'
    },
    [theme.breakpoints.down(650)]: {
      width: '266px',
      paddingTop: '1rem'
    },
    zIndex: 0
  },
  leftBack: {
    height: '727px',
    position: 'absolute',
    left: '0px',
    zIndex: 0,
    paddingTop: theme.spacing(0),
    [theme.breakpoints.down(1614)]: {
      width: '627px'
    },
    [theme.breakpoints.down(1270)]: {
      width: '477px'
    },
    [theme.breakpoints.down(950)]: {
      width: '409px'
    },
    [theme.breakpoints.down(650)]: {
      width: '152px'
    }
  },
  rightBack: {
    height: '733px',
    position: 'absolute',
    right: '0px',
    zIndex: 0,
    paddingTop: theme.spacing(0),
    [theme.breakpoints.down(1614)]: {
      width: '300px'
    },
    [theme.breakpoints.down(1270)]: {
      width: '234px'
    },
    [theme.breakpoints.down(950)]: {
      width: '194px'
    },
    [theme.breakpoints.down(650)]: {
      width: '74px',
      transform: 'none!important'
    }
  },
  rightBar: {
    borderRight: '1px solid #000'
  },
  leftBar: {
    borderLeft: '1px solid #000'
  },
  menuHover: {
    color: 'white!important'
  }
}));
// ----------------------------------------------------------------------
LandingHead.propTypes = {
  pageURL: PropTypes.any
};

export default function LandingHead({ pageURL }) {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const wallet = useWallet();

  const upMd = useMediaQuery(theme.breakpoints.up(650));
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [mintnowURL, setMintnowURL] = useState(
    pageURL === 'mintnowURL'
      ? '/static/home/menu-btn-hover.png'
      : '/static/home/menu-btn.png'
  );
  const [mystatsURL, setMystatsURL] = useState(
    pageURL === 'mystatsURL'
      ? '/static/home/menu-btn-hover.png'
      : '/static/home/menu-btn.png'
  );
  const [leaderboardURL, setLeaderboardURL] = useState(
    pageURL === 'leaderboardURL'
      ? '/static/home/menu-btn-hover.png'
      : '/static/home/menu-btn.png'
  );
  const [streaksURL, setStreaksURL] = useState(
    pageURL === 'streaksURL'
      ? '/static/home/menu-btn-hover.png'
      : '/static/home/menu-btn.png'
  );
  const [connectURL, setConnectURL] = useState('/static/home/menu-btn.png');

  const [account, setAccount] = useState(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    // wallet.connect();
  };
  const handleClose = () => setOpen(false);

  const [login, setLogin] = useState(false);

  /* eslint-disable-next-line */
  const handleConnect = async (e) => {
    e.preventDefault();

    if (wallet.status === 'disconnected') {
      handleOpen();
    } else if (wallet.status === 'error') {
      enqueueSnackbar('Please select the Polygon network.', {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });

      setAccount(null);
      wallet.reset();
    }
  };

  /* eslint-disable-next-line */
  useEffect(async () => {
    if (window.web3 === null && !open) handleOpen();
    // setInterval(async () => {
    //   if (wallet.status !== 'connected') {
    //     if (!open) handleOpen();
    //   }
    // }, 3000);
    /* eslint-disable-next-line */
  }, []);

  return (
    <RootStyle>
      <ContainerStyle maxWidth="lg">
        <LogoStyle
          src="/static/home/logo.png"
          onClick={() => {
            history.push('/');
          }}
        />
        {upMd && (
          <Box display="flex" alignItems="center">
            <MenuBtnContainerStyle
              onMouseEnter={() => {
                setMintnowURL('/static/home/menu-btn-hover.png');
              }}
              onMouseLeave={() => {
                if (pageURL !== 'mintnowURL') {
                  setMintnowURL('/static/home/menu-btn.png');
                }
              }}
              onClick={() => {
                history.push('/mint');
              }}
            >
              <ImgBtnStyle src={mintnowURL} />
              <ImgBtnLetterStyle>MINT NOW</ImgBtnLetterStyle>
            </MenuBtnContainerStyle>
            <MenuBtnContainerStyle
              onMouseEnter={() => {
                setMystatsURL('/static/home/menu-btn-hover.png');
              }}
              onMouseLeave={() => {
                if (pageURL !== 'mystatsURL') {
                  setMystatsURL('/static/home/menu-btn.png');
                }
              }}
              onClick={() => {
                history.push('/mystats');
              }}
            >
              <ImgBtnStyle src={mystatsURL} />
              <ImgBtnLetterStyle>MY STATS</ImgBtnLetterStyle>
            </MenuBtnContainerStyle>
            <MenuBtnContainerStyle
              onMouseEnter={() => {
                setLeaderboardURL('/static/home/menu-btn-hover.png');
              }}
              onMouseLeave={() => {
                if (pageURL !== 'leaderboardURL') {
                  setLeaderboardURL('/static/home/menu-btn.png');
                }
              }}
              onClick={() => {
                history.push('/leaderboard');
              }}
            >
              <ImgBtnStyle src={leaderboardURL} />
              <ImgBtnLetterStyle>LEADERBOARD</ImgBtnLetterStyle>
            </MenuBtnContainerStyle>
            <MenuBtnContainerStyle
              onMouseEnter={() => {
                setStreaksURL('/static/home/menu-btn-hover.png');
              }}
              onMouseLeave={() => {
                if (pageURL !== 'streaksURL') {
                  setStreaksURL('/static/home/menu-btn.png');
                }
              }}
              onClick={() => {
                history.push('/streaks');
              }}
            >
              <ImgBtnStyle src={streaksURL} />
              <ImgBtnLetterStyle>STREAKS</ImgBtnLetterStyle>
            </MenuBtnContainerStyle>
            <MenuBtnContainerStyle
              onMouseEnter={() => {
                setConnectURL('/static/home/menu-btn-hover.png');
              }}
              onMouseLeave={() => {
                setConnectURL('/static/home/menu-btn.png');
              }}
              onClick={() => {
                if (wallet.status === 'connected') {
                  localStorage.removeItem('connectedWallet');
                  setLogin(false);
                  wallet.reset();
                  setAccount(null);
                  window.web3 = null;
                } else setOpen(true);
              }}
            >
              <ImgBtnStyle src={connectURL} />
              <ImgBtnLetterStyle>
                {/* {account == null
                  ? 'Connect'
                  : account.substring(0, 4) +
                    '...' +
                    account.substring(account.length - 2, account.length)} */}
                {account == null ? 'Connect' : 'Disconnect'}
              </ImgBtnLetterStyle>
            </MenuBtnContainerStyle>
          </Box>
        )}
        {!upMd && (
          <MenuListStyle>
            <MenuListContentStyle>
              <MenuBtnContainerStyle className={classes.rightBar}>
                <ImgBtnLetterStyle
                  className={pageURL === 'mintnowURL' ? classes.menuHover : ''}
                  onClick={() => {
                    history.push('/mint');
                  }}
                >
                  MINT NOW
                </ImgBtnLetterStyle>
              </MenuBtnContainerStyle>
              <MenuBtnContainerStyle
                onClick={() => {
                  history.push('/mystats');
                }}
                className={classes.rightBar}
              >
                <ImgBtnLetterStyle
                  className={pageURL === 'mystatsURL' ? classes.menuHover : ''}
                >
                  MY STATS
                </ImgBtnLetterStyle>
              </MenuBtnContainerStyle>
              <MenuBtnContainerStyle
                onClick={() => {
                  history.push('/leaderboard');
                }}
                className={classes.rightBar}
                sx={{
                  '&:hover': {
                    cursor: 'pointer',
                    '& .leaderboard': {
                      color: '#fff'
                    }
                  }
                }}
              >
                <ImgBtnLeaderStyle
                  className={
                    pageURL === 'leaderboardURL'
                      ? classes.menuHover
                      : 'leaderboard'
                  }
                >
                  LEADER
                </ImgBtnLeaderStyle>
                <ImgBtnBoardStyle
                  className={
                    pageURL === 'leaderboardURL'
                      ? classes.menuHover
                      : 'leaderboard'
                  }
                >
                  BOARD
                </ImgBtnBoardStyle>
              </MenuBtnContainerStyle>
              <MenuBtnContainerStyle
                onClick={() => {
                  history.push('/streaks');
                }}
                className={classes.rightBar}
              >
                <ImgBtnLetterStyle
                  className={pageURL === 'streaksURL' ? classes.menuHover : ''}
                >
                  STREAKS
                </ImgBtnLetterStyle>
              </MenuBtnContainerStyle>
              <MenuBtnContainerStyle
                onClick={() => {
                  if (wallet.status === 'connected') {
                    localStorage.removeItem('connectedWallet');
                    setLogin(false);
                    wallet.reset();
                    setAccount(null);
                  } else setOpen(true);
                }}
              >
                <ImgBtnLetterStyle>
                  {/* {account == null
                    ? 'Connect'
                    : account.substring(0, 4) +
                      '...' +
                      account.substring(account.length - 2, account.length)} */}
                  {account == null ? 'Connect' : 'Disconnect'}
                </ImgBtnLetterStyle>
              </MenuBtnContainerStyle>
            </MenuListContentStyle>
          </MenuListStyle>
        )}
      </ContainerStyle>
      <MotionInView variants={varFadeInUp} className={classes.goldBack}>
        <CoverImgStyle alt="post cover" src="/static/home/gold-back-1@2x.png" />
      </MotionInView>
      <MotionInView variants={varFadeInLeft} className={classes.leftBack}>
        <CoverImgStyle alt="post cover" src="/static/home/left-stone.png" />
      </MotionInView>
      <MotionInView variants={varFadeInRight} className={classes.rightBack}>
        <CoverImgStyle alt="post cover" src="/static/home/right-stone.png" />
      </MotionInView>
      <StickStyle>
        <StickImageStyle src="/static/home/stickbar.png" />
        <StickTypoStyle
          onClick={() => {
            history.push('/');
          }}
        >
          main page
        </StickTypoStyle>
      </StickStyle>
      <ConnectModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        setAccount={setAccount}
        account={account}
        login={login}
        setLogin={setLogin}
      />
    </RootStyle>
  );
}
