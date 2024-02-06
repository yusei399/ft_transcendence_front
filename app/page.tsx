import {Flex} from '@chakra-ui/react';
import Me from './users/components/Me';
import MatchHistory from './game/components/MatchHistory';

export default function IndexPage() {
  return (
    <Flex flexDir="row" alignItems="center" justifyContent="space-between" width="90%">
      <MatchHistory />
      <Me />
    </Flex>
  );
}
