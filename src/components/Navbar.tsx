import React from "react";
import { Pane, Heading, Button } from "evergreen-ui";
import './Navbar.css';
import navigation from '../assets/navigation.svg'

const Navbar = () => {
  return (
    <Pane background="yellow" padding={16} borderBottom>
      <Pane display="flex" alignItems="center" justifyContent="space-between">
      <img src={navigation} alt="Navbar Logo" style={{ height: "40px" }} />
      </Pane>
    </Pane>
  );
};

export default Navbar;