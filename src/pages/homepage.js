import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const GameContainer = styled.div`
    background: #070B2E;
    padding: 70px 10px 0 10px;
    height: 100vh;
    width: 100%;    
    overflow-y: scroll;
`;

const ImgContainer = styled.div`
    overflow: hidden;
    width: 150px;
    height: 150px;
    background: #373D65;
    border-radius: 5px; 
    margin: 0 10px 20px 10px;
    display: inline-block;
`;

const AddNewGame = styled.button`
    position: fixed;
    width: 60px;
    height: 60px;
    margin: 0 30px 80px 0;    
    bottom: 0;
    right: 0;
    border-radius: 30px;
    background: #0CB18F;
    border: none; 
`;


class Homepage extends Component {
    render() {
        return (
            <div>
                <GameContainer>
                    <ImgContainer />
                    <ImgContainer />
                    <ImgContainer />
                    <ImgContainer />
                </GameContainer>
                <Link to={{ pathname: '/newgame' }}>
                    <AddNewGame><img src='/icon/add-icon.png' alt='add-icon' /></AddNewGame>
                </Link>
            </div>
        )
    }
}

export default Homepage;