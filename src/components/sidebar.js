import React, { Component } from 'react';
import styled from 'styled-components';

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 60%;
  background: #070B2E;
  height: 100vh;
  z-index: 3;
  color: white;
  padding: 20px;

`;

const SideList = styled.ul`
  padding: 0;
  margin: 30px 0 0 0;
`;

const ListItem = styled.li`
  list-style: none;
  margin: 0 0 20px 0;
`;

const ProfilePic = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: #373D65;
  border: none;
  margin-right: 15px;
`;

class SideNav extends Component {
  logout = () => {
    localStorage.removeItem('jwt')
    window.location.href = '/'
  }

  render() {
    return (
      <div>
        <Sidebar>
          <SideList>
            <ProfilePic src='icon/profile-icon.svg' />Name
          </SideList>
          <br />
          <SideList>
            <ListItem>Profile</ListItem>
            <ListItem>Past Games</ListItem>
            <ListItem>Settings</ListItem>
            <ListItem onClick={this.logout}>Logout</ListItem>
          </SideList>
        </Sidebar>
      </div>
    );
  }
}

export default SideNav;





