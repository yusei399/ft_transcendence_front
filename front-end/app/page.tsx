import LoginPage  from './components/auth/LoginPage'

import styles from './page.module.css'

export default function main() {
  return (
    <main className={styles.main}>
      <LoginPage />
    </main>
  );
}
