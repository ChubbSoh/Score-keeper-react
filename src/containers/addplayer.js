import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, FormGroup, Input, Button, InputGroup, InputGroupAddon } from 'reactstrap';

const AvatarContainer = styled.div`
    width: 35px;
    height: 35px;
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
        players: [
            { name: '' },
            { name: '' },
        ],
    }

    componentDidMount() {
        if (this.props.location.state) {
          const { faces, imagePublicId } = this.props.location.state
          this.setState({
              players: faces.map((face, index) => ({
                  name: `Player ${index + 1}`,
                  avatar: `http://res.cloudinary.com/liren/image/upload/c_crop,h_${face.height},w_${face.width},x_${face.left},y_${face.top}/${imagePublicId}`,
              }))
          })
        }
    }

    addPlayer = event => {
        event.preventDefault();
        this.setState((prevState) => ({
            players: [...prevState.players, { name: '' } ],
        }));
    }

    removePlayer = index => {
        const copyPlayers = Object.assign([], this.state.players);
        copyPlayers.splice(index, 1);
        this.setState({
            players: copyPlayers,
        })
    }

    handleChange = event => {
        // TO BE FIXED. MUST NOT MUTATE STATE
        const { players } = this.state
        players[event.target.id]['name'] = event.target.value
        this.setState({
            players
        });
    }


    startGame = () => {
        this.props.history.push({
            pathname: '/startgame',
            player: this.state.players
        })
    }

    render() {
        const { players } = this.state

        return (
            <div>
                <OuterContainer>
                    <Header>Add players</Header>
                    <br />
                    <Form id='playerForm'>
                        {
                          players.map(({name, avatar}, index) => {
                              return (
                                  <FormGroup key={index}>
                                      <InputGroup>
                                          {
                                            (avatar && this.props.location.state) &&
                                            <AvatarContainer>
                                                <PlayerAvatar src={avatar}></PlayerAvatar>
                                            </AvatarContainer>

                                          }
                                          <Input
                                              type='text'
                                              id={index}
                                              placeholder='name'
                                              onChange={this.handleChange}
                                              value={name}
                                          />
                                          <InputGroupAddon addonType='prepend'>
                                              <Button onClick={this.removePlayer.bind(this, index)} >remove</Button>
                                          </InputGroupAddon>
                                      </InputGroup>
                                  </FormGroup>
                              )
                          })
                        }
                        <AddPlayerButton onClick={this.addPlayer}>Add more players</AddPlayerButton>
                    </Form>
                    <StartGameBtn attribute='playerForm' type="submit" onClick={this.startGame}>Start game</StartGameBtn>
                </OuterContainer>
            </div>
        )
    }
}