import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const CameraButton = styled.label`
    width: 250px;
    height: 250px;
    border-radius: 125px;
    background: #373D65;
    color: #FFF;
    padding: 10px;
    align-items: center;
    display: flex;
    justify-content: center;
`;

const Input = styled.input`
    display: none;
`;

const Header = styled.div`
    color: #FFF;
    font-size: 20px;
`;

const OuterContainer = styled.div`
    padding: 70px 40px 0 40px;
    background: #070B2E;
    height: 100vh;    
`;

const InnerContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
       
`;

const AddManually = styled.button`
    width: 100%;
    background: #373D65;
    padding: 10px;
    border-radius: 5px;
    border: none;
    color: #97989F;
    display: flex-end;
    margin-top: 50px;
`;

const CameraIcon = styled.img`
    width: auto;
    height: 100px;
    margin-bottom: 10px;
    display: block;
`;

export default class Camera extends Component {
    state = {
        file: null,
        img: null,
        result: [],
        imgHeight: 0,
        imgWidth: 0,
    }

    handleInput = e => {
        const file = e.target.files[0]
        const img = new Image()
        img.src = URL.createObjectURL(file)
        img.onload = () => {
            this.setState({
              imgHeight: img.height,
              imgWidth: img.width
            })
        }

        this.setState({
            file,
            img: img.src
        })
        this.callAPI(file)
    }

    callAPI = (file) => {
        const bodyFormData = new FormData();
        bodyFormData.append('image_file', file)
        Axios({
            url: "https://api-us.faceplusplus.com/facepp/v3/detect",
            method: "POST",
            params: {
                api_key: 'n1-3x1J8wJkWdHHftOMNh0Xiob038l0t',
                api_secret: 'QODWghePwyL3vCuBdmFaAuSdxuvwVcHQ',
            },
            data: bodyFormData
        })
        .then(res => {
            console.log(res.data)
            console.log(res.data.faces)
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                <OuterContainer>
                    <Header>Add players</Header>
                    <br />
                    <InnerContainer>
                        <CameraButton>Take a wefie!
                                <Input onChange={this.handleInput} type="file" accept="image/*" capture="user" />
                        </CameraButton>
                    </InnerContainer>
                    <br />
                    <Link to={'/players'}><AddManually type='button'>or key in players</AddManually></Link>
                </OuterContainer>
            </div>
        )
    }
};