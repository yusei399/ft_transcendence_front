import {Flex} from '@chakra-ui/react';
import Me from './users/components/Me';
import MatchHistory from './game/components/MatchHistory';

export default function IndexPage() {
  return (
    <Flex>
      <MatchHistory />
      <Me />
    </Flex>
  );
}
