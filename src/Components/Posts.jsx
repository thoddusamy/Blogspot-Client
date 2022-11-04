import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import Post from './Post'

const Posts = ({ postsData }) => {
    return (
        <Box
            flex={{ base: 12, md: 8, lg: 8, xl: 9 }}
            display="flex"
            justifyContent={{ base: 'center', lg: 'flex-start' }}
            flexWrap={"wrap"}
        >
            {
                postsData?.length !== 0 ? postsData?.map((post) => {
                    return <Post key={post._id} post={post} />
                }) : <Text mt={3} fontSize={'2xl'}
                    fontFamily={"'Varela Round', sans-serif"}
                    textAlign='center'
                >
                    No Posts found
                </Text>
            }
        </Box>
    )
}

export default Posts