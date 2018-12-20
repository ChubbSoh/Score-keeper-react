import React, { Component } from 'react';
import {Button, Form, FormGroup, Input, InputGroup, InputGroupAddon} from 'reactstrap'


export default class NewGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }

    
    }
    render() {
        return (
            <div className="container">
                <div id="NewGame">
                    <h3>New game</h3><Button close/>
                    <Form>
                        <FormGroup>
                            <Input
                            type="text"
                            name="gameName"
                            id="gameName"
                            placeholder="name of game"
                            // value={this.props.gameName}
                            // onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                            type="number"
                            name="scorePerPoint"
                            id="scorePerPoint"
                            placeholder="point per score"
                            // value={this.props.gameName}
                            // onChange={this.handleChange}
                            />
                        </FormGroup>
                        <div>
                            <h4>timer</h4>
                        </div>
                        <InputGroup className="timerInput">
                            <Input placeholder="0" />
                            <InputGroupAddon addonType="append">min per round</InputGroupAddon>
                        </InputGroup>
                        <InputGroup className="timerInput">
                            <Input placeholder="0" />
                            <InputGroupAddon addonType="append">min per game</InputGroupAddon>
                        </InputGroup>
                        <FormGroup>
                            <Input
                                type="submit"
                                name="saveGame"
                                value="save game"
                                // disabled={!enabled}
                            />
                        </FormGroup>
                    </Form>
                </div>
            </div>
        )
    }
}