import React from 'react';
import styled from 'styled-components';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const Container = styled.div`
  position: sticky;
  top: 0;
  background: ${({theme})=>theme.foreground};
  height: 50px;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0 20px;
  position: relative;
`

const Search = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 40%;
  padding: 5px;
  background: ${({theme})=>theme.foreground};
  border: 2px solid ${({theme})=>theme.background};
  border-radius: 50px;
`

const Input = styled.input`
  border: none;
  background: transparent;
  outline: none;
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

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder="Search" />
          <SearchOutlinedIcon />
        </Search>
        <But>
          <AccountCircleOutlinedIcon /> Sign In
        </But>
      </Wrapper>
    </Container>
  )
}

export default Navbar