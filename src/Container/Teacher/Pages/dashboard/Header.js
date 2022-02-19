import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {getTeacher} from "../../../../services/teachers";
import {useEffect, useState} from "react";
import {Spinner} from "react-bootstrap";

const Header = () => {

    const [loader, setLoader] = useState(true)
    const [teacher, setTeacher] = useState([])

    useEffect(() => {
        getTeacher().then((res) => {
            setTeacher(res.data())
            setLoader(false)
        })
    }, [])

    return (
            <div>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" style={{ background: 'white', color: "black" }}  >
                        <Toolbar>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ display: { xs: 'none', sm: 'block' } }}
                            >
                                { loader ? <Spinner animation={'border'} /> : <h4 className='text-capitalize'>{teacher.name} (id: {teacher.id})</h4>}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
            </div>
    )
}

export default Header
