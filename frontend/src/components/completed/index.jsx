import {
  Heading,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  useDisclosure,
  useColorMode,
  Text,
  Button,
  Box,
  Container,
  Flex,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from 'axios';
const Completed = props => {
  const { items = [] } = props;

  /* useDisclosure for 'Delete' Alert dialog */
  const {
    isOpen: delOpen,
    onOpen: onDelOpen,
    onClose: onDelClose,
  } = useDisclosure();

  /* useDisclosure for 'Not Completed' Alert dialog */
  const {
    isOpen: complOpen,
    onOpen: onComplOpen,
    onClose: onComplClose,
  } = useDisclosure();

  const cancelRef = React.useRef();
  const editRef = React.useRef();

  /* PUT request for complete task to the server */
  const onSubmitCompleted = async data => {
    data.status = "TODO";
    new axios.put('http://localhost:8080/api/v1', data);
    onComplClose(data.id);
  };

  /* DELETE request to the server */
  const deleteSubmit = async data => {
    await axios.delete('http://localhost:8080/api/v1/' + data.id);
    onDelClose(data.id);
  };
  /* Filter for showing only completed tasks */
  const it = Object.values(items).filter(task => task.status === "COMPLETED");

  const { colorMode } = useColorMode();

  const [index, setIndex] = useState([it]);
  const handleChange = nextIndex => {
    setIndex(nextIndex);
  };

  return (
    <Container my={2} maxW="100%">
      {/* Title of the page*/}
      <Container>
        <Box>
          <Heading align="center" width="100%" height="100%">
            Completed
          </Heading>
          <Divider />
        </Box>
      </Container>

      <Container maxW="100%" my={4}>
        <Accordion allowToggle index={index} onChange={handleChange}>
          {it.map(task => (
            <AccordionItem my={6} key={task.id} index={task.id}>
              <h2>
                <AccordionButton
                  bg={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
                  h="100px"
                >
                  <Flex
                    key={task.title}
                    flex="1"
                    justifyContent="space-between"
                    alignItems="center"
                    textAlign="left"
                  >
                    <Text as="b" maxW="80%">
                      {task.title}
                    </Text>
                    <Text color={colorMode === 'dark' ? 'green.100' : 'green'}>
                      Completed!
                    </Text>
                  </Flex>
                </AccordionButton>
              </h2>

              <AccordionPanel key={task.title} pb={4}>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text>{task.description}</Text>
                  <Box>
                    <Container alignContent="center">
                      <Button
                        colorScheme="red"
                        variant="solid"
                        m={1}
                        onClick={onDelOpen}
                      >
                        Trash
                      </Button>
                      {/* 'Delete' Alert dialog */}
                      <AlertDialog
                        isOpen={delOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={onDelClose}
                      >
                        <AlertDialogOverlay>
                          <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                              Delete
                            </AlertDialogHeader>

                            <AlertDialogBody>
                              Are you sure? You can't undo this action
                              afterwards.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                              <Flex
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <Box>
                                  <Button ref={cancelRef} onClick={onDelClose}>
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
                      <Button
                        colorScheme="orange"
                        variant="solid"
                        m={1}
                        onClick={onComplOpen}
                      >
                        NOT Completed
                      </Button>
                      {/* 'Not Completed' alert dialog */}
                      <AlertDialog
                        isOpen={complOpen}
                        leastDestructiveRef={editRef}
                        onClose={onComplClose}
                      >
                        <AlertDialogOverlay>
                          <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                              Not Completed
                            </AlertDialogHeader>

                            <AlertDialogBody>Are you sure?</AlertDialogBody>

                            <AlertDialogFooter>
                              <Button ref={editRef} onClick={onComplClose}>
                                Cancel
                              </Button>

                              <Button
                                colorScheme="pink"
                                onClick={() => onSubmitCompleted(task)}
                                ml={3}
                              >
                                Not Completed
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialogOverlay>
                      </AlertDialog>
                    </Container>
                  </Box>
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Container>
  );
};

export { Completed };
