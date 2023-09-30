/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function Logout() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('employeeId');
        localStorage.clear();
        setTimeout(() => {
            setLoading(false);
        }, 500)
    }, [])
    return (<>{
        loading ? ('Cerrando sesión...') : (<Button size="large" sx={{ p: 5, m: 5 }}><Link to={"/"}>{"Regresar"}</Link></Button>
        )
    }</>);
}