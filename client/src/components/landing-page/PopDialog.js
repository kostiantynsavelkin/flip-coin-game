// material
import { Modal, Typography, useMediaQuery } from '@material-ui/core';
import {
  experimentalStyled as styled,
  makeStyles,
  useTheme
} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------
const useStyles = makeStyles(() => ({
  win: {
    color: '#16A86C'
  },
  lose: {
    color: '#D4421D'
  },
  nftSuccess: {
    color: '#16A86C',
    marginTop: '1rem'
  },
  nftFail: {
    color: '#D4421D',
    marginTop: '1rem'
  }
}));

const RootStyle = styled('div')(() => ({}));

const PanelStyle = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background:
    'linear-gradient(180deg, #F46531 0%, #F46E31 21.06%, #F4B031 39.81%, #F4B231 56.48%, #F4D370 72.11%, #F4E693 100%)',
  width: '370px',
  border: '7px solid #91181D',
  borderRadius: '3.5rem',
  [theme.breakpoints.down(1614)]: {
    width: '345px',
    border: '6px solid #91181D',
    borderRadius: '3rem'
  },
  [theme.breakpoints.down(1270)]: {
    width: '310px',
    border: '5px solid #91181D',
    borderRadius: '2rem'
  },
  [theme.breakpoints.down(950)]: {
    width: '270px',
    border: '4px solid #91181D',
    borderRadius: '1.5rem'
  },
  [theme.breakpoints.down(650)]: {
    width: '220px',
    border: '3px solid #91181D',
    borderRadius: '1rem'
  }
}));

const CoinMarkStyle = styled('img')(({ theme }) => ({
  width: '99px',
  height: '99px',
  margin: 'auto',
  [theme.breakpoints.down(1614)]: {
    width: '89px',
    height: '89px'
  },
  [theme.breakpoints.down(1270)]: {
    width: '79px',
    height: '79px'
  },
  [theme.breakpoints.down(960)]: {
    width: '69px',
    height: '69px'
  },
  [theme.breakpoints.down(650)]: {
    width: '59px',
    height: '59px'
  }
}));

const ResultWordStyle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Arcade Normal',
  fontStyle: 'normal',
  fontWeight: 400,
  textAlign: 'center',
  fontSize: '24px',
  lineHeight: '60px',
  color: '#000000',
  [theme.breakpoints.down(1614)]: {
    fontSize: '22px',
    lineHeight: '58px'
  },
  [theme.breakpoints.down(1270)]: {
    fontSize: '18px',
    lineHeight: '55px'
  },
  [theme.breakpoints.down(950)]: {
    fontSize: '15px',
    lineHeight: '50px'
  },
  [theme.breakpoints.down(650)]: {
    fontSize: '10px',
    lineHeight: '45px'
  }
}));

const AmountWordStyle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Arcade Normal',
  fontStyle: 'normal',
  fontWeight: 400,
  textAlign: 'center',
  fontSize: '18px',
  lineHeight: '22px',
  color: '#000000',
  [theme.breakpoints.down(1614)]: {
    fontSize: '16px',
    lineHeight: '22px'
  },
  [theme.breakpoints.down(1270)]: {
    fontSize: '12px',
    lineHeight: '22px'
  },
  [theme.breakpoints.down(950)]: {
    fontSize: '9px',
    lineHeight: '22px'
  },
  [theme.breakpoints.down(650)]: {
    fontSize: '8px',
    lineHeight: '22px'
  }
}));

const NoteLetterStyle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 700,
  textAlign: 'left',
  fontSize: '10px',
  lineHeight: '12px',
  color: '#0a0707',
  margin: '0 1.5rem',
  [theme.breakpoints.down(1614)]: {
    fontSize: '10px',
    lineHeight: '12px',
    margin: '0 1.5rem'
  },
  [theme.breakpoints.down(1270)]: {
    fontSize: '10px',
    lineHeight: '12px',
    margin: '0 1.5rem'
  },
  [theme.breakpoints.down(950)]: {
    fontSize: '9px',
    lineHeight: '11px',
    margin: '0 1.5rem'
  },
  [theme.breakpoints.down(650)]: {
    fontSize: '8px',
    lineHeight: '10px',
    margin: '0 1.5rem'
  }
}));

const SuccessLetterStyle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Arcade Normal',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '16px',
  margin: '1.2rem auto',
  background: '#16A86C',
  width: '230px',
  textAlign: 'center',
  borderRadius: '1rem',
  color: 'white',
  padding: '0.8rem 1.4rem',
  [theme.breakpoints.down(1614)]: {
    fontSize: '11px',
    lineHeight: '16px',
    margin: '1.2rem auto',
    width: '220px',
    padding: '0.8rem 1rem'
  },
  [theme.breakpoints.down(1270)]: {
    fontSize: '10px',
    lineHeight: '16px',
    margin: '0.9rem auto',
    width: '200px',
    padding: '0.7rem 0.8rem'
  },
  [theme.breakpoints.down(950)]: {
    fontSize: '9px',
    lineHeight: '13px',
    margin: '0.7rem auto',
    width: '180px',
    padding: '0.7rem 0.8rem'
  },
  [theme.breakpoints.down(650)]: {
    fontSize: '8px',
    lineHeight: '12px',
    margin: '0.5rem auto',
    width: '150px',
    padding: '0.5rem 0.7rem'
  }
}));

