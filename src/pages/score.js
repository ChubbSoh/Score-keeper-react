import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';
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
`;

const PlayerLabel = styled.label`
    font-size: 18px;
    margin: 5px 100px 0 0;
`;

const ScoreDiv = styled.div`
    margin: 0 20px 0 20px;
`;

const checkPlayer = Component => props => {
    if (props.location.state) {
        return <Component {...props} />
    } else {
        return <Redirect to={'/players'} />
    }
}

class Score extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player: this.props.location.player ? this.props.location.player.map((name) => ({ name: name, score: 0 })) : []
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
        if (!this.props.location.state) {
            return <Redirect to='/players' />
        }

        return (
            <div>
                <OuterContainer>
                    <Header>Players list</Header>
                    {
                        this.state.player.map((player, index) =>
                            <PlayerCard key={index}>
                                <PlayerLabel>{player.name}</PlayerLabel>
                                <Button id={index} onClick={this.minusScore}>-</Button>
                                <ScoreDiv>{player.score}</ScoreDiv>
                                <Button id={index} onClick={this.addScore}>+</Button>
                            </PlayerCard>
                        )
                    }
                </OuterContainer>
            </div>
        )
    }
}

export default checkPlayer(Score);