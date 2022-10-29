import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { publicRequest } from '../../requestMethods';
import { Button, Container } from './SuccessStyles';

function Success() {
  const location = useLocation();
  const data = location.state.stripeData;
  const { cart } = location.state;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = React.useState(null);

  React.useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await publicRequest.post('/orders', {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            quantity: item.quantity,
            productId: item._id,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch (err) {
        console.log(err);
      }
    };
    // eslint-disable-next-line no-unused-expressions
    data && createOrder();
  }, [data, cart, currentUser]);

  return (
    <Container>
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : 'Successfull. Your order is being prepared...'}
      <Button>Go to Homepage</Button>
    </Container>
  );
}

export default Success;
