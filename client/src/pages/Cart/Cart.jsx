import React, { useState, useEffect } from 'react';
import { Add, Remove } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { increaseQuantity, decreaseQuantity, removeProduct, clearCart } from '../../redux/cartRedux';
import logoblack from '../../images/logob.png';
import { publicRequest } from '../../requestMethods';
import {
  Container,
  Wrapper,
  Title,
  Top,
  TopButton,
  TopTexts,
  TopText,
  Bottom,
  Info,
  Product,
  ProductDetail,
  Image,
  Details,
  ProductName,
  ProductId,
  ProductType,
  ProductAge,
  PriceDetail,
  ProductAmountContainer,
  ProductAmount,
  ProductPrice,
  Hr,
  Summary,
  SummaryTitle,
  SummaryItem,
  SummaryItemText,
  SummaryItemPrice,
  Button,
} from './CartStyles';
import {
  NavBar,
  Announcement,
  Footer,
} from '../../components';
import { getUserInfo } from '../../redux/apiCalls';

const STRIPE_KEY = process.env.REACT_APP_STRIPES_KEY;

function Cart() {



  let cartSelector = useSelector((state) => state.cart);
  // localstorage get cart

  if (localStorage.getItem('cart')) {
    cartSelector = JSON.parse(localStorage.getItem('cart'));
  }

  React.useEffect(() => {
    // localstorage get cart
    cartSelector = JSON.parse(localStorage.getItem('cart'));
  }, [cartSelector]);
  // const cart = JSON.parse(localStorage.getItem('cart'));

  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const number = 3;
    getUserInfo(dispatch, { number});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await publicRequest.post('/checkout/payment', {
          tokenId: stripeToken.id,
          amount: cartSelector.total * 100,
        });
        navigate('/success', { state: {
          stripeData: res.data,
          products: cartSelector } });
      } catch (err) {
        console.log(err);
      }
    };
    if (stripeToken) {
      makeRequest();
    }
  }, [stripeToken, cartSelector.total, navigate]);

  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id) => {
    if (cartSelector.quantity === 1) {
      dispatch(removeProduct(id));
    } else {
      dispatch(decreaseQuantity(id));
    }
  };

  const clearAllCart = () => {
    dispatch(clearCart());
  };

  const totalPlusShipping = cartSelector.total > 0 && cartSelector.total < 31 ? cartSelector.total + 35.90 : cartSelector.total;

  return (
    <Container>
      <NavBar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <span>Shopping Bag({cartSelector.quantity})</span>
            <TopText onClick={() => clearAllCart()}>Clear All Cart</TopText>
          </TopTexts>
          {stripeToken ? (<span>Processing. Please wait...</span>) : (
            <StripeCheckout
              name="Greensai"
              image={logoblack}
              billingAddress
              shippingAddress
              description={`Your total is $${totalPlusShipping}`}
              amount={cartSelector.total * 100}
              token={onToken}
              stripeKey={STRIPE_KEY}
            >
              <TopButton type="filled">CHECKOUT NOW</TopButton>
            </StripeCheckout>
          )}
        </Top>
        <Bottom>
          <Info>
            {cartSelector.products.map((item, i) => (
              <Product key={i}>
                <ProductDetail>
                  <Image src={item.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {item.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {item.id}
                    </ProductId>
                    <ProductType>
                      <b>Type:</b> {item.categories}
                    </ProductType>
                    <ProductAge>
                      <b>Age:</b> {item.age} years old
                    </ProductAge>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Remove onClick={() => handleDecrease(item.id)} />
                    <ProductAmount>{item.quantity}</ProductAmount>
                    <Add onClick={() => handleIncrease(item.id)} />
                  </ProductAmountContainer>
                  <ProductPrice>${item.price * item.quantity}</ProductPrice>
                </PriceDetail>
                <Hr />
              </Product>
            ))}

          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cartSelector.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              {cartSelector.total > 0 ? <SummaryItemPrice>$ 35.90</SummaryItemPrice> : <SummaryItemPrice>$ 0.00</SummaryItemPrice>}
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              {cartSelector.total > 0 && cartSelector.total > 30 ? <SummaryItemPrice>$ -35.90</SummaryItemPrice> : <SummaryItemPrice>$ 0.00</SummaryItemPrice>}
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total in USD Dollars</SummaryItemText>
              {cartSelector.total > 0 && cartSelector.total > 30 ? <SummaryItemPrice>$ {cartSelector.total}</SummaryItemPrice> : <SummaryItemPrice>$ {totalPlusShipping}</SummaryItemPrice>}
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total in </SummaryItemText>
              {cartSelector.total > 0 && cartSelector.total > 30 ? <SummaryItemPrice>$ {cartSelector.total}</SummaryItemPrice> : <SummaryItemPrice>$ {totalPlusShipping}</SummaryItemPrice>}
            </SummaryItem>
            {stripeToken ? (<span>Processing. Please wait...</span>) : (
              <StripeCheckout
                name="Greensai"
                image={logoblack}
                billingAddress
                shippingAddress
                description={`Your total is $${totalPlusShipping}`}
                amount={cartSelector.total * 100}
                token={onToken}
                stripeKey={STRIPE_KEY}
              >
                <Button>CHECKOUT NOW</Button>
              </StripeCheckout>
            )}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
}

export default Cart;
