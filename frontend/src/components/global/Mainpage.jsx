import React, { useState } from 'react';
import { ChakraProvider, Grid, GridItem, theme } from '@chakra-ui/react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { FaListUl } from 'react-icons/fa';

function Mainpage() {
  const [isOpen, setOpen] = useState(true);
  /* Structure of the main page */
  return (
    <ChakraProvider theme={theme}>
      <Grid
        templateAreas={`"header header"
                  "nav main"`}
        gridTemplateColumns={`${isOpen ? '1fr 2fr' : '1fr'}`}
        className="duration-500 "
      >
        <GridItem area={'header'}>
          <Header />
          <FaListUl
            className={`text-4xl absolute mx-3 h-36 left-14 cursor-pointer duration-300 ${
              isOpen && 'rotate-[360deg]'
            }`}
            onClick={() => setOpen(!isOpen)}
          />
        </GridItem>
        <GridItem
          py={14}
          className={`duration-100 ${!isOpen ? 'hidden' : 'block'}`}
        >
          <Sidebar />
        </GridItem>
        <GridItem py={12}>
          <Outlet />
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default Mainpage;
