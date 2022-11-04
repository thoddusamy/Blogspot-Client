import { Box } from '@chakra-ui/react'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import ViewSinglePost from '../Components/ViewSinglePost'
import { Api } from '../Config/Api'
import { ContextApi } from '../Context/ContextApi'

const ViewPost = () => {

    const { postid } = useParams()
    const [singlePostData, setSinglePostData] = useState({})
    const [updatedTitle, setUpdatedTitle] = useState('')
    const [updatedDesc, setUpdatedDesc] = useState('')

    const context = useContext(ContextApi)

    const fetchSinglePost = async () => {
        try {
            let { data } = await axios.get(`${Api.url}/post/${postid}`)
            setSinglePostData(data);
            setUpdatedTitle(data.title)
            setUpdatedDesc(data.desc)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchSinglePost()
        const auth_token = localStorage.getItem("blogspot_auth_token")
        if (auth_token) {
            context.setAuthToken(true)
        } else {
            context.setAuthToken(false)
        }
    }, [])

    return (
        <Box display='flex'
            flexDir={{ base: "column", lg: 'row' }}
            mt={5}
        >
            <Sidebar />
            <ViewSinglePost singlePostData={singlePostData}
                updatedTitle={updatedTitle} setUpdatedTitle={setUpdatedTitle}
                updatedDesc={updatedDesc} setUpdatedDesc={setUpdatedDesc}
                fetchSinglePost={fetchSinglePost} />
        </Box>
    )
}

export default ViewPost