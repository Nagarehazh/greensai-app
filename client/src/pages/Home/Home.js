import React from 'react';
import {
  NavBar,
  Announcement,
  Slider,
  Categories,
  Products,
  Newsletter,
  Footer,
} from '../../components';
import {getUserInfo} from '../../redux/apiCalls';

function Home() {
  //get user localstorage
  const [userInformation, setUserInformation] = React.useState(null);

  const user = JSON.parse(localStorage.getItem('user'));
 
  React.useEffect(() => {
    const getUserInformation = async () => {
      const res = await getUserInfo(user.user.dataValues.id);
      //localstorage set user information

      localStorage.setItem('userInformation', JSON.stringify(res.data));

      setUserInformation(res.data);
    };
    getUserInformation();
  }, [] );
  
 
  

  return (
    <div>
      <Announcement userInformation={userInformation}/>
      <NavBar />
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Home;
