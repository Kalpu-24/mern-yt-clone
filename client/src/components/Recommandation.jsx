import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from './Card';

const Container = styled.div`
    flex: 2;
`

const H1 = styled.h1`
    color: ${({ theme }) => theme.text};
`


const Recommandation = ({ tags }) => {

    const [videos, setVideos] = useState([]);
    useEffect(() => {
        const getVideos = async () => {
            const res = await axios.get(`/videos/tags?tags=${tags}`);
            setVideos(res.data);
            console.log(res.data)
        }
        getVideos();
    }, [tags])
    return (
        <Container>
            <H1>Recommanded Videos</H1>
            {videos.map((video) => (
                <Card type="sm" key={video._id} video={video}/>
            ))}
        </Container>
    )
}

export default Recommandation;