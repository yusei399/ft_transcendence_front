'use client';
import {userIdSelector} from '@/lib/redux';
import {
  useAcceptGameInCreationMutation,
  useGetGameInCreationQuery,
  useUpdateGameInCreationMutation,
} from '@/lib/redux/api';
import {useAppSelector} from '@/lib/redux/hook';
import {HttpGameUpdateInCreation} from '@/shared/HttpEndpoints/game';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Checkbox,
  Input,
  CardFooter,
} from '@chakra-ui/react';
import {useState} from 'react';

type GameInCreationProps = {
  gameInCreationId: number;
};

function GameInCreation({gameInCreationId}: GameInCreationProps) {
  const {data} = useGetGameInCreationQuery([gameInCreationId]);
  const [updateInfo, setUpdateInfo] = useState<HttpGameUpdateInCreation.reqTemplate>({
    scoreToWin: data?.gameInCreation.rules.scoreToWin ?? 3,
  });
  const currentUserId = useAppSelector(userIdSelector) as number;
  const [update, {isLoading}] = useUpdateGameInCreationMutation();
  const [accept] = useAcceptGameInCreationMutation();

  if (!data) return null;

  const {status, rules, playerOne, playerTwo} = data.gameInCreation;
  const me = playerOne.userId === currentUserId ? playerOne : playerTwo;
  const opponent = playerOne.userId === currentUserId ? playerTwo : playerOne;
  if (status !== 'IN_CREATION') return null;

  async function updateGame(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await update([gameInCreationId, updateInfo]).unwrap();
    } catch (err) {
      console.error(err);
    }
  }

  async function acceptGame() {
    try {
      await accept([gameInCreationId, {hasAccepted: !me.hasAccepted}]).unwrap();
    } catch (err) {
      console.error(err);
    }
  }

  const cannotUpdate = me.hasAccepted || updateInfo.scoreToWin === rules.scoreToWin || isLoading;

  return (
    <Flex dir="row" alignItems="center" justifyContent="space-around" width="100%">
      <Flex dir="colomn">
        <Card
          width="320px"
          padding={'6px'}
          textAlign={'center'}
          backgroundColor={me.hasAccepted ? 'red.100' : 'blue.100'}>
          <CardHeader>
            <Heading>Game settings</Heading>
          </CardHeader>
          <CardBody>
            <Flex flexDir="row" justifyContent="space-around" alignItems="center">
              <FormLabel width="fit-content" fontSize="1.4em">
                Score to win
              </FormLabel>
              <Input
                variant="filled"
                isDisabled={true}
                value={rules.scoreToWin}
                size="lg"
                maxWidth="80px"
              />
            </Flex>
          </CardBody>
          <CardFooter flexFlow="column" gap="6px">
            <Button size="lg" colorScheme={me.hasAccepted ? 'red' : 'blue'} onClick={acceptGame}>
              {me.hasAccepted ? 'not ready' : 'ready'}
            </Button>
            <Checkbox
              isDisabled
              justifyContent="center"
              isChecked={opponent.hasAccepted}
              colorScheme={opponent.hasAccepted ? 'green' : 'red'}>
              Your opponent is {opponent.hasAccepted ? 'ready!' : 'not ready!'}
            </Checkbox>
          </CardFooter>
        </Card>
      </Flex>
      <form onSubmit={e => updateGame(e)}>
        <Flex gap="12px" flexDir="column">
          <FormControl isRequired>
            <FormLabel>
              Score to win:{updateInfo.scoreToWin && updateInfo.scoreToWin < 1 && ' 1 min'}
              {updateInfo.scoreToWin && updateInfo.scoreToWin > 20 && ' 20 max'}
            </FormLabel>
            <Input
              type="number"
              min={1}
              max={20}
              name="scoreToWin"
              autoComplete="off"
              value={updateInfo.scoreToWin}
              onChange={e => setUpdateInfo({...updateInfo, scoreToWin: Number(e.target.value)})}
            />
          </FormControl>
          <Button type="submit" colorScheme={'green'} isDisabled={cannotUpdate}>
            Update
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}

export default GameInCreation;
