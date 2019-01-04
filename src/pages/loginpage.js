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

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            emailError: "",
            passwordError: "",
            loading: false,
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    validateForm = () => {
        if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email) && this.state.password.trim().length > 6) {
            this.setState({
                email: this.state.email,
                password: this.state.password,
                loading: true,
            })
        } else {
            this.setState({
                emailError: "Email address is invalid",
                passwordError: "Password needs to be at least 6 characters."
            })
        }
    };

    handleSubmit = event => {
        event.preventDefault();
        this.validateForm();
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };

        axios.post('https://sc0re.herokuapp.com/api/v1/login', { user }, config)
            .then(result => {
              console.log(result)
              this.setState({loading: false})
                localStorage.setItem('jwt', result.data.auth_token)
                this.props.history.push("/home")
            })
            .catch(error => {
              console.log("ERROR", error)
              this.setState({loading: false})
            })
    }

    render() {
        const { email, password } = this.state;
        const enabled = email.trim().length > 0 && password.trim().length > 0;
        return (
            <div>
                <OuterContainer>
                    <div id="Login">
                        <Header>SC0RE</Header>
                        <Form onSubmit={this.handleSubmit}>
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
                                    name="login"
                                    value={this.state.loading ? 'Logging In...' : 'Log In'}
                                    disabled={!enabled}
                                />
                            </FormGroup>
                        </Form>
                        <div style={{ color: 'white' }}>If you're not a member,
                        <Link to='/signup'><button className="btn btn-link">signup here</button></Link>
                        </div>
                    </div>
                </OuterContainer>
            </div>
        );
    }
}

