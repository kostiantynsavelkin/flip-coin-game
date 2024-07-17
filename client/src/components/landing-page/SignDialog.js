// material
import { Modal, Typography, Box } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({}));

const PanelStyle = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background:
    'linear-gradient(180deg, #F46531 0%, #F46E31 21.06%, #F4B031 39.81%, #F4B231 56.48%, #F4D370 72.11%, #F4E693 100%)',
  width: '800px',
  border: '7px solid #91181D',
  borderRadius: '3.5rem',
  [theme.breakpoints.down(1614)]: {
    width: '600px',
    border: '6px solid #91181D',
    borderRadius: '3rem'
  },
  [theme.breakpoints.down(1270)]: {
    width: '500px',
    border: '5px solid #91181D',
    borderRadius: '2rem'
  },
  [theme.breakpoints.down(950)]: {
    width: '400px',
    border: '4px solid #91181D',
    borderRadius: '1rem'
  },
  [theme.breakpoints.down(650)]: {
    width: '300px',
    border: '3px solid #91181D',
    borderRadius: '0.6rem'
  }
}));

const HeadLetterStyle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 400,
  textAlign: 'center',
  fontSize: '23px',
  lineHeight: '50px',
  color: '#FFFFFF',
  [theme.breakpoints.down(1614)]: {
    fontSize: '20px',
    lineHeight: '45px'
  },
  [theme.breakpoints.down(1270)]: {
    fontSize: '17px',
    lineHeight: '40px'
  },
  [theme.breakpoints.down(950)]: {
    fontSize: '14px',
    lineHeight: '35px'
  },
  [theme.breakpoints.down(650)]: {
    fontSize: '11px',
    lineHeight: '30px'
  }
}));

const CloseMarkStyle = styled('img')(({ theme }) => ({
  width: '26px',
  height: '26px',
  [theme.breakpoints.down(1614)]: {
    width: '19px',
    height: '19px'
  },
  [theme.breakpoints.down(1270)]: {
    width: '16px',
    height: '16px'
  },
  [theme.breakpoints.down(950)]: {
    width: '12px',
    height: '12px'
  },
  [theme.breakpoints.down(650)]: {
    width: '10px',
    height: '10px'
  },
  '&:hover': {
    cursor: 'pointer'
  }
}));

const HeadWrapStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 2rem',
  borderBottom: '2px solid #FFFFFF',
  [theme.breakpoints.down(1614)]: {
    padding: '0.9rem 2rem'
  },
  [theme.breakpoints.down(1270)]: {
    padding: '0.8rem 2rem'
  },
  [theme.breakpoints.down(950)]: {
    padding: '0.7rem 2rem'
  },
  [theme.breakpoints.down(950)]: {
    padding: '0.6rem 2rem'
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

const GuideLetterStyle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 500,
  textAlign: 'center',
  fontSize: '25px',
  lineHeight: '55px',
  color: '#91181D',
  [theme.breakpoints.down(1614)]: {
    fontSize: '17px',
    lineHeight: '45px'
  },
  [theme.breakpoints.down(1270)]: {
    fontSize: '14px',
    lineHeight: '40px'
  },
  [theme.breakpoints.down(950)]: {
    fontSize: '12px',
    lineHeight: '35px'
  },
  [theme.breakpoints.down(950)]: {
    fontSize: '10px',
    lineHeight: '30px'
  }
}));

const BtnGroupStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '2rem 3rem',
  [theme.breakpoints.down(1614)]: { padding: '1.8rem 2.5rem' },
  [theme.breakpoints.down(1270)]: { padding: '1.5rem 2.5rem' },
  [theme.breakpoints.down(650)]: { padding: '1rem 1.5rem' }
}));

const DialogPan = styled(Box)(({ theme }) => ({
  height: '550px',
  paddingTop: '50px',
  [theme.breakpoints.down(1614)]: { height: '460px', paddingTop: '37px' },
  [theme.breakpoints.down(1270)]: { height: '400px', paddingTop: '35px' },
  [theme.breakpoints.down(950)]: { height: '320px', paddingTop: '30px' },
  [theme.breakpoints.down(650)]: { height: '260px', paddingTop: '28px' }
}));

const SignBtnStyle = styled('div')(({ theme }) => ({
  width: '252px',
  height: '67px',
  background: '#16A86C',
  borderRadius: '67px',
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 400,
  textAlign: 'center',
  fontSize: '23px',
  lineHeight: '67px',
  color: 'white',
  [theme.breakpoints.down(1614)]: {
    width: '232px',
    height: '60px',
    fontSize: '20px',
    lineHeight: '60px'
  },
  [theme.breakpoints.down(1270)]: {
    width: '202px',
    height: '50px',
    fontSize: '18px',
    lineHeight: '50px'
  },
  [theme.breakpoints.down(950)]: {
    width: '182px',
    height: '43px',
    fontSize: '15px',
    lineHeight: '43px'
  },
  [theme.breakpoints.down(650)]: {
    width: '142px',
    height: '37px',
    fontSize: '12px',
    lineHeight: '37px'
  },
  '&:hover': {
    cursor: 'pointer',
    background: '#47c993'
  }
}));

const CancelBtnStyle = styled('div')(({ theme }) => ({
  width: '132px',
  height: '67px',
  background: '#D4421D',
  borderRadius: '67px',
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 400,
  textAlign: 'center',
  fontSize: '23px',
  lineHeight: '67px',
  color: 'white',
  [theme.breakpoints.down(1614)]: {
    width: '122px',
    height: '60px',
    fontSize: '20px',
    lineHeight: '60px'
  },
  [theme.breakpoints.down(1270)]: {
    width: '102px',
    height: '50px',
    fontSize: '18px',
    lineHeight: '50px'
  },
  [theme.breakpoints.down(950)]: {
    width: '92px',
    height: '43px',
    fontSize: '15px',
    lineHeight: '43px'
  },
  [theme.breakpoints.down(650)]: {
    width: '72px',
    height: '37px',
    fontSize: '12px',
    lineHeight: '37px'
  },
  '&:hover': {
    cursor: 'pointer',
    background: '#f9876a'
  }
}));

SignDialog.propTypes = {
  open: PropTypes.any,
  handleClose: PropTypes.func,
  handleSign: PropTypes.func
};

export default function SignDialog({ open, handleClose, handleSign }) {
  return (
    <RootStyle>
      <Modal open={open}>
        <PanelStyle>
          <HeadWrapStyle>
            <HeadLetterStyle>Welcome to LETS GO FLiP</HeadLetterStyle>
            <CloseMarkStyle
              src="/static/home/close.png"
              onClick={handleClose}
            />
          </HeadWrapStyle>
          <DialogPan>
            <GoFlipStyle src="/static/home/go-flip.png" />
            <GuideLetterStyle>
              By connecting to your wallet here,
            </GuideLetterStyle>
            <GuideLetterStyle>
              you agree to our Terms and Conditions and Code of Conduct.
            </GuideLetterStyle>
            <BtnGroupStyle>
              <CancelBtnStyle onClick={handleClose}>Cancel</CancelBtnStyle>
              <SignBtnStyle onClick={handleSign}>AGREE AND SIGN</SignBtnStyle>
            </BtnGroupStyle>
          </DialogPan>
        </PanelStyle>
      </Modal>
    </RootStyle>
  );
}
