import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import Natural_0 from '../assets/natural_0.jpg'

const Header = () => {
    return (
        <Box mt={{ base: "40px", lg: "80px" }}
            display={"flex"}
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            position="relative"
        >
            <Box
                display={"flex"}
                alignItems="center"
                justifyContent="center"
                position={"absolute"}
                top={{ base: "-25px", lg: "-40px" }}
            >
                <Text fontSize={{ base: "65px", lg: '80px' }}
                    fontFamily="'Lora', serif"
                >Welcome</Text>
            </Box>
            <Image mt={"30px"}
                objectFit="cover"
                w="100%"
                h="350px"
                src={Natural_0} />
        </Box>
    )
}

export default Header