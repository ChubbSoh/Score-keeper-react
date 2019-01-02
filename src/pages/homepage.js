import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const GameContainer = styled.div`
    background: #070B2E;
    padding: 70px 15px 0 15px;
    height: 100vh;
    width: 100%;    
    overflow-y: scroll;
`;

const ImgContainer = styled.div`
    overflow: hidden;
    width: 150px;
    height: 150px;
    background: #ABABAB;
    border-radius: 5px; 
    margin: 0 10px 20px 10px;
    display: inline-block;
    position: relative;
    flex: 1;
`;

// const GameImg = styled.img`
//     position: absolute;
//     left: 50%;
//     top: 50%;
//     height:100%;
//     width: auto;
//     -webkit-transform: translate(-50%,-50%);
//       -ms-transform: translate(-50%,-50%);
//           transform: translate(-50%,-50%);
// `;

const GameName = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 150px;
    height: 150px;
    background: rgba(7,11,46, 0.5);
    border-radius: 5px;
    color: white;
`

const AddNewGame = styled.button`
    position: fixed;
    width: 60px;
    height: 60px;
    margin: 0 30px 80px 0;    
    bottom: 0;
    right: 0;
    border-radius: 30px;
    background: #0CB18F;
    border: none; 
`;

const GameCard = ({ game, setGameId, redirect }) => {
    const {
        id,
        gameName,
    } = game


    const handleClick = () => {
        setGameId(id)
        redirect({
            pathname: '/game',
            game,
        })
    }

    return (
        <ImgContainer onClick={handleClick}>
            <GameName>{gameName}</GameName>
        </ImgContainer>
    )
}

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [],
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: 'https://sc0re.herokuapp.com/api/v1/games',
        }).then(result => {
            console.log(result);
            const games = result.data;
            this.setState({
                games: games
            })
        }).catch(error =>
            console.log("ERROR", error)
        )
    }

    render() {
        return (
            <div>
                <GameContainer>
                    {
                        this.state.games.map((game, index) =>
                            <GameCard key={index} game={game} setGameId={this.props.setGameId} redirect={this.props.history.push} />

                        )
                    }
                </GameContainer>
                <Link to={{ pathname: '/newgame' }}>
                    <AddNewGame><img src='/icon/add-icon.png' alt='add-icon' /></AddNewGame>
                </Link>
            </div>
        )
    }
}

export default Homepage;
