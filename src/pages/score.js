import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import formatDuration from 'format-duration';

const OuterContainer = styled.div`
    padding: 70px 20px 0 20px;
    background: #070B2E;
    height: 100vh;    
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

const PlayerLabel = styled.div`
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
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

const EndButton = styled.button`
    margin-top: 10px;
    width: 100%;
    border-radius: 5px;
    padding: 10px;
    background: #ABABAB;
    border: none;
`;

const AvatarContainer = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 15px;
    margin-right: 10px;
    overflow: hidden;
    position: relative;
`;

const PlayerAvatar = styled.img`
    position: absolute;
    left: 50%;
    top: 50%;
    height:100%;
    width: auto;
    -webkit-transform: translate(-50%,-50%);
      -ms-transform: translate(-50%,-50%);
          transform: translate(-50%,-50%);
`;

const TimerDiv = styled.div`
    color: white;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
`;

const TimerButton = styled.button`
    background: #0CB18F;
    padding: 3px 10px 3px 10px;
    border-radius: 5px;
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

const Timer = props => {
    let elapsed = props.gameTime * 60000
    let events = props.events

    for (let i = 0; i < events.length; i += 2) {
        const start = events[i]
        const stop = events[i + 1] || Date.now()
        elapsed -= stop - start
    }
    return (
        <div>
            Time Per Game: {formatDuration(elapsed)}
        </div>
    )


}


class Score extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player: this.props.location.player.map((player) => ({ name: player.name, score: 0 })),
            timePerRound: props.timePerRound,
            timePerGame: props.timePerGame,
            timingEvents: [],
            nonce: 0,
        }
        this.poll = setInterval(this.tick, 1000)
    }

    addScore = event => {
        const newPlayers = [...this.state.player]
        const sortedPlayers = newPlayers.sort((a, b) =>
            b.score - a.score
        );
        sortedPlayers[event.target.id]['score'] += 1
        this.setState(() => ({
            player: newPlayers
        }))
    }

    minusScore = event => {
        const newPlayers = [...this.state.player]
        const sortedPlayers = newPlayers.sort((a, b) =>
            b.score - a.score
        );
        sortedPlayers[event.target.id]['score'] -= 1
        this.setState(() => ({
            player: newPlayers
        }))
    }

    endGameClicked = () => {
        this.props.history.push({
            pathname: '/winner',
            player: this.state.player
        })
    }

    timerClicked = () => {
        this.setState({
            timingEvents: [...this.state.timingEvents, Date.now()]
        })
    }

    tick = () => {
        this.setState((prevState) => ({
            nonce: prevState.nonce - 1
        }))
    }

    render() {
        const newPlayers = [...this.state.player]
        const sortedPlayers = newPlayers.sort((a, b) =>
            b.score - a.score
        );

        const label = this.state.timingEvents.length % 2 === 0
            ? 'start'
            : 'pause'

        return (
            <div>
                <OuterContainer>
                    <TimerDiv>
                        <Timer events={this.state.timingEvents} gameTime={this.state.timePerGame} />
                        <TimerButton onClick={this.timerClicked}>{label}</TimerButton>
                    </TimerDiv>
                    {
                        sortedPlayers.map((player, index) =>
                            <PlayerCard key={index}>
                                <PlayerLabel>
                                    <AvatarContainer>
                                        <PlayerAvatar src='/icon/profile-icon.svg'></PlayerAvatar>
                                    </AvatarContainer>
                                    {player.name}
                                </PlayerLabel>
                                <ScoreDiv>
                                    <ScoreButton id={index} onClick={this.minusScore}>-</ScoreButton>
                                    {player.score}
                                    <ScoreButton id={index} onClick={this.addScore}>+</ScoreButton>
                                </ScoreDiv>
                            </PlayerCard>
                        )
                    }
                    <EndButton onClick={this.endGameClicked}>end game</EndButton>
                </OuterContainer>
            </div>
        )
    }
}

export default checkPlayer(Score);


