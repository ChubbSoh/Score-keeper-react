import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const GameContainer = styled.div`
    background: #070B2E;
    padding: 70px 25px 0 25px;
    height: 100vh;
    width: 100%;    
    overflow-y: scroll;
`;

const ImgContainer = styled.div`
    overflow: hidden;
    width: 150px;
    height: 150px;
    background: rgba(7,11,46, 0.5);
    border-radius: 5px; 
    margin: 0 15px 20px 15px;
    display: inline-block;
    position: relative;
    flex: 1;
`;

const GameImg = styled.img`
    position: absolute;
    left: 50%;
    top: 50%;
    height:100%;
    width: auto;
    -webkit-transform: translate(-50%,-50%);
      -ms-transform: translate(-50%,-50%);
          transform: translate(-50%,-50%);
`;

const GameName = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 150px;
    height: 150px;
    background: rgba(7,11,46, 0.5);
    border-radius: 5px;
    color: white;
`

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
    state = {
        clicked: false,
    }

    handleClick = () => {
        this.props.history.push('/scrabble')
    }
    render() {
        return (
            <div>
                <GameContainer>
                    <ImgContainer>
                        <GameImg src='img/pingpong.jpg' alt='ping-pong' />
                        <GameName>Ping Pong</GameName>
                    </ImgContainer>
                    <ImgContainer>
                        <GameImg src='img/basketball.jpg' alt='basketball' />
                        <GameName>Basketball</GameName>
                    </ImgContainer>
                    <ImgContainer onClick={this.handleClick}>
                        <GameImg src='img/scrabble.jpg' alt='scrabble' />
                        <GameName>Scrabble</GameName>
                    </ImgContainer>
                </GameContainer>
                <Link to={{ pathname: '/newgame' }}>
                    <AddNewGame><img src='/icon/add-icon.png' alt='add-icon' /></AddNewGame>
                </Link>
            </div>
        )
    }
}

export default Homepage;