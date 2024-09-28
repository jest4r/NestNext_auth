import React from "react";
import Head from "next/head";
import Link from "next/link";
import {useRouter} from 'next/router';
import axios from 'axios';

const Layout = (props) => {
    const router = useRouter();
    
    const logout = async () => {
        try {
            await axios.post('http://localhost:8000/api/logout', {}, {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            });

            await router.push('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    let menu;

    if(!props.auth) {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                    <Link href="/login" legacyBehavior>
                        <a className="nav-link active" aria-current="page" >Login</a>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href="/register" legacyBehavior>
                        <a className="nav-link active" aria-current="page" >Register</a>
                    </Link>
                </li>
            </ul>              
        )
    } else {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                    <li className="nav-item">
                        <a href="#" className="nav-link active" aria-current="page" onClick={logout} >Logout</a>
                    </li>
            </ul>
        )
    }

    return (
        <>
            <Head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" 
                rel="stylesheet" 
                integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" 
                crossOrigin="anonymous"/>
            </Head>

            <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
                <div className="container-fluid">
                    <Link href="/" legacyBehavior>
                        <a className="navbar-brand">Home</a>
                    </Link>

                    <div>
                        {menu}
                    </div>
                </div>
            </nav>

            <main className="form-signin w-100 m-auto">
                {props.children}
            </main>
    </>
    );
};

export default Layout;