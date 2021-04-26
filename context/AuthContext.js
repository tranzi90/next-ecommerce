import {createContext, useEffect, useState} from "react"
import { useRouter } from "next/router";
import {Magic} from "magic-sdk"
import {MAGIC_PUBLIC_KEY} from "../utils/urls"

const AuthContext = createContext();
let magic

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const loginUser = async (email) => {
    try {
      await magic.auth.loginWithMagicLink({ email })
      setUser({ email })
      router.push("/")
    } catch (e) {
      setUser(null)
    }
  }

  const logoutUser = async () => {
    try {
      await magic.user.logout()
      setUser(null)
      await router.push("/")
    } catch (e) {
      console.log(e)
    }
  }

  const checkUserLoggedIn = async () => {
    try {
      const isLoggedIn = await magic.user.isLoggedIn()

      if (isLoggedIn) {
        const { email } = await magic.user.getMetadata()
        setUser({ email })
      }
    } catch (e) {

    }
  }

  useEffect(() => {
    magic = new Magic(MAGIC_PUBLIC_KEY)

    checkUserLoggedIn()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
