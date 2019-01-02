import React, { Component } from 'react';
import { Input, Form, FormGroup } from "reactstrap";
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const OuterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: #070B2E;
    height: 100vh;
    padding: 0 20px 0 20px;      
`;

const Header = styled.div`
    color: white;
    text-align: center;
    font-size: 40px;
    margin-bottom: 10px;
`;

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            emailError: "",
            passwordError: "",
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    validateForm = () => {
        if (this.state.name.trim().length > 0 &&
            /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email) &&
            this.state.password.trim().length > 6) {
            this.setState({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
            })
            return true
        } else {
            this.setState({
                emailError: "Email address is invalid",
                passwordError: "Password needs to be at least 6 characters."
            })
            return false
        }
    };

    handleSubmit = event => {
        event.preventDefault();
        if (!this.validateForm()) return

        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };
        axios.post('https://sc0re.herokuapp.com/api/v1/signup', { user }, config)
            .then(result => {
                // Log in after succesful sign up
                localStorage.setItem('jwt', result.data.token)
                this.props.history.push("/")
            });

    }

    render() {
        const { name, email, password } = this.state;
        const enabled = name.trim().length > 0
            && email.trim().length > 0
            && password.trim().length > 0;
        return (
            <OuterContainer>
                <div id="Login">
                    <Header>SC0RE</Header>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Input
                                type="text"
                                name="Name"
                                id="name"
                                placeholder="Name"
                                value={this.props.name}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="email"
                                value={this.props.email}
                                onChange={this.handleChange}
                            />
                            <div className="error">{this.state.emailError}</div>
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="password"
                                value={this.props.password}
                                onChange={this.handleChange}
                            />
                            <div className="error">{this.state.passwordError}</div>
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type="submit"
                                name="signup"
                                value="Sign Up"
                                disabled={!enabled}
                            />
                        </FormGroup>
                    </Form>
                    <div>
                        <div style={{ color: 'white' }}>If you're already a member,
                            <Link to='/login'><button className="btn btn-link">login here</button></Link>
                        </div>
                    </div>
                </div>
            </OuterContainer>
        )
    }
}