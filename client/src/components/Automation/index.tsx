import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, Row, Col,Container } from 'react-bootstrap';
import { requestForm } from '../../store/form-slice';
import { COUNTRY, GENDER } from '../../utils';

const AutomationComponent = () => {
  const dispatch = useDispatch();

  const firstNameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const lastNameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const userNameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const genderRef = useRef() as React.MutableRefObject<HTMLSelectElement>;
  const countryRef = useRef() as React.MutableRefObject<HTMLSelectElement>;

  const onHandleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const firstName: string = firstNameRef.current.value;
    const lastName: string = lastNameRef.current.value;
    const userName: string = userNameRef.current.value;
    const email: string = emailRef.current.value;
    const password: string = passwordRef.current.value;
    const gender: string = genderRef.current.value;
    const country: string = countryRef.current.value;
    dispatch<any>(requestForm(firstName, lastName, userName, email, password, gender, country));
  }

  return(
    <Container className="d-flex align-items-center col-lg-6" fluid>
      <Form className="d-grid" onSubmit={onHandleSubmit}>
        <Row className="mb-4">
          <Form.Group as={Col} controlId="firstName">
            <Form.Control placeholder="First Name" ref={firstNameRef}/>
          </Form.Group>

          <Form.Group as={Col} controlId="lastName">
            <Form.Control placeholder="Last Name" ref={lastNameRef}/>
          </Form.Group>
        </Row>

        <Form.Group className="mb-4" controlId="email">
          <Form.Control type="email" placeholder="Enter email" ref={emailRef}/>
        </Form.Group>

        <Form.Group className="mb-4" controlId="userName">
          <Form.Control placeholder="User Name" ref={userNameRef}/>
          <Form.Label>Choose something you like, this cannot be changed.</Form.Label>
        </Form.Group>

        <Form.Group className="mb-4" controlId="password">
          <Form.Control type="password" placeholder="Password" ref={passwordRef}/>
          <Form.Label>Must be at least 6 characters and must contain a number or symbol.</Form.Label>
        </Form.Group>

        <Form.Select className="mb-4" aria-label="Select Gender" ref={genderRef}>
          <option>Select Gender</option>
          <option value={GENDER.MALE}>Male</option>
          <option value={GENDER.FEMALE}>Female</option>
          <option value={GENDER.UNSPECIFIED}>Unspecified</option>
        </Form.Select>

        <Form.Group className="mb-4" controlId="country">
          <Form.Select aria-label="Select Country" ref={countryRef}>
            <option value={COUNTRY.US}>United States</option>
            <option value={COUNTRY.CA}>Canada</option>
            <option value={COUNTRY.AU}>Australia</option>
            <option value={COUNTRY.IN}>India</option>
          </Form.Select>
          <Form.Label>The country you select will be saved as your default shopping experience. If you sell an item, this is where it will ship from.</Form.Label>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={onHandleSubmit}>
          Sign Up
        </Button>
      </Form>
    </Container>
  )
}

export default AutomationComponent;