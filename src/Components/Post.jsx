import { Box, Divider, Image, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Api } from '../Config/Api'
import { ContextApi } from '../Context/ContextApi'

const Post = ({ post }) => {

    return (
        <Box w='450px' margin={'0px 25px 40px 25px'} mt={4}>
            {/* ---------- post image ----------- */}
            <Link to={`/post/${post._id}`}>
                <Image
                    w={'100%'}
                    h={{ base: 'auto', md: "auto", lg: '280px' }}
                    maxH="280px"
                    objectFit={'cover'}
                    borderRadius='5px'
                    src={post.image}
                />
            </Link>
            {/* ---------- post info ----------- */}
            <Box display={'flex'} flexDir='column' justifyContent={'center'}>
                <Box
                    mt={2}
                    display={'flex'}
                    justifyContent={'flex-start'}
                    gap={3}
                    fontFamily="'Lora', serif"
                    color={'yellow.500'}
                >
                    {
                        post?.category.map((cat) => <Text key={cat} textTransform={"capitalize"}>{cat}</Text>)
                    }
                </Box>
                {/* ---------- post title ----------- */}
                <Link to={`/post/${post._id}`}>
                    <Text
                        fontSize={'20px'}
                        fontFamily="'Varela Round', sans-serif"
                        mt={2}
                        mb={1}
                    >
                        {post.title}
                    </Text>
                </Link>
                {/* ---------- post title ----------- */}
                <Text className='post_desc'>
                    {post.desc}
                </Text>
                <Divider />
                {/* ---------- post time ----------- */}
                <Text
                    textAlign={'end'}
                    mt={2}
                    fontFamily="'Lora', serif"
                    color={'yellow.500'}
                >
                    {new Date(post.updatedAt).toDateString()}
                </Text>
            </Box>
        </Box>
    )
}

export default Post