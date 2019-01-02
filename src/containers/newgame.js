import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import styled from 'styled-components';
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import './newgame.css';
import axios from 'axios';
import { Link } from 'react-router-dom';


const GameForm = styled.div`
    padding: 70px 20px 0 20px;
    background: #373D65;
    color: white;
    height: 100vh;
`;

const GameHeader = styled.div`
    font-size: 26px;
`;

const TimerLabel = styled.label`
    align-items: center;
    padding-bottom: 10px;
`;

export default class NewGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameName: '',
            scorePerPoint: '',
            scoreError: '',
            timerChecked: false,
            timerMinPerRound: null,
            timerMinPerGame: null,
        }
    }

    handleCheck = () => {
        this.setState({
            timerChecked: !this.state.timerChecked,
        })
    }

    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value
        })
    }


    handleSubmit = event => {
        event.preventDefault();
        const game = {
            gameName: this.state.gameName,
            scorePerPoint: this.state.scorePerPoint,
            timerChecked: this.state.timerChecked,
            timerMinPerRound: this.state.timerMinPerRound,
            timerMinPerGame: this.state.timerMinPerGame,
        }
        console.log(game)
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };
        axios.post('http://localhost:5000/api/v1/newgame', { game }, config)
            .then(result => console.log(result));
    }

    render() {
        const timerDiv = this.state.timerChecked
            ? <div>
                <InputGroup className="timerInput">
                    <Input name="timerMinPerRound" id="timerMinPerRound" onChange={this.handleChange} placeholder="0" />
                    <InputGroupAddon addonType="append" >min per round</InputGroupAddon>
                </InputGroup>
                <InputGroup className="timerInput">
                    <Input name="timerMinPerGame" id="timerMinPerGame" onChange={this.handleChange} placeholder="0" />
                    <InputGroupAddon addonType="append" >min per game</InputGroupAddon>
                </InputGroup>
                <br />
            </div>
            : null;

        const { gameName, scorePerPoint } = this.state;
        const enabled = gameName.trim().length > 0 && scorePerPoint.trim().length > 0;
        return (
            <GameForm>
                <div id="NewGame">
                    <div className="Row">
                        <GameHeader>New game<Button style={{ color: '#FFF' }} close />
                        </GameHeader>
                        <br />
                    </div>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Input
                                type="text"
                                name="gameName"
                                id="gameName"
                                placeholder="name of game"
                                value={this.props.gameName}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type="number"
                                name="scorePerPoint"
                                id="scorePerPoint"
                                placeholder="point per score"
                                value={this.props.gameName}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <TimerLabel>
                            <Toggle
                                id='timer'
                                icons={false}
                                className='custom-classname'
                                onChange={this.handleCheck}
                                checked={this.state.timerChecked}
                            /> <span>timer</span>
                        </TimerLabel>
                        {timerDiv}
                    </Form>
                    <Link to={{ pathname: '/camera' }}>
                        <Button
                            attribute='NewGame'
                            type="submit" style={{ width: '100%', background: '#0CB18F' }}
                            disabled={!enabled}
                        >save game</Button>
                    </Link>
                </div>
            </GameForm>
        )
    }
};