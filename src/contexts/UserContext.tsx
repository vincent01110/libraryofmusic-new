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
}

interface Props {
    children: ReactNode;
    initialUser?: API.V1.Response.User.UserInfo;
}


const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children, initialUser }: Props) {
    const [user, setUser] = useState<API.V1.Response.User.UserInfo | null>(initialUser ?? null);
    const [loginStatus, setLoginStatus] = useState<boolean>(!!user);

    useEffect(() => {
        const loadUser = async () => {
            const s = await isLoggedIn();
            setLoginStatus(s);
            if (!user && s) {
                const fetched = await getUserInfo();
                setUser(fetched);
            }
        };
        loadUser();
    }, [loginStatus]);

    function logout() {
        setUser(null);
        document.cookie = 'user_info=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        setLoginStatus(false);
    }

    return (
        <UserContext.Provider value={{ user, setUser, loginStatus, logout }}>
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

