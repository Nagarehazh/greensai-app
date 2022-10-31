import React from 'react';
import { Container, H4 } from './AnnouncementStyles';

function Announcement(props) {
  const { userInformation } = props;
  const [userInfo, setUserInfo] = React.useState(userInformation || JSON.parse(localStorage.getItem('userInformation')));
  
  React.useEffect(() => {
    if (JSON.parse(localStorage.getItem('userInformation')))
    setUserInfo(JSON.parse(localStorage.getItem('userInformation')))
  }, [userInformation])

  return (
    <Container>
    {userInfo?.country_code && (
      <H4>{userInfo.country_name}/{userInfo.country_code}: 1 dollar: {(1/userInfo.changeCurrency.usd).toFixed(2)} {userInfo.currency[0]}; 1 euro: {(1/userInfo.changeCurrency.eur).toFixed(2)} {userInfo.currency[0]},  Free Shipping on Orders Over $30 dollars</H4>
    )}
    </Container>
  );
}

export default Announcement;
