import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomeButton = styled.button`
    width: 50%;
    height: 56px;
    background: #CBCBCB;
    position: fixed;
    left: 0;
    bottom: 0;
    border: none;
`;

const GameButton = styled.button`
    width: 50%;
    height: 56px;
    background: #CBCBCB;
    position: fixed;
    right: 0;
    bottom: 0;
    border: none;
`;


export default class BottomNav extends Component {
    render() {
        return (
            <div>
                <HomeButton>
                    <Link to="/home">
                        <img src='/icon/home-icon.svg' alt='home-icon' style={{ width: '22px', height: 'auto' }} /></Link>
                </HomeButton>
                <GameButton>
                    <Link to="/newgame"><img src='/icon/game-icon.svg' alt='game-icon' style={{ width: '16px', height: 'auto' }} /></Link>
                </GameButton>
            </div>
        )
    }
}