const ErrorLetterStyle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Arcade Normal',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '16px',
  margin: '1.2rem auto',
  background: '#D4421D',
  width: '230px',
  textAlign: 'center',
  borderRadius: '1rem',
  color: 'white',
  padding: '0.8rem 1.4rem',
  [theme.breakpoints.down(1614)]: {
    fontSize: '11px',
    lineHeight: '16px',
    margin: '1.2rem auto',
    width: '220px',
    padding: '0.8rem 1rem'
  },
  [theme.breakpoints.down(1270)]: {
    fontSize: '10px',
    lineHeight: '16px',
    margin: '0.9rem auto',
    width: '200px',
    padding: '0.7rem 0.8rem'
  },
  [theme.breakpoints.down(950)]: {
    fontSize: '9px',
    lineHeight: '13px',
    margin: '0.7rem auto',
    width: '180px',
    padding: '0.7rem 0.8rem'
  },
  [theme.breakpoints.down(650)]: {
    fontSize: '8px',
    lineHeight: '12px',
    margin: '0.5rem auto',
    width: '150px',
    padding: '0.5rem 0.7rem'
  }
}));

const WaitImgStyle = styled('img')(({ theme }) => ({
  width: '170px',
  height: '40px',
  margin: '1.5rem auto',
  [theme.breakpoints.down(1614)]: {
    width: '150px',
    height: '35px',
    margin: '1.3rem auto'
  },
  [theme.breakpoints.down(1270)]: {
    width: '120px',
    height: '28px',
    margin: '1.1rem auto'
  },
  [theme.breakpoints.down(960)]: {
    width: '100px',
    height: '22px',
    margin: '0.8rem auto'
  },
  [theme.breakpoints.down(650)]: {
    width: '80px',
    height: '18px',
    margin: '0.5rem auto'
  }
}));

const BoxImgStyle = styled('img')(({ theme }) => ({
  width: '288px',
  height: '112px',
  margin: '1.5rem auto',
  [theme.breakpoints.down(1614)]: {
    width: '288px',
    height: '112px'
  },
  [theme.breakpoints.down(1270)]: {
    width: '248px',
    height: '94px'
  },
  [theme.breakpoints.down(960)]: {
    width: '208px',
    height: '78px'
  },
  [theme.breakpoints.down(650)]: {
    width: '168px',
    height: '62px',
    margin: '0.5rem auto'
  }
}));

const CloseMarkStyle = styled('img')(({ theme }) => ({
  width: '26px',
  height: '26px',
  position: 'absolute',
  top: '1.4rem',
  right: '1.4rem',
  [theme.breakpoints.down(1614)]: {
    width: '19px',
    height: '19px',
    top: '1.3rem',
    right: '1.3rem'
  },
  [theme.breakpoints.down(1270)]: {
    width: '16px',
    height: '16px',
    top: '1.1rem',
    right: '1.1rem'
  },
  [theme.breakpoints.down(950)]: {
    width: '12px',
    height: '12px',
    top: '0.9rem',
    right: '0.9em'
  },
  [theme.breakpoints.down(650)]: {
    width: '10px',
    height: '10px',
    top: '0.7rem',
    right: '0.7rem'
  },
  '&:hover': {
    cursor: 'pointer'
  }
}));

PopDialog.propTypes = {
  open: PropTypes.any,
  handleClose: PropTypes.func,
  won: PropTypes.any,
  type: PropTypes.any,
  amount: PropTypes.any
};

export default function PopDialog({ open, handleClose, type, won, amount }) {
  const classes = useStyles();
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up(650));

  return (
    <RootStyle>
      <Modal open={open}>
        <PanelStyle>
          {won !== 0 && won !== 1 && won !== 5 && won !== 6 && (
            <CoinMarkStyle
              src={
                upMd
                  ? '/static/home/coin-gif-desk.gif'
                  : '/static/home/coin-gif-mobile.gif'
              }
            />
          )}
          {(won < 2 || won === 3 || won === 5 || won === 6) && (
            <CloseMarkStyle
              src="/static/home/close.png"
              onClick={handleClose}
            />
          )}
          <ResultWordStyle>
            {won === 0 && 'you win'}
            {won === 1 && 'you lost'}
            {won === 2 && 'processing'}
            {won === 3 && 'Token Approving'}
            {won === 4 && 'Requesting'}
            {won === 7 && 'processing'}
          </ResultWordStyle>
          {won < 5 && (
            <AmountWordStyle className={won !== 1 ? classes.win : classes.lose}>
              {amount}&nbsp;{type === true ? 'MATIC' : 'MMF'}
            </AmountWordStyle>
          )}
          {won >= 2 && won <= 4 && (
            <WaitImgStyle src="/static/home/pop-wait.png" />
          )}
          {won === 7 && <WaitImgStyle src="/static/home/pop-wait.png" />}
          {won > 1 && won < 5 && (
            <NoteLetterStyle>
              1. Normal Processing time- 90-120 seconds (Might take less or more
              depending on network congestion)
            </NoteLetterStyle>
          )}
          {won === 5 && (
            <SuccessLetterStyle>Mint Successful</SuccessLetterStyle>
          )}
          {won === 6 && (
            <ErrorLetterStyle>Something Went Wrong</ErrorLetterStyle>
          )}
          {won > 1 && won < 5 && (
            <NoteLetterStyle>
              2. MMF token requires authorization twice on wallet.
            </NoteLetterStyle>
          )}
          <BoxImgStyle src="/static/home/pop-box.png" />
        </PanelStyle>
      </Modal>
    </RootStyle>
  );
}
