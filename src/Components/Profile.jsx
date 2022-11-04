import { Box, Button, FormControl, FormLabel, Image, Input, InputGroup, InputRightElement, Text, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { HiOutlineUpload } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { Api } from '../Config/Api'
import { ContextApi } from '../Context/ContextApi'

const Profile = () => {

    const context = useContext(ContextApi)
    const navigate = useNavigate()
    const toast = useToast()

    const [show, setShow] = useState(false)
    const [file, setFile] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [userData, setUserData] = useState({})
    const [preview, setPreview] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
    const handleClick = () => setShow(!show)

    const FetchUserDetails = async () => {
        try {
            let { data } = await axios.get(`${Api.url}/users/getuserbyid`, {
                headers: {
                    Authorization: localStorage.getItem("blogspot_auth_token")
                }
            })
            setUserData(data)
            context.setUserData(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        FetchUserDetails()
        const user = JSON.parse(localStorage.getItem("blogspot_user"))
        context.setUserData(user)
        const auth_token = localStorage.getItem("blogspot_auth_token")
        if (auth_token) {
            context.setAuthToken(true)
        } else {
            context.setAuthToken(false)
            navigate('/')
        }
    }, [])

    const handleUploadImg = (pic) => {
        setIsLoading(true)
        if (pic === undefined) {
            toast({
                title: "Please select a pic",
                status: 'error',
                position: "top-right",
                duration: 3500,
                isClosable: true,
            })
            return;
        }
        if (pic.type === "image/jpeg" || pic.type === "image/png") {
            const data = new FormData()
            data.append("file", pic)
            data.append("upload_preset", "blog-app")
            data.append("cloud_name", "thoddusamy")
            fetch("https://api.cloudinary.com/v1_1/thoddusamy/image/upload", {
                method: "post",
                body: data
            }).then((res) => res.json()).then((data) => {
                setFile(data.url.toString())
                setPreview(data.url.toString())
            }).catch((error) => {
                console.log(error);
            })
            setIsLoading(false)
        } else {
            setIsLoading(false)
            toast({
                title: 'Invalid file format',
                status: 'error',
                position: "top-right",
                duration: 3500,
                isClosable: true,
            })
            return
        }
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            profile_pic: ''
        },

        onSubmit: async (values, { resetForm }) => {
            setIsLoading(true)
            values.profile_pic = file
            try {
                let { data } = await axios.put(`${Api.url}/users/updateprofile`, values, {
                    headers: {
                        Authorization: localStorage.getItem("blogspot_auth_token")
                    }
                })
                console.log(values);
                toast({
                    title: data.message,
                    position: 'bottom',
                    status: 'success',
                    duration: 2500,
                    isClosable: true,
                })
                resetForm({ values: '' })
                setIsLoading(false)
                navigate('/')
            } catch (error) {
                setIsLoading(false)
                console.log(error);
                toast({
                    title: error.response.data.message,
                    position: 'bottom',
                    status: 'error',
                    duration: 2500,
                    isClosable: true,
                })
            }
        }
    })

    return (
        <Box w={'100vw'}
            h='90vh'
            display={'flex'}
            alignItems='center'
            justifyContent={'center'}
        >
            <Box
                bg='#fff0f2'
                w={"80vw"}
                pb={{ base: "40px", lg: '0px' }}
                h={{ base: 'auto', lg: "80vh" }}
                px={10}
                boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
            >
                <Text fontSize={'3xl'}
                    color='green'
                    py={5}
                >
                    UPDATE PROFILE
                </Text>
                <Box>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <Box display={'flex'}
                                alignItems='center'
                                gap={5}
                            >
                                <Image w='100px' h='100px'
                                    objectFit='cover'
                                    src={userData?.profile_pic ? userData.profile_pic : preview} />
                                <Button as={FormLabel} htmlFor="upload_pic"
                                    bg={"green"}
                                    _hover={{ bg: "green" }}
                                    _active={{ bg: "green" }}
                                    color="white"
                                    cursor='pointer'
                                    borderRadius={"5px"}>
                                    <HiOutlineUpload fontSize={"20px"} />
                                </Button>
                                <Input type='file' display={"none"} id="upload_pic"
                                    onChange={(e) => handleUploadImg(e.target.files[0])} />
                            </Box>
                            <Box mt={5}>
                                <FormLabel m={0}>Username</FormLabel>
                                <Input variant='flushed' type='text' placeholder='Username here . . .'
                                    onChange={formik.handleChange} value={formik.values.username} name='username'
                                    isRequired />
                            </Box>
                            <Box mt={5}>
                                <FormLabel m={0}>Email</FormLabel>
                                <Input variant='flushed' type='email' placeholder='Email here . . .'
                                    onChange={formik.handleChange} value={formik.values.email} name='email'
                                    isRequired />
                            </Box>
                            <Box mt={5}>
                                <FormLabel m={0}>Password</FormLabel>
                                <InputGroup size='md'>
                                    <Input variant='flushed'
                                        pr='4.5rem'
                                        type={show ? 'text' : 'password'}
                                        placeholder='Password here . . .'
                                        onChange={formik.handleChange} value={formik.values.password}
                                        name='password' isRequired />
                                    <InputRightElement width='4.5rem'>
                                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                                            {show ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </Box>
                            <Box mt={5}>
                                <Button type='submit'
                                    isLoading={isLoading}
                                    bg={"green"}
                                    _hover={{ bg: "green" }}
                                    _active={{ bg: "green" }}
                                    color="white"
                                >
                                    Update
                                </Button>
                            </Box>
                        </FormControl>
                    </form>
                </Box>
            </Box>
        </Box>
    )
}

export default Profile