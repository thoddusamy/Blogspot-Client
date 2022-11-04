import { Box, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {

    const { search } = useLocation()

    return (
        <Box
            display={{ base: "none", lg: "flex" }}
            alignItems={"flex-start"}
            justifyContent="center"
            flex={{ base: 12, md: 4, lg: 4, xl: 3 }}
            my={4}
        >
            <Box
                display="flex"
                alignItems={"center"}
                flexDir="column"
                justifyContent="center"
                bg="#fff0f2"
                boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
                w="250px"
                borderRadius={"5px"}
                position="sticky"
                top={"12%"} href='/'
            >
                <Box mt={5}
                    w="100%"
                    py={2}
                    borderTopWidth={"2px"}
                    borderTopColor={"#FFD700"}
                    borderBottomWidth={"2px"}
                    borderBottomColor={"#FFD700"}
                    textAlign='center'
                >
                    <Text fontSize={"20px"}
                        fontFamily="'Varela Round', sans-serif"
                    >
                        CATEGORIES
                    </Text>
                </Box>
                <Box my={5}>
                    <UnorderedList spacing={3}
                        letterSpacing={2}
                        fontFamily={"'Varela Round', sans-serif"}
                        cursor="pointer">
                        <ListItem _hover={{ textDecoration: "underline" }}
                            color={search === "?category=tech" ? "red" : ""}
                        >
                            <Link to={`/?category=tech`}>TECH</Link>
                        </ListItem>
                        <ListItem _hover={{ textDecoration: "underline" }}
                            color={search === "?category=music" ? "red" : ""}
                        >
                            <Link to={`/?category=music`}>MUSIC</Link>
                        </ListItem>
                        <ListItem _hover={{ textDecoration: "underline" }}
                            color={search === "?category=style" ? "red" : ""}
                        >
                            <Link to={`/?category=style`}>STYLE</Link>
                        </ListItem>
                        <ListItem _hover={{ textDecoration: "underline" }}
                            color={search === "?category=cinema" ? "red" : ""}
                        >
                            <Link to={`/?category=cinema`}>CINEMA</Link>
                        </ListItem>
                        <ListItem _hover={{ textDecoration: "underline" }}
                            color={search === "?category=foods" ? "red" : ""}
                        >
                            <Link to={`/?category=foods`}>FOODS</Link>
                        </ListItem>
                        <ListItem _hover={{ textDecoration: "underline" }}
                            color={search === "?category=sports" ? "red" : ""}
                        >
                            <Link to={`/?category=sports`}>SPORTS</Link>
                        </ListItem>
                    </UnorderedList>
                </Box>
            </Box>
        </Box >
    )
}

export default Sidebar