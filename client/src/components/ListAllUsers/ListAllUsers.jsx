import React from 'react'
import { updateIpBanned, deleteIpBanned, searchIpInfo } from '../../redux/apiCalls';
import {
  Container,
  CardsContainer,
  CardIpBanned,
  ButtonEdit,
  ContainerModal,
  Form,
  Input,
  ButtonModal,
  SelectCategory,
  OptionCategory
  // IsLoading
} from './ListAllUsersStyles'
import {
  User,
  Modal
} from '..'

const ListAllUsers = (props) => {
  const { allUsers, allIpBanned } = props

  const [modal, setModal] = React.useState(false);
  const [modeSearching, setModeSearching] = React.useState(false);
  const [becomeBanned, setBecomeBanned] = React.useState("");
  const [ipSearching, setIpSearching] = React.useState("");
  const [eraseIpBan, setEraseIpBan] = React.useState("");
  const [searchResult, setSearchResult] = React.useState(null);



  const onSubmitForm = (e) => {
    e.preventDefault();
    setModal(false);
    

    if (modeSearching) {
      const ipSearch = {
        ip: ipSearching
      }

      
      searchIpInfo(props.adminId, ipSearch)
        .then((res) => {
          setSearchResult(res.data);
          setModeSearching(false)
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      const ipBanned = {
        ip: becomeBanned
      }
      if (becomeBanned !== "") {
        updateIpBanned(props.adminId, ipBanned);
      }

      if (eraseIpBan !== "") {
        deleteIpBanned(props.adminId, { ip: eraseIpBan });
      }
      setModal(false);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }

  }

  const handleUploadBan = (id) => {
    setModal(!modal)
    setModeSearching(false);
  }

  const handleSearchIp = (id) => {
    setModal(!modal)
    setModeSearching(true)
  }

  
  return (
    <Container>
      <CardsContainer>
        <ButtonEdit onClick={() => handleUploadBan(props.adminId)}>
          <CardIpBanned>
            <h2 style={{ marginBottom: "10px" }}>Ip Banned</h2>
            {allIpBanned?.map((ipBanned, i) => (
              <span key={i} style={{ marginBottom: "10px" }}>
                {ipBanned.ip}
              </span>
            ))}
          </CardIpBanned>
        </ButtonEdit>

        <ButtonEdit onClick={() => handleSearchIp(props.adminId)}>
          <CardIpBanned>
            <h2 style={{ marginBottom: "10px" }}>Search By Ip</h2>
            {searchResult !== null && searchResult !== "No response" && searchResult && (
              <>
                <span style={{ marginBottom: "10px" }}>
                  IP: {searchResult.ip || "User Banned"}
                </span>
                <span style={{ marginBottom: "10px" }}>
                  Country: {searchResult.country_name}
                </span>
                <span style={{ marginBottom: "10px" }}>
                  ISO: {searchResult.country_code}
                </span>
                <span style={{ marginBottom: "10px" }}>
                  Currency: 1 {searchResult.currency}
                </span>
                <span style={{ marginBottom: "10px" }}>
                  Convert to USD: {searchResult.changeCurrency?.usd}
                </span>
                <span style={{ marginBottom: "10px" }}>
                  Convert to EUR: {searchResult.changeCurrency?.eur}
                </span>
              </>
            )}
          </CardIpBanned>
        </ButtonEdit>

        {allUsers?.map((user) => (
          <User
            key={user.id}
            user={user}
            adminId={props.adminId}
          />
        ))}
      </CardsContainer>
      <Modal
        modal={modal}
        setModal={setModal}

      >
        <ContainerModal>
          <Form onSubmit={onSubmitForm}>
            {modeSearching === true ? (
              <Input
                type="text"
                placeholder="Write the ip"
                value={ipSearching}
                onChange={(e) => setIpSearching(e.target.value)}
              />

            ) : (
              <>
                <Input
                  type="text"
                  placeholder="Ip to ban"
                  value={becomeBanned}
                  onChange={(e) => setBecomeBanned(e.target.value)}
                />
                <label style={{ marginTop: "10px" }}>¿Do you want to unban an Ip?</label>
                <SelectCategory
                  value={eraseIpBan}
                  onChange={(e) => setEraseIpBan(e.target.value)}
                >
                  <OptionCategory value="">Select</OptionCategory>
                  {allIpBanned?.map((ipBanned, i) => (
                    <OptionCategory key={i} value={ipBanned.ip}>{ipBanned.ip}</OptionCategory>
                  ))}
                </SelectCategory>
              </>
            )}


            <ButtonModal>Upload</ButtonModal>
          </Form>
        </ContainerModal>
      </Modal>
    </Container>

  )
}

export default ListAllUsers