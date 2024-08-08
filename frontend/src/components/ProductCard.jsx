import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Heading, Text, HStack, IconButton, Image, useColorModeValue, useToast, useDisclosure, Button, VStack, Input} from '@chakra-ui/react';
import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { useProductStore } from '../store/product';


const  ProductCard = ({ product }) => {
    // for modal functionality
    const { isOpen, onOpen, onClose } = useDisclosure()

    // handle product updates
    const [ updatedProduct, setUpdatedProduct ] = useState(product);
    
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const { deleteProduct, updateProduct } = useProductStore()
    const toast = useToast()
    const handleDeleteProduct = async (pid) => {
        const {success, message} = await deleteProduct(pid)
        if(!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true

            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true

            })
        }
    };

    const handleUpdateProduct = async (pid, updatedProduct) => {
        console.log("Updating product with ID:", pid);
        console.log("Updated product data:", updatedProduct);
    
        const { success, message } = await updateProduct(pid, updatedProduct);
        
        console.log("Update response:", { success, message });
    
        onClose();
    
        if (!success) {
            console.error("Update failed:", message);
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else {
            console.log("Update successful");
            toast({
                title: "Success",
                description: "Product updated successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    };
    




  return (
    <Box
        bg={bg}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        transition="all 0.3s"
        _hover={{transform: "translate(-5px)", shadow: "xl" }}
    >

        <Image 
            src={product.image} 
            alt={product.name}
            h={48}
            w="full"
            objectFit="cover"
        />

        <Box p={4}>
            <Heading as="h3" size="md" mb={2}>
                {product.name}
            </Heading>

            <Text 
            fontWeight="bold"
            fontSize="xl"
            color={textColor}
            mb={4}
             >
                ${product.price}
             </Text>

             <HStack spacing={2}>
                <IconButton aria-label='Edit-Icon' icon={ <EditIcon /> } onClick={onOpen} colorScheme="blue" />
                <IconButton aria-label='Delete-Icon' icon={ <DeleteIcon /> } onClick={() => handleDeleteProduct(product._id) } colorScheme="red" />
             </HStack>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Update Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
          
                    <VStack spacing={4}>
                        <Input 
                            placeholder="Product Name"
                            name="name"
                            value={updatedProduct.name}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                        />

                        <Input      
                            placeholder="Price"
                            name="price"
                            type="number"
                            value={updatedProduct.price}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}

                        />

                        <Input 
                            placeholder="Image URL"
                            name="image"
                            value={updatedProduct.image}

                            // update the state
                            // create a new object with setUpdatedProduct
                            // ...updateProduct "spreads" or copies over the current state of updateProduct over to the new object, copies over all its key value pairs
                            // name: e.target.value: This sets the name property of the 
                             // new object to the current value of the input field. e.target.value is the value the user has typed into the input field.


                             //  (...)spread operator is used to copy over existing properties of  updateProduct object into a new object. 
                             //  ensures that the object’s previous properties remain unchanged, except for the one being updatied (in this case, image). 
                             // Not using the spread operator and only set name: e.target.value, would lose all other properties in updateProduct.

                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}

                        />
                      

                    </VStack>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>Update</Button>
                <Button variant="ghost" mr={3} onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
    </Box>
  )
};

export default ProductCard;