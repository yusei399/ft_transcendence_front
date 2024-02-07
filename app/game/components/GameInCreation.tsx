'use client';
import {
  useAcceptGameInCreationMutation,
  useGetGameInCreationQuery,
  useUpdateGameInCreationMutation,
} from '@/lib/redux/api';
import {useAppSelector, userIdSelector} from '@/lib/redux';
import {HttpGameUpdateInCreation} from '@/shared/HttpEndpoints/game';
import {BallSize, BallSpeed, PaddleSize, PaddleSpeed} from '@/shared/HttpEndpoints/interfaces';
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
  Select,
  useColorModeValue,
} from '@chakra-ui/react';
import {useState} from 'react';

type GameInCreationProps = {
  gameInCreationId: number;
};

function GameInCreation({gameInCreationId}: GameInCreationProps) {
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const {data} = useGetGameInCreationQuery([gameInCreationId]);
  const [updateInfo, setUpdateInfo] = useState<HttpGameUpdateInCreation.reqTemplate>({
    scoreToWin: data?.gameInCreation.rules.scoreToWin ?? 3,
    ballSpeed: data?.gameInCreation.rules.ballSpeed ?? 'NORMAL',
    ballSize: data?.gameInCreation.rules.ballSize ?? 'NORMAL',
    paddleSize: data?.gameInCreation.rules.paddleSize ?? 'NORMAL',
    paddleSpeed: data?.gameInCreation.rules.paddleSpeed ?? 'NORMAL',
  });
  const currentUserId = useAppSelector(userIdSelector) as number;
  const [update, {isLoading}] = useUpdateGameInCreationMutation();
  const [accept] = useAcceptGameInCreationMutation();

  if (!data) return null;

  const {status, rules, player1, player2} = data.gameInCreation;
  const me = player1.userId === currentUserId ? player1 : player2;
  const opponent = player1.userId === currentUserId ? player2 : player1;
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
  const nothingChanged =
    updateInfo.scoreToWin === rules.scoreToWin &&
    updateInfo.ballSpeed === rules.ballSpeed &&
    updateInfo.ballSize === rules.ballSize &&
    updateInfo.paddleSize === rules.paddleSize &&
    updateInfo.paddleSpeed === rules.paddleSpeed;

  const defaultRules: HttpGameUpdateInCreation.reqTemplate = {
    scoreToWin: 3,
    ballSpeed: 'NORMAL',
    ballSize: 'NORMAL',
    paddleSize: 'NORMAL',
    paddleSpeed: 'NORMAL',
  };
  const isDefault =
    updateInfo.scoreToWin === defaultRules.scoreToWin &&
    updateInfo.ballSpeed === defaultRules.ballSpeed &&
    updateInfo.ballSize === defaultRules.ballSize &&
    updateInfo.paddleSize === defaultRules.paddleSize &&
    updateInfo.paddleSpeed === defaultRules.paddleSpeed;
  const cannotUpdate = me.hasAccepted || nothingChanged || isLoading;

  return (
    <Flex
      dir="row"
      alignItems="center"
      justifyContent="space-around"
      width="100%"
      height="100%"
      wrap="wrap"
      rowGap="12px"
      overflowY="auto">
      <Flex dir="colomn" overflow="hidden">
        <Card
          textAlign={'center'}
          backgroundColor={me.hasAccepted ? 'red.100' : 'blue.100'}
          w="300px">
          <CardHeader>
            <Heading size="lg">Game settings</Heading>
          </CardHeader>
          <CardBody>
            <Flex flexDir="row" justifyContent="space-between" alignItems="center">
              <FormLabel width="fit-content" fontSize="1.3em">
                Score to win
              </FormLabel>
              <Input
                variant="filled"
                isDisabled={true}
                textAlign="center"
                value={rules.scoreToWin}
                size="lg"
                fontWeight="700"
                padding="8px"
                color={
                  rules.scoreToWin < 3
                    ? 'blue'
                    : rules.scoreToWin === 3
                      ? 'gray'
                      : rules.scoreToWin > 15
                        ? 'red'
                        : rules.scoreToWin > 10
                          ? 'orange'
                          : 'green'
                }
                maxWidth="110px"
              />
            </Flex>
            <Flex flexDir="row" justifyContent="space-between" alignItems="center">
              <FormLabel width="fit-content" fontSize="1.3em">
                Ball Speed
              </FormLabel>
              <Input
                variant="filled"
                size="lg"
                maxWidth="110px"
                padding="8px"
                isDisabled={true}
                textAlign="center"
                fontWeight="700"
                fontSize="1.3em"
                color={
                  {
                    SLOW: 'blue',
                    NORMAL: 'gray',
                    FAST: 'orange',
                    VERY_FAST: 'red',
                  }[rules.ballSpeed ?? 'NORMAL']
                }
                value={
                  {
                    SLOW: 'Slow',
                    NORMAL: 'Normal',
                    FAST: 'Fast',
                    VERY_FAST: 'Very fast',
                  }[rules.ballSpeed ?? 'NORMAL']
                }
              />
            </Flex>
            <Flex flexDir="row" justifyContent="space-between" alignItems="center">
              <FormLabel width="fit-content" fontSize="1.3em">
                Ball Size
              </FormLabel>
              <Input
                variant="filled"
                size="lg"
                maxWidth="110px"
                fontWeight="700"
                padding="8px"
                isDisabled={true}
                textAlign="center"
                fontSize="1.3em"
                color={
                  {
                    VERY_SMALL: 'red',
                    SMALL: 'orange',
                    NORMAL: 'gray',
                    BIG: 'blue',
                    VERY_BIG: 'green',
                  }[rules.ballSize ?? 'NORMAL']
                }
                value={
                  {
                    VERY_SMALL: 'Very Small',
                    SMALL: 'Small',
                    NORMAL: 'Normal',
                    BIG: 'Big',
                    VERY_BIG: 'Very Big',
                  }[rules.ballSize ?? 'NORMAL']
                }
              />
            </Flex>
            <Flex flexDir="row" justifyContent="space-between" alignItems="center">
              <FormLabel width="fit-content" fontSize="1.3em">
                Paddle Speed
              </FormLabel>
              <Input
                variant="filled"
                size="lg"
                maxWidth="110px"
                padding="8px"
                fontWeight="700"
                textAlign="center"
                isDisabled={true}
                fontSize="1.3em"
                color={
                  {
                    SLOW: 'blue',
                    NORMAL: 'gray',
                    FAST: 'orange',
                    VERY_FAST: 'red',
                  }[rules.paddleSpeed ?? 'NORMAL']
                }
                value={
                  {
                    SLOW: 'Slow',
                    NORMAL: 'Normal',
                    FAST: 'Fast',
                    VERY_FAST: 'Very fast',
                  }[rules.paddleSpeed ?? 'NORMAL']
                }
              />
            </Flex>
            <Flex flexDir="row" justifyContent="space-between" alignItems="center">
              <FormLabel width="fit-content" fontSize="1.3em">
                Paddle Size
              </FormLabel>
              <Input
                variant="filled"
                size="lg"
                padding="8px"
                fontWeight="700"
                maxWidth="110px"
                textAlign="center"
                isDisabled={true}
                fontSize="1.3em"
                color={
                  {
                    VERY_SMALL: 'red',
                    SMALL: 'orange',
                    NORMAL: 'gray',
                    BIG: 'blue',
                    VERY_BIG: 'green',
                  }[rules.paddleSize ?? 'NORMAL']
                }
                value={
                  {
                    VERY_SMALL: 'Very small',
                    SMALL: 'Small',
                    NORMAL: 'Normal',
                    BIG: 'Big',
                    VERY_BIG: 'Very big',
                  }[rules.paddleSize ?? 'NORMAL']
                }
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
      <Flex gap="12px" flexDir="column" overflow="hidden">
        <form onSubmit={e => updateGame(e)}>
          <Card
            w="300px"
            padding={'10px'}
            textAlign={'center'}
            backgroundColor={cannotUpdate ? 'red.400' : 'teal.300'}
            gap="2px"
            boxShadow="dark-lg">
            <CardHeader>
              <Heading size="lg">Update Settings</Heading>
            </CardHeader>
            <FormControl isRequired>
              <Flex justifyContent="space-between">
                <FormLabel>
                  Score to win:{updateInfo.scoreToWin && updateInfo.scoreToWin < 1 && ' 1 min'}
                  {updateInfo.scoreToWin && updateInfo.scoreToWin > 20 && ' 20 max'}
                </FormLabel>
                <Input
                  type="number"
                  min={1}
                  max={20}
                  width="80px"
                  name="scoreToWin"
                  autoComplete="off"
                  value={updateInfo.scoreToWin}
                  textAlign="center"
                  fontWeight="700"
                  fontSize="1.3em"
                  color={
                    updateInfo.scoreToWin < 3
                      ? 'blue'
                      : updateInfo.scoreToWin === 3
                        ? 'black'
                        : updateInfo.scoreToWin > 15
                          ? 'red'
                          : updateInfo.scoreToWin > 10
                            ? 'orange'
                            : 'green'
                  }
                  onChange={e => setUpdateInfo({...updateInfo, scoreToWin: Number(e.target.value)})}
                  //bgColor='blue.400'
                  bgColor={bgColor}
                />
              </Flex>
            </FormControl>
            <Flex flexDir="row" justifyContent="space-between" alignItems="center">
              <FormLabel width="fit-content">Ball speed</FormLabel>
              <Select
                value={updateInfo.ballSpeed}
                border={'none'}
                bg={
                  {
                    SLOW: 'blue',
                    NORMAL: {bgColor},
                    FAST: 'orange',
                    VERY_FAST: 'red',
                  }[updateInfo.ballSpeed ?? 'NORMAL']
                }
                onChange={e =>
                  setUpdateInfo({...updateInfo, ballSpeed: e.target.value as BallSpeed})
                }
                width="fit-content">
                <option value="SLOW">Slow</option>
                <option value="NORMAL">Normal</option>
                <option value="FAST">Fast</option>
                <option value="VERY_FAST">Very fast</option>
              </Select>
            </Flex>
            <Flex flexDir="row" justifyContent="space-between" alignItems="center">
              <FormLabel width="fit-content">Ball size</FormLabel>
              <Select
                value={updateInfo.ballSize}
                border={'none'}
                bg={
                  {
                    VERY_SMALL: 'red',
                    SMALL: 'orange',
                    NORMAL: {bgColor},
                    BIG: 'blue',
                    VERY_BIG: 'green',
                  }[updateInfo.ballSize ?? 'NORMAL']
                }
                onChange={e => setUpdateInfo({...updateInfo, ballSize: e.target.value as BallSize})}
                width="fit-content">
                <option value="VERY_SMALL">Very small</option>
                <option value="SMALL">Small</option>
                <option value="NORMAL">Normal</option>
                <option value="BIG">Big</option>
                <option value="VERY_BIG">Very big</option>
              </Select>
            </Flex>
            <Flex flexDir="row" justifyContent="space-between" alignItems="center">
              <FormLabel width="fit-content">Paddle speed</FormLabel>
              <Select
                value={updateInfo.paddleSpeed}
                border={'none'}
                bg={
                  {
                    SLOW: 'blue',
                    NORMAL: {bgColor},
                    FAST: 'orange',
                    VERY_FAST: 'red',
                  }[updateInfo.paddleSpeed ?? 'NORMAL']
                }
                onChange={e =>
                  setUpdateInfo({...updateInfo, paddleSpeed: e.target.value as PaddleSpeed})
                }
                width="fit-content">
                <option value="SLOW">Slow</option>
                <option value="NORMAL">Normal</option>
                <option value="FAST">Fast</option>
                <option value="VERY_FAST">Very fast</option>
              </Select>
            </Flex>
            <Flex flexDir="row" justifyContent="space-between" alignItems="center">
              <FormLabel width="fit-content">Paddle size</FormLabel>
              <Select
                value={updateInfo.paddleSize}
                border={'none'}
                bg={
                  {
                    VERY_SMALL: 'red',
                    SMALL: 'orange',
                    NORMAL: {bgColor},
                    BIG: 'blue',
                    VERY_BIG: 'green',
                  }[updateInfo.paddleSize ?? 'NORMAL']
                }
                onChange={e =>
                  setUpdateInfo({...updateInfo, paddleSize: e.target.value as PaddleSize})
                }
                width="fit-content">
                <option value="VERY_SMALL">Very small</option>
                <option value="SMALL">Small</option>
                <option value="NORMAL">Normal</option>
                <option value="BIG">Big</option>
                <option value="VERY_BIG">Very big</option>
              </Select>
            </Flex>
            <Flex dir="row" justifyContent="space-around">
              <Button
                type="button"
                colorScheme="gray"
                isDisabled={isDefault}
                onClick={() => setUpdateInfo(defaultRules)}>
                Set to default
              </Button>
              <Button type="submit" colorScheme={'green'} isDisabled={cannotUpdate}>
                Update
              </Button>
            </Flex>
          </Card>
        </form>
      </Flex>
    </Flex>
  );
}

export default GameInCreation;
