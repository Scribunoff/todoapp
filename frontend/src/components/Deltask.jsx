import {
    Box,
    Stack,
    FormLabel,
    Button,
    Select,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    useDisclosure,
    Textarea,
    Heading,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  useColorMode,
  Text,
  Container,
  Flex,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

function Deltask(props) {
    const { text, index } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { register, handleSubmit, reset } = useForm({
        defaultValues: text.data,
    });
    /* DELETE request to the server */
    const deleteSubmit = async data => {
        await axios.delete('http://localhost:8080/api/v1/' + data.id);
        onClose(data);
    };

    return (
        <>
            <Button colorScheme="red" onClick={onOpen}>
                Delete
            </Button>

            {/* 'Delete' Alert dialog */}
            <AlertDialog
                isOpen={isOpen}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Flex
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Box>
                                    <Button r onClick={onClose}>
                                        Cancel
                                    </Button>
                                </Box>

                                <Box>
                                    <AccordionButton
                                        className="chakra-button css-18m2ta5"
                                        onClick={() => deleteSubmit(it[index])}
                                        ml={3}
                                    >
                                        Delete
                                    </AccordionButton>
                                </Box>
                            </Flex>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

        </>
    );
}

export default Deltask;
