import { Container, Button, Stack, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { FaTasks } from 'react-icons/fa';
import { GiThink } from 'react-icons/gi';
import { BiTask } from 'react-icons/bi';

/* Sidebar */
const Sidebar = () => {
  return (
    <Container my={10} p={1}>
      <Stack>
        <NavLink
          to="/"
          className={`${({ isActive }) => (isActive ? 'green' : undefined)}`}
        >
          <Button m={2} width="100%" height="120px">
            <div className="flex justify-around  absolute w-40">
              <FaTasks className="relative text-2xl " />
              <text className="text-2xl">My tasks</text>
            </div>
          </Button>
        </NavLink>
        <NavLink to="/important">
          <Button m={2} width="100%" height="120px">
            <div className="flex justify-around  absolute w-40">
              <GiThink className="relative text-2xl " />
              <text className="text-2xl">My dreams</text>
            </div>
          </Button>
        </NavLink>
        <NavLink to="/completed">
          <Button m={2} width="100%" height="120px">
            <div className="flex justify-around  absolute w-40">
              <BiTask className="relative text-2xl " />
              <text className="text-2xl">Completed</text>
            </div>
          </Button>
        </NavLink>
      </Stack>
    </Container>
  );
};

export default Sidebar;
