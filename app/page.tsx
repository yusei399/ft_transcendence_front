import {Box, Flex} from '@chakra-ui/react';
import Me from './users/components/Me';
import MatchHistory from './game/components/MatchHistory';

export default function IndexPage() {
  return (
    <Box
      display={{base: 'box', md: 'flex'}}
      overflowY="auto"
      flexFlow={{base: 'column', md: 'row'}}
      justifyContent="space-around"
      width="100%"
      height="100%">
      <Flex
        alignSelf="center"
        justifyContent="center"
        margin={{base: '0 0 24px 0', md: '0 0 24px 0'}}>
        <Me />
      </Flex>
      <Flex justifyContent="center" overflowY={{md: 'auto'}}>
        <MatchHistory />
      </Flex>
    </Box>
  );
}
