import React, { Component } from 'react';
import styled from 'styled-components';

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
                <HomeButton></HomeButton>
                <GameButton></GameButton>
            </div>
        )
    }
}
