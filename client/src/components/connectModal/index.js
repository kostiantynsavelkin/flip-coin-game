import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Paper, IconButton, Modal, Typography, Grid } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import closeFill from '@iconify/icons-eva/close-fill';
import { useWallet } from 'use-wallet';
import { useSnackbar } from 'notistack';
import { Icon } from '@iconify/react';
import Web3 from 'web3';
import axios from 'axios';

import { MIconButton } from '../@material-extend';

import SignDialog from '../landing-page/SignDialog';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  width: '100%'
}));

const PanelStyle = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '32px',
  width: '350px',
  [theme.breakpoints.down(1200)]: {
    width: '350px'
  },
  [theme.breakpoints.down(400)]: {
    width: '250px'
  }
}));

const PanelHeaderStyle = styled('div')(() => ({
  textAlign: 'left',
  borderBottom: '1px solid #e5e2e2',
  padding: '1rem 0.6rem 0.6rem 1rem'
}));

const PanelContentStyle = styled('div')(({ theme }) => ({
  padding: '0rem',
  textAlign: 'center',
  overflowY: 'auto',
  flex: '1 1 auto',
  height: '280px',
  minHeight: '220px',
  [theme.breakpoints.down(400)]: {
    width: '247px'
  }
}));

const CloseButtonStyle = styled(IconButton)(({ theme }) => ({
  borderColor: '#050404',
  color: 'rgb(11, 133, 186)',
  '&:hover': {
    backgroundColor: '#c9c4c4'
  },
  [theme.breakpoints.down(400)]: {
    padding: '8px'
  }
}));

const ButtonGroupStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '24px',
  minHeight: '220px',
  [theme.breakpoints.down(400)]: {
    width: '247px'
  }
}));

const ButtonStyle = styled(IconButton)(() => ({
  WebkitBoxAlign: 'center',
  alignItems: 'center',
  backgroundColor: 'rgb(239, 244, 245)',
  border: '0px',
  borderRadius: '16px',
  boxShadow: 'none',
  color: 'rgb(11, 133, 186)',
  cursor: 'pointer',
  display: 'inline-flex',
  fontSize: '16px',
  fontWeight: 600,
  width: '100%',
  height: '48px',
  lineHeight: 1,
  letterSpacing: '0.03em',
  WebkitBoxPack: 'center',
  outline: '0px',
  padding: '0px 27px',
  transition: 'background-color 0.2s ease 0s',
  opacity: 1,
  marginBottom: '8px',
  justifyContent: 'space-between',
  '&:hover': {
    cursor: 'pointer'
  }
}));

const MetaMaskIconStyle = styled('img')(({ theme }) => ({
  width: '23px',
  height: '23px',
  [theme.breakpoints.down(400)]: {
    width: '17px',
    height: '17px'
  }
}));

const TrustIconStyle = styled('img')(({ theme }) => ({
  width: '23px',
  height: '23px',
  [theme.breakpoints.down(400)]: {
    width: '17px',
    height: '17px'
  }
}));

const SafePalIconStyle = styled('img')(({ theme }) => ({
  width: '23px',
  height: '23px',
  [theme.breakpoints.down(400)]: {
    width: '17px',
    height: '17px'
  }
}));

const TextStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.down(400)]: {
    fontSize: '14px'
  }
}));

ConnectModal.propTypes = {
  open: PropTypes.any,
  handleClose: PropTypes.any,
  setAccount: PropTypes.any,
  account: PropTypes.any,
  login: PropTypes.any,
  setLogin: PropTypes.func
};

