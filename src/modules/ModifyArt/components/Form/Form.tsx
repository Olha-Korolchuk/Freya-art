import { useForm } from 'react-hook-form';
import { FormInput } from './components/FormInput';
import {
    StyledDropArea,
    StyledFormContent,
    StyledGallery,
    StyledInstructions,
    StyledLabel,
    StyledContainer,
    StyledForm,
    StyledButton,
} from './styles';
import { useRef, useState } from 'react';
import { defaultValues, ICreateArtFormFields } from './data';
import { useCreateUserArtMutation, useGetUserArtsQuery } from '@/api/art';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { LINK_TEMPLATES } from '@/constants/link';

export const Form = () => {
    const dropAreaRef = useRef<HTMLDivElement | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const push = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitted },
    } = useForm<ICreateArtFormFields>({ defaultValues });
    const { enqueueSnackbar } = useSnackbar();
    const { mutateAsync } = useCreateUserArtMutation();

    const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            const gallery = document.getElementById('gallery');
            if (gallery) {
                gallery.innerHTML = '';
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                gallery?.appendChild(img);
                setFile(file);
            }
        }
    };

    const onSubmit = (data: ICreateArtFormFields) => {
        try {
            if (file) {
                mutateAsync({ ...data, image: file });
                enqueueSnackbar('Success', {
                    variant: 'success',
                });
                push(LINK_TEMPLATES.PROFILE());
            }
        } catch (error) {
            enqueueSnackbar('Something went wrong', {
                variant: 'warning',
            });
        }
    };

    return (
        <StyledContainer onSubmit={handleSubmit(onSubmit)}>
            <StyledDropArea ref={dropAreaRef} isError={isSubmitted && !file}>
                <StyledFormContent>
                    <StyledInstructions>
                        Upload images using the file selection dialog or by dragging the desired images into the
                        highlighted area.
                    </StyledInstructions>
                    <StyledButton>Choose image</StyledButton>
                </StyledFormContent>
                <StyledLabel htmlFor="file" />
                <input type="file" id="file" accept="image/*" hidden onChange={handleFileInput} />
                <StyledGallery id="gallery"></StyledGallery>
            </StyledDropArea>
            <StyledForm>
                <FormInput
                    placeholder="Title"
                    type="title"
                    register={register('title', { required: 'Title is required' })}
                    error={errors.title?.message}
                />
                <FormInput
                    placeholder="Genre"
                    type="genre"
                    register={register('genre', { required: 'Genre is required' })}
                    error={errors.genre?.message}
                />
                <FormInput
                    placeholder="Type"
                    type="type"
                    register={register('type', { required: 'Type is required' })}
                    error={errors.type?.message}
                />
                <FormInput
                    placeholder="Description"
                    type="description"
                    register={register('description', { required: 'Description is required' })}
                    error={errors.description?.message}
                />
                <StyledButton type="submit">Submit</StyledButton>
            </StyledForm>
        </StyledContainer>
    );
};
