import React from 'react';
import { Facebook, Instagram, Mail, Phone, Pinterest, Room, Twitter } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import {
  Container,
  Left,
  Logo,
  Desc,
  SocialContainer,
  SocialIcon,
  Center,
  Title,
  List,
  ListItem,
  Right,
  ContactItem,
  Payment,
  ContainerList,
} from './FooterStyles';

function Footer() {
  return (
    <Container>
      <Left>
        <Logo>GREENSAI</Logo>
        <Desc>
          Greensai is an ecommerce project created and designed by
          © Harley Zapata
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <ContainerList>
          <List>
            <Link to="/">
              <ListItem>Home</ListItem>
            </Link>
            <Link to="/cart">
              <ListItem>Cart</ListItem>
            </Link>
            <ListItem>Terms</ListItem>
          </List>
          <List>
            <Link to="/products/baby">
              <ListItem>Baby Bonsai</ListItem>
            </Link>
            <Link to="/products/junior">
              <ListItem>Junior Bonsai</ListItem>
            </Link>
            <Link to="/products/senior">
              <ListItem>Senior Bonsai</ListItem>
            </Link>
          </List>
        </ContainerList>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem><Room style={{ marginRight: '10px' }} />459 Exam Path , South Example 53846</ContactItem>
        <ContactItem><Phone style={{ marginRight: '10px' }} />+1 234 56 78</ContactItem>
        <ContactItem><Mail style={{ marginRight: '10px' }} />Contact@harleyzapata.com</ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
}

export default Footer;
