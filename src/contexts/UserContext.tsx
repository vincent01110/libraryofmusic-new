'use client';

import { API } from '@/interfaces/api';
import { ChildrenProp } from '@/interfaces/props';
import { getUserInfo } from '@/utils/api';
import { isLoggedIn } from '@/utils/utils';
import { createContext, useEffect, useState, Dispatch, SetStateAction, useContext } from 'react';

interface UserContextType {
  user: API.V1.Response.User.UserInfo | null;
  setUser: Dispatch<SetStateAction<API.V1.Response.User.UserInfo | null>>;
  loginStatus: boolean;
  logout: () => void;
}


const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: ChildrenProp) {
    const [loginStatus, setLoginStatus] = useState<boolean>(false);
    const [user, setUser] = useState<API.V1.Response.User.UserInfo | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const storedUserData = localStorage.getItem('user_info');
            const loggedIn = await isLoggedIn();
            setLoginStatus(loggedIn);

            if (loggedIn) {
                if (storedUserData) {
                    setUser(JSON.parse(storedUserData));
                } else {
                    const userInfo = await getUserInfo();
                    setUser(userInfo);
                    localStorage.setItem('user_info', JSON.stringify(userInfo));
                }
            } else {
                localStorage.removeItem('user_info');
                setUser(null);
            }
        };

        fetchUserData();
    }, [loginStatus]);

    function logout() {
        setUser(null);
        localStorage.removeItem('user_info');
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

