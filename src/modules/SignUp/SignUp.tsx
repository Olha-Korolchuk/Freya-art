import { FormInput } from '../../ui-library/inputs/FormInput';
import { StyledContent, StyledButton, StyledNavs, StyledTitle } from './../styles';
import { LINK_TEMPLATES } from '../../constants/link';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, firestore } from '../../api/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { IUser } from '../../types';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/reducers/auth/authSlice';
import { useSnackbar } from 'notistack';

interface ISignUpFromFields {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
}

export const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm<ISignUpFromFields>();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const onSubmit = async (data: ISignUpFromFields) => {
        if (data.password !== data.confirmPassword) {
            setError('password', { message: 'Passwords do not match' });
            setError('confirmPassword', { message: 'Passwords do not match' });
            return;
        } else {
            clearErrors(['password', 'confirmPassword']);
        }

        try {
            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
            await updateProfile(user, { displayName: data.name });

            const usersCollectionRef = collection(firestore, 'users');

            const profile: IUser = {
                id: user.uid,
                name: data.name,
                email: data.email,
            };
            if (profile) {
                await addDoc(usersCollectionRef, profile);
                dispatch(setUser(profile));
                navigate(LINK_TEMPLATES.PROFILE());
                enqueueSnackbar('Success', {
                    variant: 'success',
                });
            }
        } catch (error) {
            enqueueSnackbar('Something went wrong', {
                variant: 'warning',
            });
        }
    };

    return (
        <StyledContent onSubmit={handleSubmit(onSubmit)} data-cy="sign-up-form">
            <StyledTitle data-cy="sign-up-title">Sign up</StyledTitle>
            <FormInput
                type="email"
                register={register('email', { required: 'Email is required' })}
                error={errors?.email?.message}
                placeholder="Email"
                data-cy="email-input"
            />
            <FormInput
                type="text"
                register={register('name', { required: 'Name is required' })}
                error={errors?.name?.message}
                placeholder="Name"
                data-cy="name-input"
            />
            <FormInput
                type="password"
                register={register('password', { required: 'Password is required' })}
                error={errors?.password?.message}
                placeholder="Password"
                data-cy="password-input"
            />
            <FormInput
                type="password"
                register={register('confirmPassword', {
                    required: 'Confirm Password is required',
                })}
                error={errors?.confirmPassword?.message}
                placeholder="Confirm Password"
                data-cy="confirm-password-input"
            />
            <StyledNavs>
                <StyledButton type="submit" isContained={true} data-cy="submit-button">
                    Submit
                </StyledButton>
                <StyledButton
                    onClick={() => navigate(LINK_TEMPLATES.SIGN_IN)}
                    isContained={false}
                    data-cy="sign-in-button"
                >
                    Sign in
                </StyledButton>
            </StyledNavs>
        </StyledContent>
    );
};
