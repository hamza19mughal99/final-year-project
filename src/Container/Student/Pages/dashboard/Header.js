import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { getStudent } from "../../../../services/student"
import {Spinner} from "react-bootstrap";

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

    if(student && student.name && student.rollNo){
      stuName = <h4 className='text-capitalize'>{student.name}({student.rollNo})</h4>
    }

    return (
        <>
        <div className='container-fluid'>
            <div>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" style={{ background: 'white', color: "black", borderRadius: "20px" }}  >
                        <Toolbar>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ display: { xs: 'none', sm: 'block' } }}
                            >
                                {stuName}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
            </div>
            </div>
        </>
    )
}

export default Header
