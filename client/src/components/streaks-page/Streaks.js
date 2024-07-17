// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Container, Typography } from '@material-ui/core';
import { useState, useEffect } from 'react';
import axios from 'axios';

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

const ListContainerStyle = styled('div')(({ theme }) => ({
  height: '800px',
  overflow: 'auto',
  borderColor: '#91181D',
  borderWidth: '0.5rem',
  border: 'solid 6px #91181D',
  borderRadius: '2rem',
  background: '#fff',
  margin: '0rem 3rem 3rem 3rem',
  '&::-webkit-scrollbar': {
    width: '4.5px'
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent'
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#cd686c',
    borderRadius: '4.5px'
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#bd2d33'
  },
  [theme.breakpoints.down(1614)]: {
    height: '706px',
    margin: '0rem 2.7rem 2.7rem 2.7rem',
    border: 'solid 5.4.5px #91181D',
    borderRadius: '1.8rem',
    '&::-webkit-scrollbar': {
      width: '4px'
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#cd686c',
      borderRadius: '4px'
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#bd2d33'
    }
  },
  [theme.breakpoints.down(1270)]: {
    height: '566px',
    margin: '0rem 2rem 2rem 2rem',
    border: 'solid 4.5px #91181D',
    borderRadius: '1.4rem',
    '&::-webkit-scrollbar': {
      width: '3px'
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#cd686c',
      borderRadius: '3px'
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#bd2d33'
    }
  },
  [theme.breakpoints.down(950)]: {
    height: '416px',
    margin: '0rem 1.5rem 1.5rem 1.5rem',
    border: 'solid 4px #91181D',
    borderRadius: '1rem',
    '&::-webkit-scrollbar': {
      width: '2px'
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#cd686c',
      borderRadius: '2px'
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#bd2d33'
    }
  },
  [theme.breakpoints.down(650)]: {
    height: '311px',
    margin: '0rem 0.5rem 1rem 0.5rem',
    border: 'solid 3px #91181D',
    borderRadius: '0.9rem',
    '&::-webkit-scrollbar': {
      width: '1px'
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#cd686c',
      borderRadius: '1px'
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#bd2d33'
    }
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
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
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

const GroupCoinStyle = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between'
}));

const CoinTypeToggle = styled(Box)(({ theme }) => ({
  width: '70px',
  height: '70px',
  position: 'relative',
  margin: '0 1.6rem',
  [theme.breakpoints.down(1614)]: {
    width: '60px',
    height: '60px',
    margin: '0 1.4rem'
  },
  [theme.breakpoints.down(1270)]: {
    width: '42px',
    height: '42px',
    margin: '0 1.2rem'
  },
  [theme.breakpoints.down(950)]: {
    width: '34.5px',
    height: '34.5px',
    margin: '0 1rem'
  },
  [theme.breakpoints.down(650)]: {
    width: '30px',
    height: '30px',
    margin: '0 0.1rem'
  },
  '&:hover': {
    cursor: 'pointer !important'
  }
}));

const CoinToggleBtn = styled('img')(({ theme }) => ({
  width: '70px',
  height: '70px',
  [theme.breakpoints.down(1614)]: { width: '60px', height: '60px' },
  [theme.breakpoints.down(1270)]: { width: '42px', height: '42px' },
  [theme.breakpoints.down(950)]: { width: '34.5px', height: '34.5px' },
  [theme.breakpoints.down(650)]: { width: '30px', height: '30px' },
  '&:hover': {
    cursor: 'pointer !important'
  }
}));

const CoinToggleBtnTypographyStyle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Arcade Normal',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '20px',
  lineHeight: '39.83px',
  color: '#000',
  textAlign: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) !important',
  [theme.breakpoints.down(1614)]: { fontSize: '16px' },
  [theme.breakpoints.down(1270)]: { fontSize: '12px' },
  [theme.breakpoints.down(950)]: { fontSize: '10px' },
  [theme.breakpoints.down(650)]: { fontSize: '9px' }
}));

const TypeToggle = styled(Box)(({ theme }) => ({
  background: '#91181D',
  position: 'relative',
  width: '232px',
  height: '44.5px',
  borderRadius: '0.6rem',
  border: '3.8px solid #F48131',
  marginTop: '1rem',
  marginBottom: '1rem',
  [theme.breakpoints.down(1614)]: {
    width: '232px',
    height: '44.5px',
    borderRadius: '0.6rem',
    border: '3px solid #F48131'
  },
  [theme.breakpoints.down(1270)]: {
    width: '161px',
    height: '34px',
    borderRadius: '0.5rem',
    border: '2px solid #F48131'
  },
  [theme.breakpoints.down(950)]: {
    width: '134px',
    height: '30px',
    borderRadius: '0.5rem',
    border: '1px solid #F48131'
  },
  [theme.breakpoints.down(650)]: {
    width: '104px',
    height: '24.5px',
    borderRadius: '0.4rem',
    border: '1px solid #F48131'
  }
}));

