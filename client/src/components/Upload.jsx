import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  width: 50%;
  height: 80%;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`

const Close = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  z-index: 1000000;
`

const Title = styled.h1`
  text-align: center;
`

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  padding: 5px;
  border-radius: 3px;
  background-color: transparent;
  z-index: 1000000;
`

const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  padding: 5px;
  border-radius: 3px;
  background-color: transparent;
  resize: none;
  z-index: 1000000;
`

const Button = styled.button`
  padding: 5px 15px;
  background-color: ${({ theme }) => theme.soft};
  border: none;
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  z-index: 1000000;
`

const Label = styled.label`
  font-weight: 500;
  font-size: 18px;
`

const Upload = ({ setOpen }) => {

  const [img, setImg] = useState(undefined)
  const [video, setVideo] = useState(undefined)
  const [inputs, setInputs] = useState({})
  const [tags, setTags] = useState('')
  const [imgPercent, setImgPercent] = useState(0)
  const [videoPercent, setVideoPercent] = useState(0)

  const uploadFiles = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === 'imgUrl' ? setImgPercent(Math.round(progress)) : setVideoPercent(Math.round(progress));
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
          default:
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs(prev=>{return {...prev , [urlType]: downloadURL}})
        });
      }
    );
  }

  const handleChange = (e) => {
    setInputs(prev=>{return {...prev , [e.target.name]: e.target.value}})
  }

  const handleTags = (e) => {
    setTags(e.target.value.split(','))
  }

  const navigate = useNavigate()

  const handleUpload = async (e) => {
    e.preventDefault();
    
    const res = await axios.post('/videos', {...inputs, tags})
    setOpen(false)
    console.log(res.data)
    res.status === 200 && navigate(`/video/${res.data._id}`)
  }

  useEffect(() => {
    video && uploadFiles(video, "videoUrl")
  }, [video])

  useEffect(() => {
    img && uploadFiles(img, "imgUrl")
  }, [img])

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Upload a new Video</Title>
        <Label>Video</Label>
        {videoPercent>0? ("Uploading: " + videoPercent + "%"):(<Input type="file" accept='video/*' onChange={(e) => setVideo(e.target.files[0])} />)}
        <Input type='text' placeholder='Title' name='title' onChange={handleChange} />
        <Desc placeholder='Description' rows={8} name='description' onChange={handleChange} />
        <Input type='text' placeholder='Seperate tags with commas' onChange={handleTags} />
        <Label>Thumbnail</Label>
        {imgPercent>0? ("Uploading: " + imgPercent + "%") : (<Input type='file' accept='image/*' onChange={(e) => setImg(e.target.files[0])} />)}
        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  )
}

export default Upload;