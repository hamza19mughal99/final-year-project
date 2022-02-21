import React, { useEffect, useState } from 'react'
import { getStudent } from "../../../../services/student"
import { Spinner } from "react-bootstrap";

const Header = () => {

    const [loader, setLoader] = useState(true)
    const [student, setStudent] = useState([])

    useEffect(() => {
        getStudent().then((res) => {
            setStudent(res.data())
            setLoader(false)

        })
    }, [])

    let stuName = <Spinner animation={'border'} />

    if (student && student.name && student.rollNo) {
        stuName = <h4 className='text-capitalize'>{student.name}({student.rollNo})</h4>
    }

    return (
        <>
            <div className='dashboard_header'>
                {
                    stuName
                }
            </div>
        </>
    )
}

export default Header
