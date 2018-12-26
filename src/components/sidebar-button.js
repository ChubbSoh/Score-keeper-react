import React from 'react';
import styled from 'styled-components';

const ToggleButton = styled.button`
    display: flex;
    flex-direction: column;
    background: transparent;
    border: none;
    width: 30px;
    height: 26px;
    padding: 5px;
    justify-content: space-between;
`;

const SandwichLine = styled.div`
    width: 20px;
    height: 2px;
    background: white;
`;

const SideToggleButton = props => (
    <ToggleButton onClick={props.click}>
        <SandwichLine></SandwichLine>
        <SandwichLine></SandwichLine>
        <SandwichLine></SandwichLine>
    </ToggleButton>
)

export default SideToggleButton;
