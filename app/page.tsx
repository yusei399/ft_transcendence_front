import { Flex, Box } from '@chakra-ui/react';
import Me from './users/components/Me';
import MatchHistory from './game/components/MatchHistory';

export default function IndexPage() {
  return (
    <Flex direction={{ base: 'column-reverse', md: 'row' }} height="100vh">
      <Flex flex="1" alignItems="center" justifyContent="center" >
        <Me />
      </Flex>
      <Box flex="1" overflowY="auto"  alignItems="flex-end">
        <MatchHistory />
      </Box>
    </Flex>
  );
}
