import React, { Component } from 'react';
import { Input, Form, FormGroup } from "reactstrap";


export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
        if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email) && this.state.password.trim().length > 6) {
            this.setState({
                email: this.state.email,
                password: this.state.password,
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
    }

    render() {
        const { email, password } = this.state;
        const enabled = email.trim().length > 0 && password.trim().length > 0;
        return (
            <div className="container">
                <div id="Login">
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
                                value="Login"
                                disabled={!enabled}
                            />
                        </FormGroup>
                    </Form>
                    If you're not a member
                    <a className="btn btn-link" href="#">Signup here</a>
                </div>
            </div>
        );
    }
}

