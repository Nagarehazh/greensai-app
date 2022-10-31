import React from 'react';
import {
  NavBar,
  Announcement,
  Slider,
  Categories,
  Products,
  Newsletter,
  Footer,
  ListAllUsers
} from '../../components';
import { getUserInfo, getAllUsers, getIpBanned } from '../../redux/apiCalls';

function Home() {
  //get user localstorage
  const [userInformation, setUserInformation] = React.useState(null);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [allUsers, setAllUsers] = React.useState(null);
  const [allIpBanned, setAllIpBanned] = React.useState(null);

  const user = JSON.parse(localStorage.getItem('user'));


  React.useEffect(() => {
    if (user?.user.dataValues.isAdmin === true) {
      setIsAdmin(true);
      const getAllUsersRegistered = async () => {
        const res = await getAllUsers(user?.user.dataValues.id);
        const resIpBanned = await getIpBanned(user?.user.dataValues.id);
        setAllUsers(res.data);
        setAllIpBanned(resIpBanned.data);

      };
      getAllUsersRegistered();
    } else {
      const getUserInformation = async () => {
        const res = await getUserInfo(user?.user.dataValues.id);
        //localstorage set user information
        localStorage.setItem('userInformation', JSON.stringify(res.data));

        setUserInformation(res.data);
      };
      getUserInformation();
    }
  }, []);




  return (
    <div>
      <Announcement userInformation={userInformation} />
      <NavBar />
      {isAdmin === true
        ? (
          <>
            <h2>Admin Dashboard</h2>
            <ListAllUsers 
              allUsers={allUsers} 
              adminId={ user.user.dataValues.id } 
              allIpBanned={allIpBanned}  
              />
          </>
        )

        : (
          <>
            <Slider />
            <Categories />
            <Products />
          </>
        )}
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Home;
