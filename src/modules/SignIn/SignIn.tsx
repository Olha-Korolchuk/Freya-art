import React from 'react';
import { FormInput } from '../../ui-library/inputs/FormInput';
import { StyledContent, StyledButton, StyledTitle } from './../styles';
import { LINK_TEMPLATES } from '../../constants/link';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { ISignInFromFields } from './types';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../api/firebase';
import { getUserById } from '../../api/query';
import { setUser } from '../../store/reducers/auth/authSlice';
import { useSnackbar } from 'notistack';

export const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ISignInFromFields>();

    const dispatch = useDispatch();
    const push = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const onSubmit = async (data: ISignInFromFields) => {
        try {
            const { user } = await signInWithEmailAndPassword(auth, data.email, data.password);
            const profile = await getUserById(user.uid);

            if (profile) {
                dispatch(setUser(profile));
                push(LINK_TEMPLATES.PROFILE());
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
        <StyledContent onSubmit={handleSubmit(onSubmit)}>
            <StyledTitle>Sign in</StyledTitle>
            <FormInput
                type="email"
                register={register('email', { required: 'Email is required' })}
                error={errors?.email?.message}
                placeholder="Email"
            />
            <FormInput
                type="password"
                register={register('password', { required: 'Password is required' })}
                error={errors?.password?.message}
                placeholder="Password"
            />

            <StyledButton type="submit" isContained={true}>
                Submit
            </StyledButton>
            <StyledButton onClick={() => push(LINK_TEMPLATES.SIGN_UP)} isContained={false}>
                Sign up
            </StyledButton>
        </StyledContent>
    );
};
