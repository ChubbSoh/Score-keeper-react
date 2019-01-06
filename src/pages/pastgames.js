import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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


export default class PastGames extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameId: this.props.location.gameId,
            gamelog: this.props.location.scores,
            game: null
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: 'https://sc0re.herokuapp.com/api/v1/games',
        }).then(result => {
            console.log(result);
            const games = result.data;
            const playedGame = games.filter((game) => {
                return game.id === this.state.gameId
            })
            this.setState({
                game: playedGame
            })
        }).catch(error =>
            console.log("ERROR", error)
        )
    }

    render() {
        const { gamelog, game } = this.state
        return (
            <OuterContainer>
                {game.gameName}
                {
                    gamelog.scores.map((player, index) => (
                        <PlayerCard key={index}>
                            <PlayerLabel>
                                <AvatarContainer>
                                    <PlayerAvatar src='/icon/profile-icon.svg'></PlayerAvatar>
                                </AvatarContainer>
                                {player.name}
                            </PlayerLabel>
                            <ScoreDiv>
                                {player.score}
                            </ScoreDiv>
                        </PlayerCard>
                    ))
                }
            </OuterContainer>
        )
    }
}
