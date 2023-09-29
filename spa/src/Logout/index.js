/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const history = useNavigate();
    useEffect(() => {
        history('/signin');
        localStorage.removeItem('user');
        localStorage.removeItem('employeeId');
        setTimeout(() => {
            window.location.reload();
        }, 100)
    }, [])
    return (<></>);
}