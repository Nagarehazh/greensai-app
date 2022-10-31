import React from 'react'
import { updateUser } from '../../redux/apiCalls';
import {
    Container,
    Card,
    CardTitle,
    CardValue,
    CardDate,
    CardCategory,
    ButtonEdit,
    ContainerModal,
    Form,
    ButtonModal,
    SelectCategory,
    OptionCategory,
    
} from './UserStyles'
import {
    Modal
} from '..'

const User = (props) => {
    const { user, adminId } = props
    const [modal, setModal] = React.useState(false);
    const [becomeBanned, setBecomeBanned] = React.useState("");

   

    const onSubmitForm = (e) => {
        e.preventDefault();
        let ban = false;
        if(becomeBanned === "true"){
            ban = true;
        }
        const userUpdated = {
            banned: ban
        }
        updateUser(adminId, user.id, userUpdated);
        setModal(false);
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }

    const handleUploadBan = (id) =>{
        setModal(!modal)
    }

    return (
        <Container>
            <ButtonEdit onClick={() => handleUploadBan(user.id)} type={user.banned === true ? "true" : "false"}>
            <Card key={user.id} type={user.banned === true ? "true" : "false"}>
                <CardTitle>{user.userName}</CardTitle>
                <CardValue>Email: {user.email}</CardValue>
                <CardDate>Created: {user.createdAt.split('T')[0]} </CardDate>
                <CardCategory>¿User Banned?: {user.banned === true ? "True" : "False"}</CardCategory>
            </Card>
        </ButtonEdit>
            <Modal
                modal={modal}
                setModal={setModal}

            >
                <ContainerModal>
                    <Form onSubmit={onSubmitForm}>
                        <SelectCategory
                            value={becomeBanned}
                            onChange={(e) => setBecomeBanned(e.target.value)}
                            required
                        >
                            <OptionCategory value="">Select</OptionCategory>
                            <OptionCategory value="true">ban user</OptionCategory>
                            <OptionCategory value="false">don't ban user</OptionCategory>
                        </SelectCategory>
                        <ButtonModal>Upload</ButtonModal>
                    </Form>
                </ContainerModal>
            </Modal> 
        </Container>
    )
}

export default User