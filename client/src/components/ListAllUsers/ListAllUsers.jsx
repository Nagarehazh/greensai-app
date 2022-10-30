import React from 'react'
import {
  Container,
  CardsContainer,
  // IsLoading
} from './ListAllUsersStyles'
import {
  User
} from '..'

const ListAllUsers = (props) => {
  const { allUsers, allIpBanned } = props
  console.log(allIpBanned)
  return (
    <Container>
      <CardsContainer>
      {allIpBanned?.map((ipBanned, i) => (
        <h1 key={i}>{ipBanned.ip}</h1>
      ))}
      
      {allUsers?.map((user) => (
        <User
          key={user.id}
          user={user}
          adminId={props.adminId}
        />
      ))}
      </CardsContainer>
    </Container>

  )
}

export default ListAllUsers