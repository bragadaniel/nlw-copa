import { createContext, ReactNode, useEffect, useState } from "react";
import Constants from 'expo-constants';
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import * as  WebBrowser from 'expo-web-browser'
import { api } from "../services/api";

WebBrowser.maybeCompleteAuthSession()

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps)

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserProps>({} as UserProps)
  const [isUserLoading, setIsUserLoading] = useState(false)
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: Constants.expoConfig.extra.clientId,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email']
  })

  const signIn = async () => {
    try {
      setIsUserLoading(true)
      await promptAsync()
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      setIsUserLoading(false)
    }
  }

  const signInWithGoogle = async (access_token: string) => {
    try {
      setIsUserLoading(true)

      const { data: { token } } = await api.post('/users', { access_token })
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      const { data: { user } } = await api.get('/me')
      setUser(user)

    } catch (error) {
      console.error(error)
      throw error
    } finally {
      setIsUserLoading(false)
    }
  }

  useEffect(() => {
    if (response?.type === 'success' && response?.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken)
    }
  }, [response])

  return <AuthContext.Provider value={{
    signIn,
    isUserLoading,
    user,
  }}>
    {children}
  </AuthContext.Provider>
}