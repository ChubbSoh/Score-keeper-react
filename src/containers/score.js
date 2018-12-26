import React, { Component } from 'react';
import styled from 'styled-components';
import { Label, Button, Form, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import Navbar from '../components/navbar.js';
import BottomNav from '../components/bottom-nav';

const OuterContainer = styled.div`
    padding: 70px 20px 0 20px;
    background: #070B2E;
    height: 100vh;    
`;

const Header = styled.div`
    color: #FFF;
    font-size: 20px;
`;

const PlayerCard = styled.div`
    background-color: #373D65;
    width: 100%;
    color: white;
    padding: 16px;
    border-radius: 5px;
    margin: 10px 0 0 0;
    display: flex;
`;

const PlayerLabel = styled.label`
    font-size: 18px;
    margin-right: 100px;
`;

export default class Score extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    addScore = () => {
        this.setState((prevState) => ({
            score: prevState.score + 1
        })
        )
    }

    minusScore = () => {
        this.setState((prevState) => ({
            score: prevState.score - 1
        })
        )
    }

    handleSubmit = event => {
        event.preventDefault()
    }

    render() {
        return (
            <div>
                <Navbar />
                <OuterContainer>
                    <Header>Players list</Header>
                    <PlayerCard>
                        <Form onSubmit={this.handleSubmit}>
                            <PlayerLabel>Player 1</PlayerLabel>
                            <InputGroup style={{ width: '150px', float: 'right' }}>
                                <InputGroupAddon addonType='prepend'><Button onClick={this.addScore}>+</Button></InputGroupAddon>
                                <Input
                                    placeholder={this.state.score}
                                />
                                <InputGroupAddon addonType='prepend'><Button onClick={this.minusScore}>-</Button></InputGroupAddon>
                            </InputGroup>
                        </Form>
                    </PlayerCard>
                    <BottomNav />
                </OuterContainer>
            </div>
        )
    }
}