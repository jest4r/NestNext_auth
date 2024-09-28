import React, { SyntheticEvent, useState } from "react";
import Layout from "../layouts/Layout";
import { useRouter } from 'next/router';
import axios from 'axios';

const login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8000/api/login', {
        email,
        password
      }, {
        withCredentials: true
      });

      await router.push('/');
    } catch (error) {
      setErrorMessage('Login failed: Incorrect email or password.');
      console.error('Login failed:', error);
    }
  }

  return (
    <Layout>
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
        <input type="email" className="form-control" id="floatingInput" placeholder="Email" required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required
          onChange={(e) => setPassword(e.target.value)}
        />
    
        <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
      </form>
    </Layout>
  );
}

export default login;