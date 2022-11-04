import React, { useState, useEffect, useContext } from 'react'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import Posts from '../Components/Posts'
import { Box } from '@chakra-ui/react'
import axios from 'axios'
import { Api } from '../Config/Api'
import { useLocation } from 'react-router-dom'
import { ContextApi } from '../Context/ContextApi'

const Home = () => {

    const { search } = useLocation()
    const context = useContext(ContextApi)

    const [postsData, setPostData] = useState()

    const fetchAllPosts = async () => {
        try {
            let { data } = await axios.get(`${Api.url}/post` + search)
            console.log(data);
            setPostData(data)
        } catch (error) {
            console.log(error);
        }
    }

    const FetchUserDetails = async () => {
        try {
            let { data } = await axios.get(`${Api.url}/users/getuserbyid`, {
                headers: {
                    Authorization: localStorage.getItem("blogspot_auth_token")
                }
            })
            context.setUserData(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAllPosts()
        const auth_token = localStorage.getItem("blogspot_auth_token")
        if (auth_token) {
            FetchUserDetails()
            context.setAuthToken(true)
        } else {
            context.setAuthToken(false)
        }
        const user = JSON.parse(localStorage.getItem("blogspot_user"))
        context.setUserData(user)
    }, [search])

    return (
        <div>
            <Header />
            <Box display={"flex"}
                flexDir={{ base: "column", lg: 'row' }}
                mt={5}
            >
                <Sidebar />
                <Posts postsData={postsData} />
            </Box>
        </div>
    )
}

export default Home