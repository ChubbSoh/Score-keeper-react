import React, { Component } from 'react';
import styled from 'styled-components';

const BottomBar = styled.div`
    width: 100%;
    height: 56px;
    background: #CBCBCB;
    position: fixed;
    bottom: 0;
`;

export default class BottomNav extends Component {
    render() {
        return (
            <BottomBar>
            </BottomBar>
        )
    }
}
