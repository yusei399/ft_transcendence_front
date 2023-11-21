"use client"
import React, { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3333');

const Socket = () => {
  return <div>test</div>;
}

// const Socket = () => {
//   const [num, setNum] = useState(0);
//   const [showFaceFlag, setShowFaceFlag] = useState(true);
//   const [inputText, setInputText] = useState('');
//   const [chatLog, setChatLog] = useState<string[]>([]);
//   const [msg, setMsg] = useState('');
//   const [roomID, setRoomID] = useState('');

//   const onClickCountUp = () => {
//     setNum(num + 1);
//   };
//   const onClickSwitchFlag = () => {
//     setShowFaceFlag(!showFaceFlag);
//   };
//   useEffect(() => {
//     if (num % 3 === 0 && !showFaceFlag) {
//       setShowFaceFlag(true);
//     } else if (num % 3 !== 0 && showFaceFlag) {
//       setShowFaceFlag(false);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [num]);

//   useEffect(() => {
//     socket.on('connect', () => {
//       console.log('connection ID : ', socket.id);
//     });
//   }, []);

//   const onClickSubmit = useCallback(() => {
//     socket.emit('message', inputText);
//   }, [inputText]);

//   useEffect(() => {
//     socket.on('update', (message: string) => {
//       console.log('recieved : ', message);
//       setMsg(message);
//     });
//   }, []);

//   useEffect(() => {
//     setChatLog([...chatLog, msg]);
//   }, [msg]);

//   return (
//     <>
//       <h1>Hello World!</h1>
//         {num}
//         Tokyo : Japan
//       <button onClick={onClickCountUp} type="button">
//         +1 :)
//       </button>
//       <button onClick={onClickSwitchFlag} type="button">
//         on / off
//       </button>
//       {showFaceFlag && <p> ^ ^</p>}
//       <select
//         onChange={(event) => {
//           setRoomID(event.target.value);
//           socket.emit('joinRoom', event.target.value);
//           setChatLog([]);
//         }}
//         value={roomID}
//       >
//         <option value="">---</option>
//         <option value="room1">Room1</option>
//         <option value="room2">Room2</option>
//       </select>
//       <input
//         id="inputText"
//         type="text"
//         value={inputText}
//         onChange={(event) => {
//           setInputText(event.target.value);
//         }}
//       />
//       <input id="sendButton" onClick={onClickSubmit} type="submit" />
//       {chatLog.map((message, index) => (
//         // eslint-disable-next-line react/no-array-index-key
//         <p key={index}>{message}</p>
//       ))}
//     </>
//   );
// };

export default Socket;