const ToggleLeftBtn = styled('img')(({ theme }) => ({
  width: '80px',
  height: '80px',
  position: 'absolute',
  top: '50%',
  left: '0%',
  transform: 'translate(-50%, -50%) !important',
  [theme.breakpoints.down(1614)]: { width: '70px', height: '70px' },
  [theme.breakpoints.down(1270)]: { width: '58px', height: '58px' },
  [theme.breakpoints.down(950)]: { width: '50px', height: '50px' },
  [theme.breakpoints.down(650)]: { width: '38px', height: '38px' },
  '&:hover': {
    cursor: 'pointer !important'
  }
}));

const ToggleRightBtn = styled('img')(({ theme }) => ({
  width: '80px',
  height: '80px',
  position: 'absolute',
  top: '50%',
  right: '0%',
  transform: 'translate(50%, -50%) !important',
  [theme.breakpoints.down(1614)]: { width: '70px', height: '70px' },
  [theme.breakpoints.down(1270)]: { width: '58px', height: '58px' },
  [theme.breakpoints.down(950)]: { width: '50px', height: '50px' },
  [theme.breakpoints.down(650)]: { width: '38px', height: '38px' },
  '&:hover': {
    cursor: 'pointer !important'
  }
}));

const ToggleBtnTypographyStyle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Arcade Normal',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '20px',
  lineHeight: '39.83px',
  color: '#FFFFFF',
  textAlign: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) !important',
  [theme.breakpoints.down(1614)]: { fontSize: '16px' },
  [theme.breakpoints.down(1270)]: { fontSize: '12px' },
  [theme.breakpoints.down(950)]: { fontSize: '10px' },
  [theme.breakpoints.down(650)]: { fontSize: '8px' }
}));

const ListStyle = styled(Box)(({ theme }) => ({
  background: '#fff',
  position: 'relative',
  height: '61px',
  margin: '0rem',
  borderBottom: '2px solid #91181D',
  [theme.breakpoints.down(1614)]: {
    height: '54px',
    borderBottom: '1.8px solid #91181D'
  },
  [theme.breakpoints.down(1270)]: {
    height: '44.5px',
    borderBottom: '1.4.5px solid #91181D'
  },
  [theme.breakpoints.down(950)]: {
    height: '34px',
    borderBottom: '1.2px solid #91181D'
  },
  [theme.breakpoints.down(650)]: {
    height: '35.5px',
    borderBottom: '1px solid #91181D'
  }
}));

const ListWrapStyle = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) !important',
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  padding: '0 1.2rem',
  [theme.breakpoints.down(1614)]: {
    padding: '0 1rem'
  },
  [theme.breakpoints.down(1270)]: {
    padding: '0 0.8rem'
  },
  [theme.breakpoints.down(950)]: {
    padding: '0 0.6rem'
  },
  [theme.breakpoints.down(650)]: {
    padding: '0 0.1rem'
  }
}));

const RecentListTypographyStyle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Arcade Normal',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14.5px',
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
    fontSize: '6px',
    lineHeight: '12px'
  }
}));

const DoubledStyle = styled('span')(({ theme }) => ({
  color: '#16A86C',
  fontFamily: 'Arcade Normal',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14.5px',
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
    fontSize: '6px',
    lineHeight: '12px'
  }
}));

const RecentListSecondStyle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Arcade Normal',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14.5px',
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
    fontSize: '6px',
    lineHeight: '12px'
  }
}));

// ----------------------------------------------------------------------

