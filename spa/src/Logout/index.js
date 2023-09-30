/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";

export default function Logout() {
    useEffect(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('employeeId');
        localStorage.clear();
        setTimeout(() => {
            window.location.reload();
        }, 200)
    }, [])
    return (<></>);
}