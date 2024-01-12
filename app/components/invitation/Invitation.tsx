'use client';

import {useGetInvitationsQuery} from '@/lib/redux/api';
import {InvitationKind_Url} from '@/shared/HttpEndpoints/types';
import {Avatar, Card, CardBody, CardHeader, Flex, HStack, Heading} from '@chakra-ui/react';
import {useAppSelector} from '@/lib/redux/hook';
import {userIdSelector} from '@/lib/redux';
import UpdateInvitationButton from './UpdateInvitationButton';

function InvitationsList({kind_url}: {kind_url: InvitationKind_Url}) {
  const {data} = useGetInvitationsQuery([kind_url]);
  const userId = useAppSelector(userIdSelector);

  return (
    <HStack spacing="8px" wrap="wrap" justifyContent="center" padding="12px" flexDir="column">
      <Heading size="lg">招待</Heading>
      {data?.invitations.length === 0 && <Heading size="lg">招待はありません</Heading>}
      <Flex flexFlow="row">
        {data?.invitations.map(invitation => {
          const {sender, receiver, invitationId, kind} = invitation;
          const isSender = sender.userId === userId;
          console.log(invitation);

          return (
            <Card key={invitationId} padding="8px" rowGap="6px" width="160px">
              <CardHeader padding={0}>
                <Heading size="md">
                  {isSender ? `${receiver.nickname}への招待` : `${sender.nickname}からの招待`}
                </Heading>
              </CardHeader>
              <CardBody padding="6px">
                <Avatar
                  boxSize="80px"
                  src={(isSender ? receiver.avatarUrl : sender.avatarUrl) ?? '/assets/sample.png'}
                />
                {kind !== 'FRIEND' && (
                  <Heading size="sm">
                    {kind === 'CHAT'
                      ? invitation.targetChatName
                      : `ゲーム${invitation.targetGameId}`}
                    への招待
                  </Heading>
                )}
              </CardBody>
              <UpdateInvitationButton
                invitationId={invitationId}
                invitationKind={kind_url}
                targetChatId={kind === 'CHAT' ? invitation.targetChatId : undefined}
                targetGameId={kind === 'GAME' ? invitation.targetGameId : undefined}
                action={isSender ? 'cancel' : 'accept'}
              />
              {!isSender && (
                <UpdateInvitationButton
                  invitationId={invitationId}
                  invitationKind={kind_url}
                  action={'decline'}
                />
              )}
            </Card>
          );
        })}
      </Flex>
    </HStack>
  );
}

export default InvitationsList;
