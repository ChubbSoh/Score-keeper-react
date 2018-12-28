import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, FormGroup, Input, Button, InputGroup, InputGroupAddon } from 'reactstrap';

const Header = styled.div`
    color: #FFF;
    font-size: 20px;
`;

const OuterContainer = styled.div`
    padding: 70px 20px 70px 20px;
    background: #070B2E;
    height: 100vh;
    overflow: scroll;
    position: fixed;
`;

const AddPlayerButton = styled.button`
    width: 100%;
    padding: 10px;
    background: #373D65;
    border: none;
    color: #FFF;
    border-radius: 5px;
`;

const StartGameBtn = styled.button`
    padding: 10px;
    width: 89vw;
    background: #0CB18F;
    border: none;
    color: #FFF;
    border-radius: 5px;    
    margin-top: 10px;
`;

export default class AddPlayer extends Component {
    state = {
        player: ['', '',],
        addPlayerClicked: false,
    }

    addPlayer = event => {
        event.preventDefault();
        this.setState((prevState) => ({
            player: [...prevState.player, ''],
            addPlayerClicked: true,
        }));
    }

    removePlayer = index => {
        const copyPlayer = this.state.player;
        copyPlayer.splice(index, 1);
        this.setState({
            player: copyPlayer,
        })
    }

    handleChange = event => {
        const currentPlayer = this.state.player
        currentPlayer[event.target.id] = event.target.value
        this.setState({
            player: currentPlayer,
        });
    }

    // validateForm = () => {
    //     const getName = Object.values(this.state.name)
    //     if (getName.length() > 0) {
    //         return true
    //     } else {
    //         return false
    //     }
    // }

    handleSubmit = event => {
        event.preventDefault();
        // this.validateForm();
    }

    startGame = () => {
        this.props.history.push({
            pathname: '/startgame',
            player: this.state.player
        })
    }

    render() {
        let { player } = this.state;
        const [, , ...newPlayer] = player;
        const newPlayerDiv = this.state.addPlayerClicked
            ? newPlayer.map((name, index) => {
                return (
                    <FormGroup key={index}>
                        <InputGroup>
                            <Input
                                type='text'
                                name={name}
                                id={index + 2}
                                placeholder='name'
                                onChange={this.handleChange}
                                value={player[index + 2]}
                            />
                            <InputGroupAddon addonType='prepend'>
                                <Button onClick={this.removePlayer.bind(this, index)} >remove</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                )
            })
            : null;

        return (
            <div>
                <OuterContainer>
                    <Header>Add players</Header>
                    <br />
                    <Form id='playerForm' onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Input
                                type='text'
                                name='playerName'
                                id={0}
                                placeholder='name'
                                onChange={this.handleChange}
                                value={player[0]}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type='text'
                                name='playerName'
                                id={1}
                                placeholder='name'
                                onChange={this.handleChange}
                                value={player[1]}
                            />
                        </FormGroup>
                        {newPlayerDiv}
                        <AddPlayerButton onClick={this.addPlayer}>Add more players</AddPlayerButton>
                    </Form>
                    <StartGameBtn attribute='playerForm' type="submit" onClick={this.startGame}>Start game</StartGameBtn>
                </OuterContainer>
            </div>
        )
    }
}