import {Spinner, Flex} from '@chakra-ui/react';

function Loading() {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      position="fixed"
      top="0"
      left="0"
      width="100%"
      zIndex="9999"
      backgroundColor="rgba(255, 255, 255, 0.8)">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    </Flex>
  );
}

export default Loading;
