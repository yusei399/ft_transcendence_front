import {Flex} from '@chakra-ui/react';
import Me from './users/components/Me';
import MatchHistory from './game/components/MatchHistory';

export default function IndexPage() {
  return (
    <Flex
      direction={{base: 'column', md: 'row'}}
      overflowY={{base: 'auto', md: 'unset'}}
      justify="space-around"
      width="100%"
      height="100%"
      gap="24px">
      <Flex justifyContent="center" alignSelf="center">
        <Me />
      </Flex>
      <Flex overflowY={{base: 'inherit', md: 'auto'}} justifyContent="center" alignSelf="center">
        <MatchHistory />
      </Flex>
    </Flex>
  );
}
