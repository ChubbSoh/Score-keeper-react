import React from 'react';
import styled from 'styled-components';
import SideToggleButton from './sidebar-button.js';

const Bar = styled.header`
    position: fixed;
    top: 0;
    left: 0;    
    width: 100%;
    height: 56px;
    background: #070B2E;
    z-index: 1;
    
`;

const Nav = styled.nav`
    display: flex;
    align-items: center;
    padding: 10px;
    height: 100%;
    
`;

const Logo = styled.h5`
    color: white;
    margin: 0 0 0 10px;
`;

const Navbar = props => (
    <Bar>
        <Nav>
            <div><SideToggleButton click={props.clickHandler} /></div>
            <Logo>SC0RE</Logo>
        </Nav>
    </Bar>
)

export default Navbar;