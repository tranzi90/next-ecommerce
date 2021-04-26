import Head from "next/head"
import AuthContext from "../context/AuthContext"
import {useState, useContext} from 'react'
import styles from "../styles/Login.module.css"

const Login = () => {
    const [email, setEmail] = useState('')
    const { loginUser } = useContext(AuthContext)

    function handleSubmit(e) {
        e.preventDefault()
        loginUser(email)
    }

    return (
        <div>
            <Head>
                <title>Login</title>
                <meta name='description' content='login here'/>
            </Head>

            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    className={styles.input}
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder='Email Address'
                />
                <button
                    className={styles.button}
                    type='submit'
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login