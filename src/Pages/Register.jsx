import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text, useToast } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
import { Api } from '../Config/Api'

const Register = () => {

    const [show, setShow] = useState(false)
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
            email: '',
            password: ''
        },

        onSubmit: async (values, { resetForm }) => {
            try {
                let { data } = await axios.post(`${Api.url}/auth/register`, values)
                toast({
                    title: data.message,
                    position: 'bottom',
                    status: 'success',
                    duration: 2500,
                    isClosable: true,
                })
                resetForm({ values: '' })
            } catch (error) {
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
                pb="50px"
                w={{ base: "90vw", md: "400px" }}
                bg='rgba(252,241,242,0.6)'
                borderRadius={"10px"}
            >
                <form onSubmit={formik.handleSubmit}>
                    <FormControl display={'flex'}
                        flexDir='column'
                        gap={8}
                        isRequired
                    >
                        <Box mt={7}
                            fontFamily="'Josefin Slab', serif"
                            fontWeight={'bold'}
                        >
                            <Text textAlign={'center'}
                                letterSpacing={4}
                                fontSize={"55px"}>Register</Text>
                        </Box>
                        <Box>
                            <FormLabel>Username</FormLabel>
                            <Input variant='flushed' type='text' placeholder='Enter a username'
                                onChange={formik.handleChange} value={formik.values.username}
                                name='username' />
                        </Box>
                        <Box>
                            <FormLabel>Email</FormLabel>
                            <Input variant='flushed' type='email' placeholder='Enter a email'
                                onChange={formik.handleChange} value={formik.values.email}
                                name='email' />
                        </Box>
                        <Box>
                            <FormLabel>Password</FormLabel>
                            <InputGroup size='md'>
                                <Input variant='flushed'
                                    pr='4.5rem'
                                    type={show ? 'text' : 'password'}
                                    placeholder='Password here . . .'
                                    onChange={formik.handleChange} value={formik.values.password}
                                    name='password'
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
                            <Button
                                type="submit"
                                letterSpacing={2}
                                fontSize={"17px"}
                                _hover={{ bg: "#fff0f2" }}
                                _active={{ bg: "#fff0f2" }}
                                bg={"#fff0f2"}
                                w="100%">Register</Button>
                            <Text textAlign={"center"} mt={2}>Have a account? <Link style={{ textDecoration: "underline" }} to='/login'>Login</Link></Text>
                        </Box>
                    </FormControl>
                </form>
            </Box>
        </Box>
    )
}


export default Register