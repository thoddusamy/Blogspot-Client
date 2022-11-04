import { Box, Button, Checkbox, FormControl, FormLabel, Image, Input, Stack, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { BsFillPlusSquareFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { Api } from '../Config/Api'
import { ContextApi } from '../Context/ContextApi'

const WritePost = () => {

    const navigate = useNavigate()
    const context = useContext(ContextApi)
    const toast = useToast()
    const [file, setFile] = useState()
    const [isLoading, setIsLoading] = useState(false)

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
        const user = JSON.parse(localStorage.getItem("blogspot_user"))
        context.setUserData(user)
        const auth_token = localStorage.getItem("blogspot_auth_token")
        if (auth_token) {
            FetchUserDetails()
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
            title: '',
            desc: '',
            image: '',
            username: '',
            category: []
        },

        onSubmit: async (values, { resetForm }) => {
            setIsLoading(true)
            const { username } = JSON.parse(localStorage.getItem("blogspot_user"))
            let categories = []
            let category = document.getElementsByName('category')
            category.forEach((cat) => {
                if (cat.checked) {
                    categories.push(cat.value)
                }
            })
            values.category = categories
            values.username = username
            values.image = file
            try {
                let { data } = await axios.post(`${Api.url}/post/createpost`, values, {
                    headers: {
                        Authorization: localStorage.getItem("blogspot_auth_token")
                    }
                })
                setIsLoading(false)
                toast({
                    title: data.message,
                    position: 'bottom',
                    status: 'success',
                    duration: 2500,
                    isClosable: true,
                })
                navigate(`/post/${data.post._id}`)
                resetForm({ values: '' })
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
        <Box display="flex"
            flexDir='column'
            alignItems={'center'}
            justifyContent="center"
            my={10}
        >
            <Box w={{ base: '90vw', lg: "70vw" }}>
                <Box>
                    {
                        file && (
                            <Image w="100%" h={{ base: 'auto', md: "auto", lg: '250px' }}
                                maxH="250px"
                                boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
                                borderRadius="5px"
                                src={file} />
                        )
                    }
                </Box>
                <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
                    <FormControl mt={5} w="100%">
                        <Box display='flex'
                            alignItems='center'
                            gap={2}
                        >
                            <Box>
                                <FormLabel htmlFor='file_upload'>
                                    <BsFillPlusSquareFill color='green' fontSize={"35px"} />
                                </FormLabel>
                                <Input type='file' id="file_upload" style={{ display: "none" }}
                                    onChange={(e) => handleUploadImg(e.target.files[0])} />
                            </Box>
                            <Box w="100%">
                                <Input fontFamily={"'Varela Round', sans-serif"}
                                    variant='flushed'
                                    size="lg"
                                    type='text'
                                    placeholder='Title here . . .' autoFocus
                                    onChange={formik.handleChange}
                                    value={formik.values.title}
                                    name='title' />
                            </Box>
                        </Box>
                        <Box mt={8} ml={{ base: "10px", lg: "55px" }} w="100%">
                            <textarea style={{
                                width: "95%",
                                background: 'transparent',
                                border: "2px solid #e3e3e3",
                                borderRadius: "5px",
                                outline: 'none',
                                fontFamily: "'Varela Round', sans-serif",
                                padding: "10px 0 0 10px"
                            }}
                                name="desc" cols="30" rows="10"
                                placeholder='Descripition here . . .'
                                onChange={formik.handleChange}
                                value={formik.values.desc}></textarea>
                        </Box>
                        <Box mt={3} ml={{ base: "10px", lg: "55px" }}>
                            <FormLabel color={"gray"}>Select Categories</FormLabel>
                            <Stack spacing={5} direction={{ base: 'column', lg: 'row' }}>
                                <Checkbox colorScheme='green' value='tech' name='category'>
                                    Tech
                                </Checkbox>
                                <Checkbox colorScheme='green' value='music' name='category'>
                                    Music
                                </Checkbox>
                                <Checkbox colorScheme='green' value='style' name='category'>
                                    Style
                                </Checkbox>
                                <Checkbox colorScheme='green' value='cinema' name='category'>
                                    Cinema
                                </Checkbox>
                                <Checkbox colorScheme='green' value='foods' name='category'>
                                    Foods
                                </Checkbox>
                                <Checkbox colorScheme='green' value='sports' name='category'>
                                    Sports
                                </Checkbox>
                            </Stack>
                        </Box>
                        <Box w="100%"
                            display='flex'
                            justifyContent='flex-end'
                        >
                            <Button isLoading={isLoading}
                                type='submit'
                                bg='green' color={'white'}
                                borderRadius={0} w="100px"
                                mt={2}
                                fontSize="20px"
                                _hover={{ bg: "green" }}>Post</Button>
                        </Box>
                    </FormControl>
                </form>
            </Box>
        </Box>
    )
}

export default WritePost