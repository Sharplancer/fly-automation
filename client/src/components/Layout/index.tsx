// node_modules
import React from "react";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";

// components
import NavbarComponent from "../Navbar";

type Props = {
  children: React.ReactNode;
}

// consts
const LayoutComponent: React.FC<Props> = ({children}) => {
  return (
    <>
      <NavbarComponent/>
      <Container className='d-flex justify-content-center' style={{height: '91vh'}}>
          {children}
      </Container>
    </>
  );
};

export default LayoutComponent;
