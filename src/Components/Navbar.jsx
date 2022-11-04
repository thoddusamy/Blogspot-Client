import React from 'react'
import { Avatar, Box, Button, Divider, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react'
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai'
import { ImBlog } from 'react-icons/im'
import { Link, useLocation } from 'react-router-dom'
import { ContextApi } from '../Context/ContextApi'
import { useContext } from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'

const Navbar = () => {

    const context = useContext(ContextApi)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { search } = useLocation()

    const handleLogout = () => {
        localStorage.removeItem("blogspot_auth_token")
        localStorage.removeItem("blogspot_user")
        context.setUserData('')
        context.setAuthToken(false)
    }

    return (
        <Box
            display='flex'
            alignItems={"center"}
            h='60px'
            fontFamily={"'Josefin Slab', serif"}
            fontWeight="bold"
            position='sticky'
            top={0}
            zIndex={100}
            bg="#fff0f2"
            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
            borderBottom={"1.5px solid #FFD700"}
        >
            <Box
                flex={3}
                display={{ base: "none", lg: "flex" }}
                alignItems={"center"}
                justifyContent="center"
                gap={3}
                fontSize="20px"
                cursor={"pointer"}
            >
                <AiFillHome style={{ marginBottom: "5px" }} />
                <Text><Link to='/'>HOME</Link></Text>
            </Box>
            <Box
                flex={1}
                display={{ base: "flex", lg: "none" }}
                alignItems="center"
                justifyContent='center'
            >
                <AiOutlineMenu fontSize={'24px'} onClick={onOpen} />
            </Box>
            <Drawer placement={"top"} onClose={onClose} isOpen={isOpen} size="xs">
                <DrawerOverlay />
                <DrawerContent bg={"#fff0f2"} fontFamily="'Varela Round', sans-serif">
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>BLOG SPOT</DrawerHeader>
                    <DrawerBody>
                        <Box>
                            <Box
                                my={2} letterSpacing={2}>
                                <Link to='/'><Text fontWeight={'bold'}>HOME</Text></Link>
                            </Box>
                            <Divider borderBottomColor={"#d3d3d3"} />
                            <Box
                                my={2} letterSpacing={2}>
                                <Text fontWeight={'bold'}>CATEGORIES</Text>
                            </Box>
                            <Box>
                                <Button bg="#fff0f2" boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
                                    _hover={{ bg: "#fff0f2" }} _active={{ bg: "#fff0f2" }}
                                    ml={3} mb={4}
                                    color={search === "?category=tech" ? "red" : ""}
                                >
                                    <Link to={`/?category=tech`}>TECH</Link>
                                </Button>
                                <Button bg="#fff0f2" boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
                                    _hover={{ bg: "#fff0f2" }} _active={{ bg: "#fff0f2" }}
                                    ml={3} mb={4}
                                    color={search === "?category=music" ? "red" : ""}
                                >
                                    <Link to={`/?category=music`}>MUSIC</Link>
                                </Button>
                                <Button bg="#fff0f2" boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
                                    _hover={{ bg: "#fff0f2" }} _active={{ bg: "#fff0f2" }}
                                    ml={3} mb={4}
                                    color={search === "?category=style" ? "red" : ""}
                                >
                                    <Link to={`/?category=style`}>STYLE</Link>
                                </Button>
                                <Button bg="#fff0f2" boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
                                    _hover={{ bg: "#fff0f2" }} _active={{ bg: "#fff0f2" }}
                                    ml={3} mb={4}
                                    color={search === "?category=cinema" ? "red" : ""}
                                >
                                    <Link to={`/?category=cinema`}>CINEMA</Link>
                                </Button>
                                <Button bg="#fff0f2" boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
                                    _hover={{ bg: "#fff0f2" }} _active={{ bg: "#fff0f2" }}
                                    ml={3} mb={4}
                                    color={search === "?category=foods" ? "red" : ""}
                                >
                                    <Link to={`/?category=foods`}>FOODS</Link>
                                </Button>
                                <Button bg="#fff0f2" boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
                                    _hover={{ bg: "#fff0f2" }} _active={{ bg: "#fff0f2" }}
                                    ml={3} mb={4}
                                    color={search === "?category=sports" ? "red" : ""}
                                >
                                    <Link to={`/?category=sports`}>SPORTS</Link>
                                </Button>
                            </Box>
                            <Box display={context.authToken ? "none" : 'block'}
                            >
                                <Divider borderBottomColor={"#d3d3d3"} />
                                <Box my={5}
                                    display='flex'
                                    flexDir={'column'}
                                    gap={3}
                                >
                                    <Button letterSpacing={2} as={Link} to='/login'
                                        bg="#fff0f2" boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
                                        _hover={{ bg: "#fff0f2" }} _active={{ bg: "#fff0f2" }}
                                    >LOGIN</Button>
                                    <Button letterSpacing={2} as={Link} to='/register'
                                        bg="#fff0f2" boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
                                        _hover={{ bg: "#fff0f2" }} _active={{ bg: "#fff0f2" }}
                                    >REGISTER</Button>
                                </Box>
                            </Box>
                        </Box>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <Box
                flex={6}
                display="flex"
                alignItems={"center"}
                justifyContent="center"
                cursor={"pointer"}
                gap={3}
            >
                <ImBlog fontSize={"30px"} />
                <Text fontSize={{ base: "20px", md: "2xl" }}
                    fontFamily="'Lora', serif"
                >
                    BLOG SPOT
                </Text>
            </Box>
            <Box
                flex={{ base: 1, md: 3 }}
                display={context.authToken ? "flex" : { base: "none", lg: "flex" }}
                alignItems={"center"}
                justifyContent="center"
                cursor={"pointer"}
            >
                <Box display={{ base: 'none', md: 'flex' }}>
                    <Text textTransform={'uppercase'}
                    >{context.userData?.username}</Text>
                </Box>
                {
                    context.authToken ? <Box>
                        <Menu>
                            <MenuButton as={Button}
                                bg="#fff0f2"
                                _hover={{ bg: "#fff0f2" }}
                                _active={{ bg: "#fff0f2" }}
                            >
                                <Avatar src={context.userData && context.userData.profile_pic} size={'sm'} />
                            </MenuButton>
                            <MenuList bg="#fff0f2"
                                boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
                            >
                                <Box ml={3} my={2}
                                    display={{ base: 'block', md: "none" }}>
                                    <Text textTransform={'uppercase'}>Hello, {context.userData?.username}</Text>
                                </Box>
                                <MenuItem as={Link} to='/profile'
                                    fontWeight={'bold'}
                                    letterSpacing={1}
                                >
                                    UPDATE PROFILE
                                </MenuItem>
                                <MenuItem as={Link} to='/writeblog'
                                    fontWeight={'bold'}
                                    letterSpacing={1}
                                >
                                    WRITE BLOG
                                </MenuItem>
                                <MenuItem
                                    fontWeight={'bold'}
                                    letterSpacing={1}
                                    onClick={handleLogout}
                                >
                                    LOGOUT
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Box> : <Box display={{ base: "none", lg: "flex" }}
                        alignItems='center'
                        gap={5} fontSize="20px"
                    >
                        <Link to='/login'>LOGIN</Link>
                        <Link to='/register'>REGISTER</Link>
                    </Box>
                }
            </Box>
        </Box >
    )
}

export default Navbar