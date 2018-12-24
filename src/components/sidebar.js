import React, { Component } from 'react';
import styled from 'styled-components';

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 50%;
  background: #070B2E;
  height: 100vh;
  z-index: 2;
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

class SideNav extends Component {
  render() {
    return (
      <div>
        <Sidebar>
          <h5>SCORE</h5>
          <SideList>
            <ListItem>Profile</ListItem>
            <ListItem>Past Games</ListItem>
            <ListItem>Settings</ListItem>
            <ListItem>Logout</ListItem>
          </SideList>
        </Sidebar>
      </div>
    );
  }
}

export default SideNav;





