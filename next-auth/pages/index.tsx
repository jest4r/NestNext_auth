import Layout from "../layouts/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
    const [message, setMessage] = useState('');
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        (
            async () => {
                try {
                    const response = await axios.get('http://localhost:8000/api/user', {
                        withCredentials: true,
                    });

                    const content = response.data;

                    if (content.name) {
                        setMessage(`Hi ${content.name}`);
                        setAuth(true);
                    } else {
                        setMessage('You are not logged in');
                        setAuth(false);
                    }
                } catch (e) {
                    setMessage('You are not logged in');
                    setAuth(false);
                }
            }
        )();
    }, []); 

    return (
        <Layout auth={auth}>
            {message}
        </Layout>
    )
}