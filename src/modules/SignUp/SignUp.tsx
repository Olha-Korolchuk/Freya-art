import React from 'react';
import { FormInput } from '../../ui-library/inputs/FormInput';
import { StyledContent, StyledButton, StyledNavs, StyledTitle } from './styles';
import { LINK_TEMPLATES } from '../../constants/link';
import { useForm } from 'react-hook-form';
import { ISignUpFromFields } from './types';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, firestore } from '../../api/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { IUser } from '../../types';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/reducers/auth/authSlice';

export const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ISignUpFromFields>();
    const dispatch = useDispatch();
    const push = useNavigate();

    const onSubmit = async (data: ISignUpFromFields) => {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
            await updateProfile(user, { displayName: data.name });

            const usersCollectionRef = collection(firestore, 'users');

            const profile: IUser = {
                id: user.uid,
                name: data.name,
                email: data.email,
            };
            await addDoc(usersCollectionRef, profile);
            dispatch(setUser(profile));
            push(LINK_TEMPLATES.PROFILE());
        } catch (error) {}
    };

    return (
        <StyledContent onSubmit={handleSubmit(onSubmit)}>
            <StyledTitle>Sign up</StyledTitle>
            <FormInput
                type="email"
                register={register('email', { required: 'Email is required' })}
                error={errors?.email?.message}
                placeholder="Email"
            />
            <FormInput
                type="text"
                register={register('name', { required: 'Name is required' })}
                error={errors?.name?.message}
                placeholder="Name"
            />
            <FormInput
                type="password"
                register={register('password', { required: 'Password is required' })}
                error={errors?.password?.message}
                placeholder="Password"
            />
            <FormInput
                type="password"
                register={register('confirmPassword', { required: 'Confirm Password is required' })}
                error={errors?.confirmPassword?.message}
                placeholder="Confirm Password"
            />
            <StyledNavs>
                <StyledButton type="submit" isContained={true}>
                    Submit
                </StyledButton>
                <StyledButton onClick={() => push(LINK_TEMPLATES.SIGN_IN)} isContained={false}>
                    Sign in
                </StyledButton>
            </StyledNavs>
        </StyledContent>
    );
};
