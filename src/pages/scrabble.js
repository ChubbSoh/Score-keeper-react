import React, { Component } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const OuterContainer = styled.div`
    padding: 70px 0 0 0;
    background: #070B2E;
    height: 100vh;    
`;

const ImgContainer = styled.div`
    overflow: hidden;
    height: 45%;
    width: 100%;
    display: flex;
    justify-content: center;
`;

const GameImg = styled.img`       
    height:100%;
    width: auto;    
`;

const StartGameBtn = styled.button`
    padding: 10px;
    width: 87vw;
    background: #0CB18F;
    border: none;
    color: #FFF;
    border-radius: 5px;    
    margin: 10px 25px 0 25px;
`;

const GameInfo = styled.div`
    margin: 40px 25px 0 25px;
    color: white;
`;

export default class Scrabble extends Component {
    render() {
        return (
            <OuterContainer>
                <ImgContainer>
                    <GameImg src='img/scrabble.jpg' />
                </ImgContainer>
                <GameInfo>
                    <h3>Scrabble</h3>
                    <p>1 point per score</p>
                </GameInfo>
                <Link to={'/camera'}>
                    <StartGameBtn>Start game</StartGameBtn>
                </Link>
            </OuterContainer>
        )
    }
}
