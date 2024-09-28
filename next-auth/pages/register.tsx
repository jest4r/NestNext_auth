import React, { SyntheticEvent, useState } from "react";
import Layout from "../layouts/Layout";
import { useRouter } from 'next/router';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const router = useRouter();

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8000/api/register', {
        name,
        email,
        password,
        password_confirm: passwordConfirm
      });

      await router.push('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  }

  return (
    <Layout>
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please register</h1>
        <input type="text" className="form-control" placeholder="Name" required
          onChange={(e) => setName(e.target.value)}
        />
        <input type="email" className="form-control" placeholder="Email" required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input type="password" className="form-control" placeholder="Password" required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="password" className="form-control" placeholder="Confirm Password" required
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <button className="btn btn-primary w-100 py-2" type="submit">Register</button>
      </form>
    </Layout>
  );
}

export default Register;