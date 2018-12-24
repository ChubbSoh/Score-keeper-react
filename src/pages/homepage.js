import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SideNav from '../components/sidebar.js';
import Navbar from '../components/navbar.js';
import Backdrop from '../components/backdrop.js';
import BottomNav from '../components/bottom-nav';

const GameContainer = styled.div`
    background: #070B2E;
    padding: 80px 40px 0 40px;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    overflow-y: scroll;
`;

const ImgContainer = styled.div`
    overflow: hidden;
    width: 150px;
    height: 150px;  
`;

const GameCard = styled.div`
    width: 150px;
    height: 150px;
    background: #373D65;
    border-radius: 5px;
    margin-bottom: 25px;
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


export default class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideNavOpen: false
        }
    }

    toggleHandler = () => {
        this.setState((prevState) => {
            return { sideNavOpen: !prevState.sideNavOpen };
        })
    };

    backdropClickHandler = () => {
        this.setState({
            sideNavOpen: false,
        })
    }


    render() {
        let sideNav;
        let backdrop;
        if (this.state.sideNavOpen) {
            sideNav = <SideNav />
            backdrop = <Backdrop click={this.backdropClickHandler} />
        }

        return (
            <div>
                <Navbar clickHandler={this.toggleHandler} />
                {sideNav}
                {backdrop}
                <GameContainer>
                    <GameCard />
                </GameContainer>
                <AddNewGame />
                <Link to='/game/new'>
                    <BottomNav />
                </Link>
            </div>
        )
    }
}