import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

const  LoadingContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #070B2E;
`;

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
        isLoading: false,
    }

    handleInput = e => {
        this.setState({isLoading: true})
        const file = e.target.files[0]

        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            this.callAPI(file, reader.result)
        }
    }

    callAPI = (file, byte) => {
        const bodyFormData = new FormData()
        bodyFormData.append('image_file', file)
        axios({
          url: 'https://sc0re.herokuapp.com/api/v1/images/upload',
          method: 'POST',
          data: {
            image: byte
          }
        })
        .then(uploadResult => {
          axios({
              url: "https://api-us.faceplusplus.com/facepp/v3/detect",
              method: "POST",
              params: {
                  api_key: 'n1-3x1J8wJkWdHHftOMNh0Xiob038l0t',
                  api_secret: 'QODWghePwyL3vCuBdmFaAuSdxuvwVcHQ',
              },
              data: bodyFormData
          })
          .then(res => {
              this.props.history.push('/players', {
                  imagePublicId: uploadResult.data.public_id,
                  faces: res.data.faces.map(({face_rectangle: {top, left, width, height}}) => {

                    return ({
                      top,
                      left,
                      width,
                      height,
                    })
                  })
              })
          })
          .catch(err => {
            alert(err)
          })
        })
    }

    render() {
        if (this.state.isLoading) {
          return <LoadingContainer><img src={require('../utils/loading2.gif')} alt="loading" /></LoadingContainer>
        }
        return (
            <div>
                <OuterContainer>
                    <Header>Add players</Header>
                    <br />
                    <InnerContainer>
                        <CameraButton>
                                <div>
                                    <CameraIcon src='icon/camera-icon.svg' />
                                    Take a wefie!
                                </div>
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