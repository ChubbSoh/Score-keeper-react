import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import styled from 'styled-components';


const GameForm = styled.div`
    padding: 70px 20px 0 20px;
    background: #373D65;
    color: white;
    height: 100vh;
`;

const GameHeader = styled.div`
    font-size: 26px;
`;


export default class NewGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameName: '',
            scorePerPoint: '',
            scoreError: '',
            timerChecked: false,
        }
    }

    handleCheck = () => {
        this.setState({
            timerChecked: !this.state.timerChecked,
        })
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    validateForm = () => {
        const integer = parseInt(this.state.scorePerPoint);
        if (typeof (integer) === 'number') {
            this.setState({
                scorePerPoint: this.state.scorePerPoint,
            })
        } else {
            this.setState({
                scoreError: 'Please input a number',
            })
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        this.validateForm();
        this.props.history.push('/user/camera');
    }

    render() {
        const timerDiv = this.state.timerChecked
            ? <div>
                <InputGroup className="timerInput">
                    <Input placeholder="0" />
                    <InputGroupAddon addonType="append">min per round</InputGroupAddon>
                </InputGroup>
                <InputGroup className="timerInput">
                    <Input placeholder="0" />
                    <InputGroupAddon addonType="append">min per game</InputGroupAddon>
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
                        <FormGroup>
                            <input type="checkbox" onChange={this.handleCheck} checked={this.state.timerChecked} />timer
                        </FormGroup>
                        {timerDiv}
                        <FormGroup>
                            <Input
                                type="submit"
                                name="saveGame"
                                value="save game"
                                disabled={!enabled}
                            />
                        </FormGroup>
                    </Form>
                </div>
            </GameForm >
        )
    }
};