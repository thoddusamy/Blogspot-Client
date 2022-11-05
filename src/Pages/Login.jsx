import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Api } from '../Config/Api'

const Login = () => {

    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const handleClick = () => setShow(!show)

    const toast = useToast()
    const navigate = useNavigate()

    useEffect(() => {
        let token = localStorage.getItem("blogspot_auth_token")
        if (token) {
            navigate('/')
        }
    }, [])

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },

        onSubmit: async (values, { resetForm }) => {
            try {
                setIsLoading(true)
                let { data } = await axios.post(`${Api.url}/auth/login`, values)
                localStorage.setItem("blogspot_auth_token", data.token)
                localStorage.setItem("blogspot_user", JSON.stringify(data.user))
                toast({
                    title: data.message,
                    position: 'bottom',
                    status: 'success',
                    duration: 2500,
                    isClosable: true,
                })
                resetForm({ values: '' })
                navigate('/')
                setIsLoading(false)
            } catch (error) {
                console.log(error);
                toast({
                    title: error.response.data.message,
                    position: 'bottom',
                    status: 'error',
                    duration: 2500,
                    isClosable: true,
                })
                setIsLoading(false)
            }
        }
    })

    return (
        <Box className='LoginRegister'
            w={"100%"}
            h="91.5vh"
            display='flex'
            alignItems='center'
            justifyContent='center'
        >
            <Box
                display='flex'
                alignItems='flex-start'
                justifyContent='center'
                h='auto'
                pb={"50px"}
                w={{ base: "90vw", md: "400px" }}
                bg='rgba(252,241,242,0.6)'
                borderRadius={"10px"}
            >
                <form onSubmit={formik.handleSubmit}>
                    <FormControl display={'flex'}
                        flexDir='column'
                        gap={10} isRequired
                    >
                        <Box mt={'50px'}
                            fontFamily="'Josefin Slab', serif"
                            fontWeight={'bold'}
                        >
                            <Text textAlign={'center'}
                                letterSpacing={4}
                                fontSize={"55px"}>Login</Text>
                        </Box>
                        <Box mt={5}>
                            <FormLabel>Username</FormLabel>
                            <Input variant='flushed' type='text' placeholder='Username here . . .'
                                onChange={formik.handleChange} value={formik.values.username = "demo_user"}
                                name="username" />
                        </Box>
                        <Box>
                            <FormLabel>Password</FormLabel>
                            <InputGroup size='md'>
                                <Input variant='flushed'
                                    pr='4.5rem'
                                    type={show ? 'text' : 'password'}
                                    placeholder='Password here . . .'
                                    onChange={formik.handleChange} value={formik.values.password = "123456789"}
                                    name="password"
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button _hover={{ bg: "#fff0f2" }}
                                        _active={{ bg: "#fff0f2" }}
                                        bg={"#fff0f2"} h='1.75rem' size='sm' onClick={handleClick}>
                                        {show ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </Box>
                        <Box>
                            <Button isLoading={isLoading}
                                type="submit"
                                letterSpacing={2}
                                fontSize={"17px"}
                                _hover={{ bg: "#fff0f2" }}
                                _active={{ bg: "#fff0f2" }}
                                bg={"#fff0f2"}
                                w="100%">Login</Button>
                            <Text textAlign={"center"} mt={2}>Not account? <Link style={{ textDecoration: "underline" }} to='/register'>Register</Link></Text>
                        </Box>
                    </FormControl>
                </form>
            </Box>
        </Box>
    )
}

export default Login