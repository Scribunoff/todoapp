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
} from '@chakra-ui/react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

function EditItem(props) {
  const { text } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: text.data,
  });
  /* PUT request to the server*/
  const onSubmit = async (data, e) => {
    new axios.put('http://localhost:8080/api/v1', data);
    e.preventDefault();
    reset(data);
  };

  return (
    <>
      <Button colorScheme="orange" variant="solid" m={1} onClick={onOpen}>
        Edit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>{text.str}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing="24px">
                <Box>
                  <FormLabel>My {text.str}</FormLabel>
                  <Input {...register('title')} />
                </Box>

                <Box>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    {...register('description')}
                    placeholder="your description of the task"
                    size="md"
                  />
                </Box>

                <Box>
                  <FormLabel>Type</FormLabel>
                  <Select defaultValue={text.status} {...register('status')}>
                    <option value={"TODO"}>My Task</option>
                    <option value={"DREAM"}>My Dream</option>
                  </Select>
                </Box>

                <Box>
                  <FormLabel>Mark</FormLabel>
                  <Input {...register('mark')} />
                </Box>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                colorScheme="orange"
                mr={3}
                onClick={onClose}
                type="submit"
              >
                Edit
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}

export default EditItem;
