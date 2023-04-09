import React from 'react';
import styled from 'styled-components';
import logo from '../images/logo.jpg';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import MusicVideoOutlinedIcon from '@mui/icons-material/MusicVideoOutlined';
import SportsSoccerOutlinedIcon from '@mui/icons-material/SportsSoccerOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import FlagCircleOutlinedIcon from '@mui/icons-material/FlagCircleOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const Container = styled.div`
  position: sticky;
  top: 0;
  flex: 1;
  background-color: ${({theme})=> theme.foreground};
  color: ${({theme})=> theme.text};
  height: 100vh;
  overflow: hidden;
`
const Wrapper = styled.div`
  padding: 18px 26px;
`
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 20px;
`
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0;
`

const Img = styled.img`
  height: 24px;
  width: 24px;
`

const Hr = styled.hr`
  margin: 10px 0;
  border: 1px solid ${({theme})=> theme.soft};
`

const Login = styled.div`
  color: ${({theme})=> theme.text};
  gap: 1px;
`

const But = styled.button`
  margin-top: 10px;
  display: flex;
  color: #4268ff;
  align-items: center;
  background: transparent;
  border: 1px solid #4268ff;
  font-weight: bold;
  border-radius: 3px
  gap: 5px;
`

const Menu = ({darkMode,setDarkMode}) => {
  return (
    <Container>
      <Wrapper>
        <Logo>
          <Img src={logo} />
          YT-CLONE
        </Logo>
        <Item>
          <HomeOutlinedIcon />
          Home
        </Item>
        <Item>
          <ExploreOutlinedIcon />
          Explore
        </Item>
        <Item>
          <SubscriptionsOutlinedIcon />
          Subscription
        </Item>
        <Hr />
        <Item>
          <VideoLibraryOutlinedIcon />
          Library
        </Item>
        <Item>
          <HistoryOutlinedIcon />
          History
        </Item>
        <Hr />
        <Login>
          Login Or Sign Up to Like, Comment And Subscribe.
          <But>
            <AccountCircleOutlinedIcon/> Sign In
          </But>
        </Login>
        <Hr/>
        <Item>
          <MusicVideoOutlinedIcon />
          Music
        </Item>
        <Item>
          <SportsSoccerOutlinedIcon />
          Sports
        </Item>
        <Item>
          <SportsEsportsOutlinedIcon />
          Gaming
        </Item>
        <Item>
          <MovieCreationOutlinedIcon />
          Movie
        </Item>
        <Item>
          <NewspaperOutlinedIcon />
          News
        </Item>
        <Item>
          <LiveTvOutlinedIcon />
          Live
        </Item>
        <Hr />
        <Item>
          <SettingsOutlinedIcon />
          Settings
        </Item>
        <Item>
          <FlagCircleOutlinedIcon />
          Report
        </Item>
        <Item>
          <HelpOutlineOutlinedIcon />
          Help
        </Item>
        <Item onClick={()=> setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          Light Mode
        </Item>
      </Wrapper>
    </Container>
  )
}

export default Menu;