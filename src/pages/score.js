import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

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
class Score extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player: this.props.location.player.map((player) => ({ name: player.name, score: 0 })),
            timePerRound: props.timePerRound,
            timePerGame: props.timePerGame,
            isPaused: true
        }
        this.poll = null
    }

    pause = () => { clearInterval(this.poll) }

    start = () => { this.poll = setInterval(this.tick, 1000) }

    tick = () => {
        this.setState({ timePerGame: this.state.timePerGame - 1 })
        if (this.state.seconds <= 0) {
            this.pause()
        }
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
        if (this.state.isPaused) {
            this.start()
        } else {
            this.pause()
        }
        this.setState({
            isPaused: !this.state.isPaused
        })
    }

    render() {
        const newPlayers = [...this.state.player]
        const sortedPlayers = newPlayers.sort((a, b) =>
            b.score - a.score
        );

        const timer = this.state.timePerGame
            ? <TimerDiv>
                {
                    this.state.seconds <= 0
                        ? <div>Game has Ended!</div>
                        : <div>Time Per Game: {this.state.timePerGame}</div>
                }
                <TimerButton onClick={this.timerClicked}>{this.state.isPaused ? 'start' : 'pause'}</TimerButton>
            </TimerDiv>
            : null;

        return (
            <div>
                <OuterContainer>
                    {timer}
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


