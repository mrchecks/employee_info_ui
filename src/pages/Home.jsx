import React, { useEffect, useState } from 'react'
import { DataGrid } from '../components/DataGrid/DataGrid'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'reactstrap'
import _ from 'lodash'
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from '../redux/actions'
import { EditModal } from '../components/EditModal/EditModal'
import './Home.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
//TODO: Add styling to app.

export const Home = () => {
    const [data, setData] = useState()
    const dispatch = useDispatch()
    const employees = useSelector(state => state.employeeReducer.employees)
    const [showEditModal, setShowEditModal] = useState(false)
    const [currentEmployee, setCurrentEmployee] = useState()
    const [isAdding, setIsAdding] = useState(false)

    const editClick = (row) => {
        setCurrentEmployee(_.cloneDeep(row))
        setIsAdding(false)
        setShowEditModal(true)
    }

    const deleteClick = (row) => {
        dispatch(deleteEmployee(row.personId))
    }

    const formatDate = (date) => {
        return date ? new Date(date).toLocaleDateString('en-US') : ''
    }

    const gridColumns = [
        {
            name: 'Employee num',
            selector: row => row.employeeNum,
            sortable: true,
            cell: row => {
                return (
                    <div>{row.employeeNum}</div>
                )
            }
        },
        {
            name: 'First name',
            selector: row => row.firstName,
            sortable: true,
            cell: row => {
                return (
                    <div>{row.firstName}</div>
                )
            }
        },
        {
            name: 'Last name',
            selector: row => row.lastName,
            sortable: true,
            cell: row => {
                return (
                    <div>{row.lastName}</div>
                )
            }
        },
        {
            name: 'Birth date',
            selector: row => row.birthDate,
            sortable: true,
            cell: row => {
                return (
                    <div>{formatDate(row.birthDate)}</div>
                )
            }
        },
        {
            name: 'Employed date',
            selector: row => row.employedDate,
            sortable: true,
            cell: row => {
                return (
                    <div>{formatDate(row.employedDate)}</div>
                )
            }
        },
        {
            name: 'Terminated date',
            selector: row => row.terminatedDate,
            sortable: true,
            cell: row => {
                return (
                    <div>{formatDate(row.terminatedDate)}</div>
                )
            }
        },
       
        {
            cell: row => {
                //TODO: Add confirmation dialog for delete
                return (
                    <div className='button-container'>
                        <div onClick={() => editClick(row)} className='edit-button'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </div>
                        <div onClick={() => deleteClick(row)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </div>
                    </div>
                    
                
                )
            }
        }
    ]

    useEffect(() => {
        dispatch(getEmployees())
    }, [dispatch])

    useEffect(() => {
        setData(_.cloneDeep(employees))
    }, [employees])

    const editCallback = (employee, isAdding) => {
        setShowEditModal(false)
        if (employee) {
            if (isAdding) {
                dispatch(addEmployee(employee))
            } else {
                dispatch(updateEmployee(employee))
            }
        }
    }

    const addClick = () => {
        setCurrentEmployee(null)
        setIsAdding(true)
        setShowEditModal(true)
    }
    
    return (
        <div className='home'>
            <h1>Employee Information</h1>
            <Button id='addButton' onClick={addClick} className='add-button'>Add employee</Button>
            <DataGrid data={data} columns={gridColumns} />
            <EditModal showModal={showEditModal} callback={editCallback} currentEmployee={currentEmployee} isAdding={isAdding} />
        </div>
    )
}