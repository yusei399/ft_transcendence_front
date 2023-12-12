import SigninPage from './components/auth/SigninPage';
import SignupPage from './components/auth/SignupPage';
import LoginPage  from './components/auth/SignupPage'
import { ChakraProvider } from "@chakra-ui/react";
import UserProfile from './features/user/components/UserProfile';
import UserEditProfile from './features/user/components/UserEditProfile';
import Socket from './features/webSocket/Socket';
import Chat from './features/chat/Chat';
import FriendList from './features/friend/components/FriendList';

export default function main() {
  // const User = [{
  //   name: "test",
  //   email: "test.eamil.com",
  // },
  // {
  //   name: "test2",
  //   email: "test2.eamil.com",
  // }]
  return (
    <>
      <ChakraProvider>
        <Chat />
      {/* <Socket /> */}
        {/*<LoginPage />*/}
        {/* <div>SignUp</div>
        <SignupPage />
        <div>SignIn</div>
        <SigninPage />
        <UserEditProfile/>
        <UserProfile /> */}
        <FriendList />
      </ChakraProvider>
    </>
  );
}
