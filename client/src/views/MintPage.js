// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import { LandingHead, LandingFooter } from '../components/landing-page';

import { LandingMint } from '../components/mint-page';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%',
  backgroundColor: '#212529'
});

const ContentStyle = styled('div')(() => ({
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
  backgroundColor: '#010318'
}));

const TopBackground = styled('img')(() => ({
  overflow: 'hidden',
  position: 'absolute',
  top: 0,
  width: '100%'
}));

const BottomBackground = styled('img')(() => ({
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  width: '100%'
}));

// ----------------------------------------------------------------------

export default function MintPage() {
  return (
    <RootStyle title="Flip Coin" id="move_top">
      <ContentStyle>
        <TopBackground src="/static/home/top-back.png" />
        <BottomBackground src="/static/home/bottom-back.png" />
        <LandingHead pageURL="mintnowURL" />
        <LandingMint />
        <LandingFooter />
      </ContentStyle>
    </RootStyle>
  );
}
