import {
    Box,
    Button,
    Image,
    Input,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    useToast,
} from '@chakra-ui/react'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContextApi } from '../Context/ContextApi'
import axios from 'axios'
import { Api } from '../Config/Api'

const ViewSinglePost = ({
    singlePostData,
    updatedTitle,
    setUpdatedTitle,
    updatedDesc,
    setUpdatedDesc,
    fetchSinglePost,
}) => {
    const context = useContext(ContextApi)
    const navigate = useNavigate()
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [deletepost, setDeletePost] = useState(false)
    const [updateMode, setUpdateMode] = useState(false)

    if (deletepost) {
        const deleteSinglePost = async () => {
            try {
                let { data } = await axios.delete(
                    `${Api.url}/post/deletepost/${singlePostData._id}/${singlePostData.username}`,
                    {
                        headers: {
                            Authorization: localStorage.getItem('blogspot_auth_token'),
                        },
                    }
                )
                toast({
                    title: data.message,
                    position: 'bottom',
                    status: 'success',
                    duration: 2500,
                    isClosable: true,
                })
                navigate('/')
            } catch (error) {
                console.log(error)
                toast({
                    title: error.response.data.message,
                    position: 'bottom',
                    status: 'error',
                    duration: 2500,
                    isClosable: true,
                })
            }
        }
        deleteSinglePost()
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
        const auth_token = localStorage.getItem("blogspot_auth_token")
        if (auth_token) {
            FetchUserDetails()
            context.setAuthToken(true)
        } else {
            context.setAuthToken(false)
        }
        const user = JSON.parse(localStorage.getItem("blogspot_user"))
        context.setUserData(user)
    }, [])

    const handleUpdatePost = async (id) => {
        try {
            let { data } = await axios.put(
                `${Api.url}/post/updatepost/${id}/${singlePostData.username}`,
                {
                    title: updatedTitle,
                    desc: updatedDesc,
                },
                {
                    headers: {
                        Authorization: localStorage.getItem('blogspot_auth_token'),
                    },
                }
            )
            toast({
                title: data.message,
                position: 'bottom',
                status: 'success',
                duration: 2500,
                isClosable: true,
            })
            setUpdateMode(false)
            fetchSinglePost()
        } catch (error) {
            console.log(error)
            toast({
                title: error.response.data.message,
                position: 'bottom',
                status: 'error',
                duration: 2500,
                isClosable: true,
            })
        }
    }

    return (
        <>
            <Box flex={{ base: 12, md: 8, lg: 8, xl: 9 }}
                mt={4}
                display='flex'
                justifyContent='center'
            >
                <Box w='85%'>
                    <Image
                        w={'100%'}
                        h={{ base: 'auto', md: "auto", lg: '500px' }}
                        maxH="500px"
                        objectFit={'cover'}
                        borderRadius='5px'
                        src={singlePostData?.image}
                    />
                    {/* ------------- post title -------------- */}
                    <Box
                        display='flex'
                        flexDir={{ base: 'column', md: 'row' }}
                        alignItems={'flex-start'}
                        justifyContent='space-between'
                        mt={5}
                    >
                        {updateMode ? (
                            <Box w='100%'>
                                <Input
                                    fontFamily={"'Varela Round', sans-serif"}
                                    variant='flushed'
                                    size='lg'
                                    type='text'
                                    placeholder='Title here . . .'
                                    autoFocus
                                    onChange={(e) => setUpdatedTitle(e.target.value)}
                                    value={updatedTitle}
                                    name='title'
                                />
                            </Box>
                        ) : (
                            <Text
                                fontSize={{ base: "2xl", lg: '3xl' }}
                                fontFamily="'Varela Round', sans-serif"
                                flex={{ base: 12, md: 10 }}
                            >
                                {singlePostData?.title}
                            </Text>
                        )}
                        {singlePostData?.username === context.userData?.username && (
                            <Box display='flex'
                                justifyContent='flex-end'
                                flex={{ base: 12, md: 2 }}
                                gap={3} my={{ base: 3, md: 0 }}>
                                {updateMode ? (
                                    <Button
                                        size={'sm'}
                                        bg='green.400'
                                        borderRadius='3px'
                                        color='white'
                                        _hover={{ bg: 'green' }}
                                        onClick={() => handleUpdatePost(singlePostData._id)}
                                    >
                                        Update
                                    </Button>
                                ) : (
                                    <Button
                                        size={'sm'}
                                        bg='green.300'
                                        _hover={{ bg: 'green.400' }}
                                        borderRadius='3px'
                                        onClick={() => setUpdateMode(true)}
                                    >
                                        Edit
                                    </Button>
                                )}
                                {updateMode ? (
                                    <Button
                                        size={'sm'}
                                        bg='red.400'
                                        _hover={{ bg: 'red.500' }}
                                        borderRadius='3px'
                                        onClick={() => setUpdateMode(false)}
                                    >
                                        Cancel
                                    </Button>
                                ) : (
                                    <Button
                                        size={'sm'}
                                        bg='red.400'
                                        _hover={{ bg: 'red.500' }}
                                        borderRadius='3px'
                                        onClick={onOpen}
                                    >
                                        Delete
                                    </Button>
                                )}
                            </Box>
                        )}
                    </Box>
                    {/* ------------- post author & date -------------- */}
                    <Box
                        display='flex'
                        alignItems={'center'}
                        justifyContent='space-between'
                        fontFamily={"'Lora', serif"}
                        mt={2}
                        color='yellow.500'
                    >
                        <Text>
                            Author:{' '}
                            <Link to={`/?user=${singlePostData.username}`}>
                                {singlePostData?.username}
                            </Link>
                        </Text>
                        <Text>{new Date(singlePostData?.updatedAt).toDateString()}</Text>
                    </Box>
                    {/* ------------- post desc -------------- */}
                    {updateMode ? (
                        <Box my={8}>
                            <textarea
                                style={{
                                    width: '100%',
                                    background: 'transparent',
                                    border: '2px solid #e3e3e3',
                                    borderRadius: '5px',
                                    outline: 'none',
                                    fontFamily: "'Varela Round', sans-serif",
                                    padding: '10px 0 0 10px',
                                }}
                                name='desc'
                                cols='30'
                                rows='10'
                                placeholder='Descripition here . . .'
                                onChange={(e) => setUpdatedDesc(e.target.value)}
                                value={updatedDesc}
                            ></textarea>
                        </Box>
                    ) : (
                        <Box mt={5}>
                            <Text
                                fontFamily={"'Varela Round', sans-serif"}
                                lineHeight={8}
                                textAlign='justify'
                                mb={8}
                            >
                                {singlePostData?.desc}
                            </Text>
                        </Box>
                    )}
                </Box>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg='#fff0f2'>
                    <ModalHeader>Are you sure to Delete this post?</ModalHeader>
                    <ModalCloseButton />
                    <ModalFooter>
                        <Button
                            colorScheme='green'
                            mr={3}
                            onClick={() => setDeletePost(true)}
                        >
                            Delete
                        </Button>
                        <Button colorScheme='red' onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ViewSinglePost
