import { useEffect, useState } from 'react';
import { Router } from './router';
import './index.css';
import { auth } from './api/firebase';
import { getUserById } from './api/query';
import { useDispatch } from 'react-redux';
import { setUser } from './store/reducers/auth/authSlice';
import { Loader } from './components/Loader';
// import { useLocation } from 'react-router-dom';

// const pathNameHistory = new Set<string>();

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const profile = await getUserById(user.uid);
                dispatch(setUser(profile));
            }
            setIsLoading(false);
        });
    }, []);

    // const { pathname } = useLocation();

    // useEffect((): void => {
    //     if (!pathNameHistory.has(pathname)) {
    //         window.scrollTo(0, 0);
    //         pathNameHistory.add(pathname);
    //     }
    // }, [pathname]);

    if (isLoading) {
        return <Loader />;
    }
    return <Router />;
}
