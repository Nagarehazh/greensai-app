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
  const { allUsers } = props
  return (
    <Container>
      <CardsContainer>
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