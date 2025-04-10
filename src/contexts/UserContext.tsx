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
}


const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: ChildrenProp) {
    const [loginStatus, setLoginStatus] = useState<boolean>(false);
    const [user, setUser] = useState<API.V1.Response.User.UserInfo | null>(null);

    useEffect(() => {
        const userData = sessionStorage.getItem('user_info');
        isLoggedIn().then(r => setLoginStatus(r));
        if (!userData && loginStatus ) {
            getUserInfo().then(u => {
                setUser(u);
                sessionStorage.setItem('user_info', JSON.stringify(u));
            });

        } else if(userData) {
            setUser(JSON.parse(userData));
        }
    }, [loginStatus]);

    return (
        <UserContext.Provider value={{ user, setUser, loginStatus }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}

