import {AppDispatch, setNotification} from '@/lib/redux';
import {TagType, backEndApi} from '@/lib/redux/api';
import {
  WsChatJoin,
  WsChatLeave,
  WsChatParticipationUpdate,
  WsChatUpdate,
  WsNewMessage,
} from '@/shared/WsEvents/chat';
import {Socket} from 'socket.io-client';

export function setUpChatEvents(socket: Socket, dispatch: AppDispatch, userId: number): void {
  socket.on(WsChatJoin.eventName, (message: WsChatJoin.eventMessageTemplate) => {
    const {chat, user} = message;

    const isSender = userId === user.userId;
    const tags: TagType[] = ['ChatInfo'];
    if (isSender) tags.push('ChatOverView');

    dispatch(backEndApi.util.invalidateTags(tags));

    dispatch(
      setNotification({
        title: 'Chat - User joined',
        description: `${user.nickname} joined chat ${chat.chatName}`,
        status: 'info',
      }),
    );
  });

  socket.on(WsChatLeave.eventName, (message: WsChatLeave.eventMessageTemplate) => {
    const {chat, user} = message;

    const isSender = userId === user.userId;
    const tags: TagType[] = ['ChatInfo'];
    if (isSender) tags.push('ChatOverView');
    dispatch(backEndApi.util.invalidateTags(tags));

    dispatch(
      setNotification({
        title: 'Chat - User left',
        description: `${user.nickname} left chat ${chat.chatName}`,
        status: 'warning',
      }),
    );
  });

  socket.on(WsNewMessage.eventName, (message: WsNewMessage.eventMessageTemplate) => {
    const {
      chat: {chatId, chatName},
      message: {messageContent},
      sender: {nickname, userId: senderId},
    } = message;

    const isSender = userId === senderId;

    dispatch(backEndApi.util.invalidateTags(['ChatInfo']));

    if (isSender) return;

    dispatch(
      setNotification({
        title: 'Chat - New message',
        description: `[${chatName}] from ${nickname}: ${messageContent}`,
        status: 'success',
      }),
    );
  });

  socket.on(WsChatUpdate.eventName, (message: WsChatUpdate.eventMessageTemplate) => {
    const {chat, updater, action} = message;

    dispatch(backEndApi.util.invalidateTags(['ChatOverView', 'ChatInfo']));

    if ('newChat' in action && action.newChat) {
      dispatch(
        setNotification({
          title: 'Chat - Created',
          description: `${updater.nickname} created chat ${chat.chatName}`,
          status: 'info',
        }),
      );
      return;
    }
    console.log(action);

    let description = `[${chat.chatName}] ${updater.nickname} updated: `;
    if ('updateAvatar' in action && action.updateAvatar) description += `avatar, `;
    if ('updateName' in action && action.updateName) description += `name, `;
    if ('updatePassword' in action && action.updatePassword) description += `password, `;
    else if ('removePassword' in action && action.removePassword) description += `remove password`;
    if (description.endsWith(', ')) description = description.slice(0, -2);

    dispatch(
      setNotification({
        title: 'Chat - Updated',
        description,
        status: 'info',
      }),
    );
  });

  socket.on(
    WsChatParticipationUpdate.eventName,
    (message: WsChatParticipationUpdate.eventMessageTemplate) => {
      const {chat, updater, updatedUser, action} = message;

      dispatch(backEndApi.util.invalidateTags(['ChatInfo']));

      const iskick = 'kick' in action && action.kick;
      const isChangeRole = 'changeRole' in action && action.changeRole;
      const isMute = 'mute' in action && action.mute;
      const isUnmute = 'unmute' in action && action.unmute;
      let description = `[${chat.chatName}] `;
      switch (true) {
        case iskick:
          description += `${updater.nickname} kicked ${updatedUser.nickname}`;
          break;
        case isChangeRole:
          description += `${updater.nickname} changed ${updatedUser.nickname}'s role`;
          if (isMute) description += ' and muted them';
          else if (isUnmute) description += ' and unmuted them';
          break;
        case isMute:
          description += `${updater.nickname} muted ${updatedUser.nickname}`;
          break;
        case isUnmute:
          description += `${updater.nickname} unmuted ${updatedUser.nickname}`;
          break;
        default:
          description += `${updater.nickname} has done something terrible to ${updatedUser.nickname}`;
      }

      dispatch(
        setNotification({
          title: 'Chat participation - Updated',
          description,
          status: 'info',
        }),
      );
    },
  );
}
