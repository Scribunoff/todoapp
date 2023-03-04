import {
  Flex,
  Container,
  Box,
  useColorMode,
  Text,
  SimpleGrid,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { useState, useEffect } from 'react';

/*Current date */
const DateTime = () => {
  var [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);

    return function cleanup() {
      clearInterval(timer);
    };
  });

  return <>{date.toLocaleDateString()}</>;
};

/* Header */
const Header = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
      as="header"
      py={2}
      bg={colorMode === 'dark' ? 'green.700' : 'green.300'}
    >
      <Container maxW="container.2lg">
        <Flex justifyContent="space-between" alignItems="center">
          <Text objectFit="cover" color="dark.500" p={1}>
            DrDesperado
          </Text>
          <DateTime />
          <SimpleGrid columns={2} spacing={3} alignItems="center">
            <ColorModeSwitcher />
          </SimpleGrid>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
