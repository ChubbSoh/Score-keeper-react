import React, { Component } from 'react'
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';


const OuterContainer = styled.div`
    padding: 70px 20px 70px 20px;
    background: #070B2E;
    height: 100vh;
    overflow: scroll;
    color: white;  
`;

const GameHeader = styled.div`
    font-size: 22px;
    margin-bottom: 10px;
    background: #373D65;
    padding: 20px;
    margin: 10px 5px 10px 5px;
    border-radius: 5px;
`;

const GameDiv = styled.div`
    font-size: 16px;
    background: #373D65;
    padding: 20px;
    margin: 20px 5px 10px 5px;
    border-radius: 5px;
`;

const StartGameBtn = styled.button`
    padding: 10px;
    width: 87vw;
    background: #0CB18F;
    border: none;
    color: #FFF;
    border-radius: 5px;
    margin-top: 10px;   
`;

const DeleteBtn = styled.button`
    padding: 10px;
    width: 87vw;
    background: #ABABAB;
    border: none;
    color: #FFF;
    border-radius: 5px;
    margin-top: 10px;   
`;

const checkGame = Component => props => {
    if (props.location.game) {
        return <Component {...props} />
    } else {
        return <Redirect to={'/home'} />
    }
}

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            game: this.props.location.game
        };
    }

    getToken() {
        return localStorage.getItem('jwt')
    }

    deleteGame = event => {
        const { game } = this.state
        const id = game.id
        event.preventDefault()
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getToken()}`
            }
        };
        axios.post(`https://sc0re.herokuapp.com/api/v1/game/${id}`, config)
            .then(result => {
                console.log(result)
                this.props.history.push("/home")
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        let { game } = this.props.location;
        const timerDiv = game.timerChecked
            ? <div>
                Time Per Round: {game.timerMinPerRound}
                <br />
                Time Per Game: {game.timerMinPerGame}
            </div>
            : null;

        return (
            <OuterContainer>
                <GameHeader>{game.gameName}</GameHeader>
                <GameDiv>
                    Score Per Point: {game.scorePerPoint}
                    {timerDiv}
                </GameDiv>
                <Link to={'/camera'}>
                    <StartGameBtn>Start game</StartGameBtn>
                </Link>
                <DeleteBtn onClick={this.deleteGame}>Delete game</DeleteBtn>
            </OuterContainer>
        )
    }
}

export default checkGame(Game)
