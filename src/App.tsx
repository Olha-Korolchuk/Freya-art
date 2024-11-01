import { useEffect, useState } from 'react';
import { Router } from './router';
import './index.css';
import { auth } from './api/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './store/reducers/auth/authSlice';
import { Loader } from './components/Loader';
import { RootState } from './store/store';
import { getUserById } from './api/user';

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const { user: profile } = await getUserById(user.uid);
                dispatch(setUser(profile));
            }
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <Loader />;
    }
    return <Router isAuth={!!user?.id} />;
}
