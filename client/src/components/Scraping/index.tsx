import React, { useRef, useState } from 'react';
import { Button, Container, FormControl, InputGroup, Card, Spinner, Form } from 'react-bootstrap';

import { requestScraping } from '../../store/scraping-slice';
import { RootState } from '../../store/index';
import { Data } from '../../utils/types';

const ScrapingComponent = () => {
  const urlRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [url, setUrl] = useState('');
  const [validated, setValidated] = useState(false);
  
  const urlPatternValidation = (URL: string) => {
    const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');    
    return regex.test(URL);
  };

  const onChangeUrl = (e: any) => {
    setUrl(e.target.value);
  }

  const onHandleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const form: any = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      if (urlPatternValidation(url))

    }
    setValidated(true);
  }
  return(
    <Container>
      <Form noValidate validated={urlPatternValidation(url) && validated} onSubmit={onHandleSubmit}>
        <InputGroup className="mb-3 mt-5" hasValidation>
          <FormControl
            isInvalid={!urlPatternValidation(url) && validated}
            placeholder="URL"
            aria-label="url"
            aria-describedby="url"
            onChange={onChangeUrl}
            ref={urlRef}
          />
          <Button variant="primary" type="submit" id="button-addon2" onClick={onHandleSubmit}>
            Scraping
          </Button>
          <Form.Control.Feedback type="invalid">
            Please type correct URL.
          </Form.Control.Feedback>
        </InputGroup>
      </Form>
      <div className="d-flex justify-content-center">
        {
          status === "pending" && <Spinner animation="border" variant="primary" />
        }
        {
          status === "success" &&
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={data.imgSrc} />
            <Card.Body>
              <Card.Title>{data.firstName} {data.lastName}</Card.Title>
              <Card.Text>
                Listing: <strong>{data.listingCount}</strong>
              </Card.Text>
            </Card.Body>
          </Card>
        }
      </div>
    </Container>
  )
}

export default ScrapingComponent;