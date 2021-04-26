import Head from "next/head"
import AuthContext from "../context/AuthContext"
import { useContext} from 'react'
import Link from "next/link"

const Account = () => {
    const { user, logoutUser } = useContext(AuthContext)

    if (!user) {
        return (
            <div>
                <p>Please login or register</p>
                <Link href='/'><a>Go Back</a></Link>
            </div>
        )
    }

    return (
        <div>
            <Head>
                <title>Account page</title>
                <meta name='description' content='Account page here'/>
            </Head>

            <h2>Account page</h2>
            <p>Logged in as: {user.email}</p>
            <a href='#' onClick={logoutUser}>Logout</a>
        </div>
    )
}

export default Account