export default function LandingStreaks() {
  const [streaks, setStreaks] = useState([]);
  const [maticType, setMaticType] = useState(true);
  const [timeDuration, setTimeDuration] = useState(1);
  const [timePath1, setTimePath1] = useState('/static/home/coin.png');
  const [timePath2, setTimePath2] = useState('/static/home/coin.png');
  const [timePath3, setTimePath3] = useState('/static/home/coin.png');
  const [timePath4, setTimePath4] = useState('/static/home/coin.png');
  const [starPath, setStarPath] = useState('/static/home/star.png');

  const abbrAddr = (addr) =>
    addr.substring(0, 4) +
    '**' +
    addr.substring(addr.length - 2, addr.length) +
    ' ';

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

  const getStreaksData = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/streaks/get`,
        { duration: timeDuration, betType: maticType === true ? 0 : 1 }
      );
      if (response.data.message === 'success') {
        setStreaks(response.data.result);
      } else {
        setStreaks([]);
      }
    } catch (e) {
      console.log('e');
      setStreaks([]);
    }
  };
  // eslint-disable-next-line
  useEffect(async () => {
    // eslint-disable-next-line
    getStreaksData();
    // eslint-disable-next-line
  }, [maticType, timeDuration]);

  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <MotionInView variants={varFadeInUp}>
          <PanContainerStyle
            sx={{
              marginTop: { xs: '2rem', md: '6rem' }
            }}
          >
            <RibbonForStyle src="/static/home/ribbon-streaks.png" />
            <GroupStyle>
              <GroupCoinStyle>
                <CoinTypeToggle
                  onClick={() => {
                    setTimePath1('/static/home/coin.png');
                    setTimeDuration(1);
                  }}
                  onMouseEnter={() => {
                    setTimePath1('/static/home/coin-click.png');
                  }}
                  onMouseLeave={() => {
                    setTimePath1('/static/home/coin.png');
                  }}
                >
                  <CoinToggleBtn
                    src={
                      timeDuration === 1
                        ? '/static/home/coin-click.png'
                        : timePath1
                    }
                  />
                  <CoinToggleBtnTypographyStyle>
                    1D
                  </CoinToggleBtnTypographyStyle>
                </CoinTypeToggle>
                <CoinTypeToggle
                  onClick={() => {
                    setTimePath2('/static/home/coin.png');
                    setTimeDuration(7);
                  }}
                  onMouseEnter={() => {
                    setTimePath2('/static/home/coin-click.png');
                  }}
                  onMouseLeave={() => {
                    setTimePath2('/static/home/coin.png');
                  }}
                >
                  <CoinToggleBtn
                    src={
                      timeDuration === 7
                        ? '/static/home/coin-click.png'
                        : timePath2
                    }
                  />
                  <CoinToggleBtnTypographyStyle>
                    7D
                  </CoinToggleBtnTypographyStyle>
                </CoinTypeToggle>
                <CoinTypeToggle
                  onMouseEnter={() => {
                    setTimePath3('/static/home/coin-click.png');
                  }}
                  onMouseLeave={() => {
                    setTimePath3('/static/home/coin.png');
                  }}
                  onClick={() => {
                    setTimePath3('/static/home/coin.png');
                    setTimeDuration(30);
                  }}
                >
                  <CoinToggleBtn
                    src={
                      timeDuration === 30
                        ? '/static/home/coin-click.png'
                        : timePath3
                    }
                  />
                  <CoinToggleBtnTypographyStyle>
                    1M
                  </CoinToggleBtnTypographyStyle>
                </CoinTypeToggle>
                <CoinTypeToggle
                  onClick={() => {
                    setTimePath3('/static/home/coin.png');
                    setTimeDuration(1000);
                  }}
                  onMouseEnter={() => {
                    setTimePath4('/static/home/coin-click.png');
                  }}
                  onMouseLeave={() => {
                    setTimePath4('/static/home/coin.png');
                  }}
                >
                  <CoinToggleBtn
                    src={
                      timeDuration === 1000
                        ? '/static/home/coin-click.png'
                        : timePath4
                    }
                  />
                  <CoinToggleBtnTypographyStyle>
                    LT
                  </CoinToggleBtnTypographyStyle>
                </CoinTypeToggle>
              </GroupCoinStyle>
              <TypeToggle>
                {maticType === true && (
                  <ToggleLeftBtn
                    src={starPath}
                    onClick={() => {
                      setMaticType(!maticType);
                      setStarPath('/static/home/star.png');
                    }}
                    onMouseEnter={() => {
                      setStarPath('/static/home/star-hover.png');
                    }}
                    onMouseLeave={() => {
                      setStarPath('/static/home/star.png');
                    }}
                  />
                )}
                {maticType === false && (
                  <ToggleRightBtn
                    src={starPath}
                    onClick={() => {
                      setMaticType(!maticType);
                      setStarPath('/static/home/star.png');
                    }}
                    onMouseEnter={() => {
                      setStarPath('/static/home/star-hover.png');
                    }}
                    onMouseLeave={() => {
                      setStarPath('/static/home/star.png');
                    }}
                  />
                )}
                <ToggleBtnTypographyStyle>
                  {maticType === true ? 'MATIC' : 'MMF'}
                </ToggleBtnTypographyStyle>
              </TypeToggle>
            </GroupStyle>
            <ListContainerStyle>
              {streaks.map((item, key) => (
                <ListStyle key={key}>
                  <ListWrapStyle>
                    <RecentListTypographyStyle>
                      {abbrAddr(item.betAddress)}
                      flipped {item.amount} and&nbsp;
                      <DoubledStyle>DOUBLED {item.streaks} Times.</DoubledStyle>
                      &nbsp;
                    </RecentListTypographyStyle>
                    <RecentListSecondStyle>
                      {getTimeFormat(item.time)} AGO
                    </RecentListSecondStyle>
                  </ListWrapStyle>
                </ListStyle>
              ))}
            </ListContainerStyle>
          </PanContainerStyle>
        </MotionInView>
      </Container>
    </RootStyle>
  );
}
