import React, { Component } from 'react';
import styled from 'styled-components';
import Navbar from '../components/navbar.js';
import BottomNav from '../components/bottom-nav';

const CameraButton = styled.label`
    width: 250px;
    height: 250px;
    border-radius: 125px;
    background: #373D65;
    color: #FFF;
    padding: 10px;
    align-items: center;
    display: flex;
    justify-content: center;
`;

const Input = styled.input`
    display: none;
`;

const Header = styled.div`
    color: #FFF;
    font-size: 20px;
`;

const OuterContainer = styled.div`
    padding: 70px 40px 0 40px;
    background: #070B2E;
    height: 100vh;    
`;

const InnerContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
       
`;

const AddManually = styled.button`
    width: 100%;
    background: #373D65;
    padding: 10px;
    border-radius: 5px;
    border: none;
    color: #97989F;
    display: flex-end;
    margin-top: 50px;
`;

export default class Camera extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <OuterContainer>
                    <Header>Add players</Header>
                    <br />
                    <InnerContainer>
                        <CameraButton>Take a wefie!
                                <Input type="file" accept="image/*" capture="user" />
                        </CameraButton>
                    </InnerContainer>
                    <br />

                    <AddManually type='button'>or key in players</AddManually>
                </OuterContainer>

                <BottomNav />
            </div>
        )
    }
};