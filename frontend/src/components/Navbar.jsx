import { Box, Text, Container, Flex, HStack, Button, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";




function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();
    
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex 
        h={16}  
        alignItems={"center"} 
        justifyContent={"space-between"}
        flexDir={{
            base: "column",
            sm: "row"
        }}>
       <Text
            bgGradient={'linear(to-l, #7928CA, #FF0080)'}
            bgClip={"text"}
            fontSize={{base: "22", sm: "28" }}
            fontWeight='bold'
            textAlign={"center"}
            textTransform={"uppercase"}
        
       >
        <Link to={"/"}>Artsy 
        
        </Link>
       </Text>

       <HStack spacing={2} alignItems={"center"}>
            <Link to="/create">
                <Button>
                  <PlusSquareIcon fontSize={20} />

                </Button>
            </Link>

            <Button onClick={toggleColorMode}>
                {colorMode  === "light" ? <IoMoon /> : <LuSun /> }
            </Button>
        </HStack>

      </Flex>
    </Container>
  )
}

export default Navbar;