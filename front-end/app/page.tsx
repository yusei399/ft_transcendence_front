import LoginPage  from './components/auth/LoginPage'
import UserEditProfile from './components/user/UserEditProfile';
import UserProfile from './components/user/UserProfile';

import styles from './page.module.css'

export default function main() {

  const User = [{
    name: "test",
    email: "test.eamil.com",
  },
  {
    name: "test2",
    email: "test2.eamil.com",
  }]
  return (
    <main className={styles.main}>
      <LoginPage />
      {/* <UserEditProfile prop={User}/> */}
      <UserProfile userData={User}/>
    </main>
  );
}
