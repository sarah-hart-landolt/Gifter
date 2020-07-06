import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,Modal, ModalHeader, ModalBody } from 'reactstrap';

const Header = () => {
const [Modal, setModal] = useState(false)
  const toggle = () => setModal(!Modal)
  return (
    <nav className="navbar navbar-expand navbar-dark bg-info">
      <Link to="/" className="navbar-brand">
        GiFTER
      </Link>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Feed
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;