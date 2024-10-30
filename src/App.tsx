import { useEffect, useState } from 'react';
import { Router } from './router';
import './index.css';
import { auth } from './api/firebase';
import { getUserById } from './api/query';
import { useDispatch } from 'react-redux';
import { setUser } from './store/reducers/auth/authSlice';
import { Loader } from './components/Loader';

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

    if (isLoading) {
        return <Loader />;
    }
    return <Router />;
}
