import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <input
        value={username}
        onChange={(event) => setUsername(event.currentTarget.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
      />
    </Layout>
  );
}
