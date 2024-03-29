import React, { useEffect } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "../components/Comments";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import axios from "axios";
import { format } from "timeago.js";
import { subscribe } from "../redux/userSlice";
import Recommandation from "../components/Recommandation";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div``;

const VideoFrame = styled.video`
  width: 100%;
  max-height: 520px;
  object-fit: cover;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const Subscribed = styled.button`
  background-color: transparent;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const Video = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentVideo = useSelector((state) => state.video.currentVideo);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];
  const [channel, setChannel] = React.useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/videos/find/${path}`);
        const channelRes = await axios.get(`/user/find/${videoRes.data.userId}`);
        dispatch(fetchSuccess(videoRes.data));
        setChannel(channelRes.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    try {
      await axios.put(`/user/like/${currentVideo._id}`)
      dispatch(like(currentUser._id))
    } catch (err) {
      console.log(err);
    }
  }

  const handleDisLike = async () => {
    try {
      await axios.put(`/user/dislike/${currentVideo._id}`)
      dispatch(dislike(currentUser._id))
    } catch (err) {
      console.log(err);
    }
  }

  const handlesub = async () => {
    try {
      currentUser.subcribedUsers.includes(channel._id) ? await axios.put(`/user/unsub/${channel._id}`) : await axios.put(`/user/sub/${channel._id}`);
      dispatch(subscribe(channel._id))
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo.videoUrl} controls></VideoFrame>
        </VideoWrapper>
        <Title>{currentVideo.title}</Title>
        <Details>
          <Info>{currentVideo.Views} views • {format(currentVideo.createdAt)}</Info>
          <Buttons>
            <Button onClick={handleLike}>
              {(currentVideo.likes?.includes(currentUser._id)) ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}{" "}{currentVideo.likes?.length}
            </Button>
            <Button onClick={handleDisLike}>
              {(currentVideo.dislikes?.includes(currentUser._id)) ? <ThumbDownIcon /> : <ThumbDownOffAltOutlinedIcon />} Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.img} />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.Subscribers} subscribers</ChannelCounter>
              <Description>
                {currentVideo.Description}
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          {(currentUser.subcribedUsers?.includes(channel._id)) ? <Subscribed onClick={handlesub}>Subscribed</Subscribed> : <Subscribe onClick={handlesub}>SUBSCRIBE</Subscribe>}
        </Channel>
        <Hr />
        <Comments videoId={currentVideo._id}/>
      </Content>
      <Recommandation tags={currentVideo.tags}/>
    </Container>
  );
};

export default Video;
