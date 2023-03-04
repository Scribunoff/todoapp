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
import axios from 'axios';
import React, { useState } from 'react';
import DrawerExample from '../AddTask';
import EditItem from '../Edittask';

const Tasks = props => {
  const { items = [] } = props;

  /* useDisclosure for 'Delete' Alert dialog */
  const {
    isOpen: delOpen,
    onOpen: onDelOpen,
    onClose: onDelClose,
  } = useDisclosure();

  /* useDisclosure for 'Completed' Alert dialog */
  const {
    isOpen: complOpen,
    onOpen: onComplOpen,
    onClose: onComplClose,
  } = useDisclosure();

  /* Filter for showing only  uncompleted and unimportant tasks */
  const it = Object.values(items).filter(
    task => task.status === "TODO"
  );

  const { colorMode } = useColorMode();

  const cancelRef = React.useRef();
  const editRef = React.useRef();

  /* DELETE request to the server */
  const deleteSubmit = async data => {
    await axios.delete('http://localhost:8080/api/v1/' + data.id);
    onDelClose(data);
  };

  /* PUT request to the server */
  const onSubmitCompleted = async data => {
    data.status = "COMPLETED";
    new axios.put('http://localhost:8080/api/v1', data);
    onComplClose(data.id);
  };

  const [index, setIndex] = useState([it]);
  const handleChange = nextIndex => {
    setIndex(nextIndex);
  };

  return (
    <Container my={2} maxW="100%">
      {/* Title of the page */}
      <Container>
        <Box>
          <Heading align="center" width="100%" height="100%">
            My Tasks
          </Heading>
          <Divider />
        </Box>
      </Container>

      <Accordion allowToggle index={index} onChange={handleChange}>
        {it.map(task => (
          <AccordionItem my={6} key={task.id} index={task.id}>
            <h2>
              <AccordionButton
                bg={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
                h="100px"
              >
                <Flex
                  key={task.id}
                  flex="1"
                  justifyContent="space-between"
                  alignItems="center"
                  textAlign="left"
                >
                  <Text as="b" maxW="80%">
                    {task.title}
                  </Text>
                  <Text color="red">{task.mark}</Text>
                </Flex>
              </AccordionButton>
            </h2>

            <AccordionPanel key={task.id} pb={4}>
              <Flex justifyContent="space-between" alignItems="center">
                <Text>{task.mark}</Text>
                <Box>
                  <Container alignContent="center">
                    <Button colorScheme="red" onClick={onDelOpen}>
                      Delete
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
                            Are you sure? You can't undo this action afterwards.
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

                    {/* Edit task */}
                    <EditItem
                      text={{
                        str: 'Task',
                        status: "TODO",
                        id: task.id,
                        data: task,
                      }}
                    />

                    <Button colorScheme="green" onClick={onComplOpen}>
                      Completed
                    </Button>

                    {/* 'Completed' Alert dialog */}
                    <AlertDialog
                      isOpen={complOpen}
                      leastDestructiveRef={editRef}
                      onClose={onComplClose}
                    >
                      <AlertDialogOverlay>
                        <AlertDialogContent>
                          <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Completed
                          </AlertDialogHeader>

                          <AlertDialogBody>Are you sure?</AlertDialogBody>

                          <AlertDialogFooter>
                            <Button ref={editRef} onClick={onComplClose}>
                              Cancel
                            </Button>

                            <Button
                              colorScheme="green"
                              onClick={() => onSubmitCompleted(task)}
                              ml={3}
                            >
                              Completed
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
        ))}{' '}
      </Accordion>

      <Flex justifyContent="center" my={10}>
        <Box as="a" w="100">
          <DrawerExample text={{ str: 'Task', status: "TODO" }} />
        </Box>
      </Flex>
    </Container>
  );
};

export { Tasks };
