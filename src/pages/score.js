import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

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
    justify-content: space-between;
`;

const PlayerLabel = styled.label`
    font-size: 18px;
`;

const ScoreDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 20%;
`;

const ScoreButton = styled.button`
    background: transparent;
    color: white;
    border: none;
`;

const checkPlayer = Component => props => {
    if (props.location.player) {
        return <Component {...props} />
    } else {
        return <Redirect to={'/players'} />
    }
}

class Score extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player: this.props.location.player.map((name) => ({ name: name, score: 0 }))
        }
    }

    addScore = event => {
        const newPlayers = [...this.state.player]
        newPlayers[event.target.id]['score'] += 1
        this.setState(() => ({
            player: newPlayers
        }))
    }

    minusScore = event => {
        const newPlayers = [...this.state.player]
        newPlayers[event.target.id]['score'] -= 1
        this.setState(() => ({
            player: newPlayers
        }))
    }

    render() {
        return (
            <div>
                <OuterContainer>
                    <Header>Players list</Header>
                    {
                        this.state.player.map((player, index) =>
                            <PlayerCard key={index}>
                                <PlayerLabel>{player.name}</PlayerLabel>
                                <ScoreDiv>
                                    <ScoreButton id={index} onClick={this.minusScore}>-</ScoreButton>
                                    {player.score}
                                    <ScoreButton id={index} onClick={this.addScore}>+</ScoreButton>
                                </ScoreDiv>
                            </PlayerCard>
                        )
                    }
                </OuterContainer>
            </div>
        )
    }
}

export default checkPlayer(Score);