export default function ConnectModal({
  open,
  handleClose,
  setAccount,
  login,
  setLogin,
  account
}) {
  const wallet = useWallet();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [signedOpen, setSignedOpen] = useState(false);

  const handleSignedOpen = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/sign/check`,
      {
        betAddress: wallet.account
      }
    );
    if (response.data.message !== 'success') {
      setSignedOpen(true);
    }
  };
  const handleSignedClose = () => {
    setSignedOpen(false);
    localStorage.removeItem('connectedWallet');
    setLogin(false);
    wallet.reset();
    setAccount(null);
  };

  const connectWallet = (connector) => {
    wallet
      .connect(connector)
      .then(() => {})
      .catch((e) => {
        console.log('e', e);
      });
  };

  useEffect(() => {
    async function run() {
      if (wallet.status === 'connected') {
        setLogin(true);
        setAccount(wallet.account);
        window.web3 = new Web3(wallet.ethereum);
        window.web3.eth.defaultAccount = wallet.account;
        localStorage.setItem('connectedWallet', wallet.account);
        setLogin(true);
        handleClose();
        handleSignedOpen();
      } else if (wallet.status === 'disconnected') {
        if (login) {
          localStorage.removeItem('connectedWallet');
          setLogin(false);
          wallet.reset();
          setAccount(null);
        } else if (
          localStorage.getItem('connectedWallet') !== '' &&
          localStorage.getItem('connectedWallet') !== null
        ) {
          wallet.connect();
        }
      } else if (wallet.status === 'error') {
        enqueueSnackbar('Please select the Polygon network.', {
          variant: 'error',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });

        wallet.reset();
        setAccount(null);
      }
    }
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.status]);

  const handleSign = async () => {
    setSignedOpen(false);
    if (
      wallet.status === 'connected' &&
      wallet.account !== '' &&
      wallet.account !== null
    ) {
      const web3 = new Web3(wallet.ethereum);
      web3.eth.defaultAccount = wallet.account;
      const sigResult = await web3.eth.personal.sign(
        "Welcome to Let's Go Flip- The Degen's Playground.\n \nPlease sign to verify that you own this wallet.\n \nBy signing you confirm that you have read and accept the terms and conditions displayed in 'Terms and Conditions' link on website.\n \nThis request will not cost you any gas fees to sign and electronic hash will be stored in our database as record of agreement.\n Play Responsibly, Let's Go Flip !",
        wallet.account
      );
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/sign/add`, {
          betAddress: wallet.account,
          signature: sigResult
        });
      } catch (e) {
        console.log('e', e);
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

  useEffect(() => {
    if (account) handleClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <RootStyle>
      <Modal
        open={open}
        onClose={() => {
          handleClose();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <PanelStyle>
          <PanelHeaderStyle>
            <Grid container spacing={2}>
              <Grid item xs sx={{ display: 'flex', alignItem: 'center' }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: {
                      md: '21px'
                    },
                    fontFamily: 'Source Sans Pro',
                    fontWeight: '800',
                    color: 'rgb(11, 133, 186)',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  Connect to a wallet
                </Typography>
              </Grid>
              <Grid item xs="auto">
                <CloseButtonStyle
                  onClick={() => {
                    handleClose();
                  }}
                >
                  <CloseIcon />
                </CloseButtonStyle>
              </Grid>
            </Grid>
          </PanelHeaderStyle>
          <PanelContentStyle>
            <ButtonGroupStyle>
              <ButtonStyle onClick={() => connectWallet('injected')}>
                <TextStyle>Metamask</TextStyle>
                <MetaMaskIconStyle src="/static/home/metamask.png" />
              </ButtonStyle>
              <ButtonStyle onClick={() => connectWallet('walletconnect')}>
                <TextStyle>Wallet Connect</TextStyle>
                <TrustIconStyle src="/static/home/walletConnectIcon.svg" />
              </ButtonStyle>
              <ButtonStyle onClick={() => wallet.connect()}>
                <TextStyle>Trust Wallet</TextStyle>
                <TrustIconStyle src="/static/home/TWT.png" />
              </ButtonStyle>
              <ButtonStyle onClick={() => wallet.connect()}>
                <TextStyle>SafePal</TextStyle>
                <SafePalIconStyle src="/static/home/sfp.png" />
              </ButtonStyle>
            </ButtonGroupStyle>
          </PanelContentStyle>
        </PanelStyle>
      </Modal>

      <SignDialog
        open={signedOpen}
        handleClose={handleSignedClose}
        handleSign={handleSign}
      />
    </RootStyle>
  );
}
