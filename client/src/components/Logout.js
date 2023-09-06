import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../App';


const Logout = () => {
    const { state, dispatch } = useContext(userContext)
    const navigate = useNavigate();

    // Send cookie and token to clear
    useEffect(() => {
        fetch('/logout', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((res) => {
            dispatch({type:'USER',payload:false})
            navigate('/login', { replace: true })

            if (res.status !== 200) {
                const error = new Error(res.error);
                throw error;
            }

        }).catch((error) => {
            console.log(error)
        })

    }, [navigate])


    return (
        <>
            <h1>Logged out</h1>
        </>
    )
}

export default Logout