'use client';

import { API } from '@/interfaces/api';
import { getUserInfo } from '@/utils/api';
import { isLoggedIn } from '@/utils/utils';
import { createContext, useState, Dispatch, SetStateAction, useContext, ReactNode, useEffect } from 'react';

interface UserContextType {
  user: API.V1.Response.User.UserInfo | null;
  setUser: Dispatch<SetStateAction<API.V1.Response.User.UserInfo | null>>;
  loginStatus: boolean;
  logout: () => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

interface Props {
    children: ReactNode;
}


const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: Props) {
    const [user, setUser] = useState<API.V1.Response.User.UserInfo | null>(null);
    const [loginStatus, setLoginStatus] = useState<boolean>(!!user);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const loadUser = async () => {
            const s = await isLoggedIn();
            setLoginStatus(s);
            if (!user && s) {
                const fetched = await getUserInfo();
                setUser(fetched);
            }
            setIsLoading(false);
        };
        loadUser();
    }, [loginStatus, user]);

    function logout() {
        setUser(null);
        document.cookie = 'user_info=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        setLoginStatus(false);
        setIsLoading(false);
    }

    return (
        <UserContext.Provider value={{ user, setUser, loginStatus, logout, isLoading, setIsLoading }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}

