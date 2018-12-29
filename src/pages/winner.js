import React, { Component } from 'react'
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

const OuterContainer = styled.div`
    padding: 70px 20px 0 20px;
    background: #070B2E;
    height: 100vh;    
`;

const TrophyDiv = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    margin: 10px 0 10px 0;
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

const Gold = styled(PlayerCard)`
    background-color: #EBB328;
`;

const Silver = styled(PlayerCard)`
    background-color: #959595;
`

const Bronze = styled(PlayerCard)`
    background-color: #CD7F32;
`

const PlayerLabel = styled.label`
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ScoreDiv = styled.div`
    display: flex;     
    width: 15%;
    justify-content: space-around;    
`;

const SaveButton = styled.button`
    width: 100%;
    padding: 10px;
    background: #0CB18F;
    border: none;
    color: #FFF;
    border-radius: 5px;
    margin-top: 10px;
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


const checkPlayer = Component => props => {
    if (props.location.player) {
        return <Component {...props} />
    } else {
        return <Redirect to={'/players'} />
    }
}

class Winner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player: this.props.location.player,
            saveGame: false,
        }
    }

    saveGame = event => {
        event.preventDefault()
        this.props.history.push('/home')
    }

    render() {
        const newPlayers = [...this.state.player]
        const sortedPlayers = newPlayers.sort((a, b) =>
            b.score - a.score
        );

        const bronzeDiv = sortedPlayers[2]
            ?
            <Bronze>
                <PlayerLabel>
                    <AvatarContainer>
                        <PlayerAvatar src='/icon/profile-icon.svg'></PlayerAvatar>
                    </AvatarContainer>
                    {sortedPlayers[2].name}
                </PlayerLabel>
                <ScoreDiv>
                    {sortedPlayers[2].score}
                </ScoreDiv>
            </Bronze>
            : null;

        return (
            <OuterContainer>
                <TrophyDiv>
                    <img style={{ width: 'auto', height: '150px' }} src='/icon/trophy.png' alt='trophy-icon' />
                </TrophyDiv>
                <Gold>
                    <PlayerLabel>
                        <AvatarContainer>
                            <PlayerAvatar src='/icon/profile-icon.svg'></PlayerAvatar>
                        </AvatarContainer>
                        {sortedPlayers[0].name}
                    </PlayerLabel>
                    <ScoreDiv>
                        {sortedPlayers[0].score}
                    </ScoreDiv>
                </Gold>
                <Silver>
                    <PlayerLabel>
                        <AvatarContainer>
                            <PlayerAvatar src='/icon/profile-icon.svg'></PlayerAvatar>
                        </AvatarContainer>
                        {sortedPlayers[1].name}
                    </PlayerLabel>
                    <ScoreDiv>
                        {sortedPlayers[1].score}
                    </ScoreDiv>
                </Silver>
                {bronzeDiv}
                <SaveButton onClick={this.saveGame}>save game</SaveButton>
            </OuterContainer>
        )
    }
}

export default checkPlayer(Winner);

