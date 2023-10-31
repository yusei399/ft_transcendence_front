import {WsEventName} from './src/shared/base_types';

const {io} = require('socket.io-client');
const readline = require('readline');

const id = process?.argv[2];
if (!id) {
  console.log("need 'id' argument");
  process.exit(1);
}

fetch('http://localhost:3333/auth/signin', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({nickname: `test${id}`, password: 'abc'}),
})
  .then(response => response.json())
  .then(res => {
    const authToken = res.authToken;
    const socket = io('ws://localhost:3333/', {auth: {token: authToken}});

    function getSocketMessageFromEvent(eventName: WsEventName) {
      socket.on(eventName, message => {
        console.log(`-----------${eventName}-----------`);
        console.log(message);
        console.log('---------------------------------');
      });
    }

    getSocketMessageFromEvent('connect');
    getSocketMessageFromEvent('disconnect');
    getSocketMessageFromEvent('exception');
    getSocketMessageFromEvent('newFriend');
    getSocketMessageFromEvent('leftFriend');
    getSocketMessageFromEvent('friendConnection');
    getSocketMessageFromEvent('friendDisconnection');
    getSocketMessageFromEvent('newMessage');
    getSocketMessageFromEvent('newInvitation');
    getSocketMessageFromEvent('invitationAccepted');
    getSocketMessageFromEvent('invitationDeclined');
    getSocketMessageFromEvent('invitationDeclined');
    getSocketMessageFromEvent('userJoining');
    getSocketMessageFromEvent('userLeaving');

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    });

    (function sendMessage() {
      rl.question('\n', () => {
        rl.question('EventName: ', eventName => {
          rl.question('Message: ', message => {
            // socket.emit(eventName, {userId: 1, roomId: 10, messageContent: 'prout'});
            try {
              socket.emit(eventName, JSON.parse(message));
            } catch (err) {
              socket.emit(eventName, message);
            }
            sendMessage();
          });
        });
      });
    })();
  })
  .catch(err => {
    console.log('err', err);
  });
