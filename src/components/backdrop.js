import React, { Component } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
    background: rgba(0, 0, 0, 0.3);
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
`;

const Backdrop = props => (
    <Overlay onClick={props.click}>
    </Overlay>
)

export default Backdrop;