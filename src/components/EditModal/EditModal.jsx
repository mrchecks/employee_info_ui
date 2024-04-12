import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Input, Label, Row } from 'reactstrap'
import { useEffect, useState } from 'react'
import { DateSelector } from '../DateSelector/DateSelector'
import './EditModal.scss'

export const EditModal = (props) => {
    const {
        callback,
        showModal,
        currentEmployee,
        isAdding
    } = props

    const [showModalLocal, setShowModalLocal] = useState(showModal)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [employeeNum, setEmployeeNum] = useState(0)
    const [birthDate, setBirthDate] = useState({})
    const [employedDate, setEmployedDate] = useState({})
    const [termDate, setTermDate] = useState({})

    useEffect(() => {
        setShowModalLocal(showModal)

    }, [showModal])

    useEffect(() => {
        setFirstName(currentEmployee?.firstName ? currentEmployee?.firstName : '')
        setLastName(currentEmployee?.lastName ? currentEmployee?.lastName : '')
        setBirthDate(currentEmployee?.birthDate ? new Date(currentEmployee?.birthDate) : new Date())
        setEmployedDate(currentEmployee?.employedDate ? new Date(currentEmployee?.employedDate) : new Date())
        setTermDate(currentEmployee?.termDate ? new Date(currentEmployee?.termDate) : null)
        setEmployeeNum(currentEmployee?.employeeNum ? currentEmployee?.employeeNum : 0)
    }, [currentEmployee])


    const validate = () => {
        //TODO: add validation, <FormFeedback>
        return !!firstName?.trim() && !!lastName?.trim()
    }

    const okClick = () => {
        if (validate()) {
            setShowModalLocal(false)
            //TODO: Add TypeScript
            callback({
                personId: currentEmployee?.personId ? currentEmployee?.personId : 0,
                employeeNum,
                firstName,
                lastName,
                birthDate,
                employedDate,
                termDate
            }, isAdding)
        }
    }

    const cancelClick = () => {
        setShowModalLocal(false)
        callback(false)
    }

    return (
        <Modal isOpen={showModalLocal} returnFocusAfterClose={false} className='edit-modal'>
            <ModalHeader toggle={() => cancelClick()}>{`${isAdding ? 'Add' : 'Update'} employee`}</ModalHeader>
            <ModalBody>
                <Row>
                    <Label>
                        First Name
                        <Input type='text' name='firstName' id='firstName' aria-label='' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </Label>             
                </Row>
                <Row>
                    <Label>
                        Last Name
                        <Input type='text' name='firstName' id='firstName' aria-label='' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </Label>
                </Row>
                <Row>
                    <Label>
                        Employee number
                        <Input type='number' name='dept' id='dept' aria-label='' value={employeeNum} onChange={(e) => setEmployeeNum(e.target.value)} />
                    </Label>
                </Row>
                <Row>
                    <Label className='date-container'>
                        Birth date
                        <DateSelector value={birthDate} onChange={(value) => setBirthDate(value)} />
                    </Label>
                </Row>
                <Row>
                    <Label className='date-container'>
                        Employed date
                        <DateSelector value={employedDate} onChange={(value) => setEmployedDate(value)} />
                    </Label>                
                </Row>
                <Row>
                    <Label className='date-container'>
                        Terminated date
                        <DateSelector value={termDate} onChange={(value) => setTermDate(value)} defaultValue={null} />
                    </Label>                
                </Row>
                <ModalFooter>
                    <Button id='declineButton' onClick={okClick}>Ok</Button>
                    <Button id='acceptButton' onClick={cancelClick}>Cancel</Button>
                </ModalFooter>
            </ModalBody>
        </Modal>
    )
}
