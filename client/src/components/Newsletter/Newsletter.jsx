import React from 'react';
import { Send } from '@material-ui/icons';
import {
  Container,
  Title,
  Desc,
  InputContainer,
  Input,
  Button,
} from './NewsletterStyles';

function Newsletter() {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get timely updates from your favorite products.</Desc>
      <InputContainer>
        <Input type="text" placeholder="Your email" />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
}

export default Newsletter;
