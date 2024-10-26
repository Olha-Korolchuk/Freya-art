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
import { useEffect, useRef, useState } from 'react';
import { defaultValues, ICreateArtFormFields } from './data';

export const Form = () => {
    const dropAreaRef = useRef<HTMLDivElement | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ICreateArtFormFields>({ defaultValues });
    console.log('🚀 ~ Form ~ errors:', errors);

    const previewFile = (file: File) => {
        const gallery = document.getElementById('gallery');
        if (gallery) {
            gallery.innerHTML = '';
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (reader.result && typeof reader.result === 'string') {
                    const img = document.createElement('img');
                    img.src = reader.result;
                    gallery?.appendChild(img);
                }
            };
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) previewFile(e.target.files[0]);
    };

    const onSubmit = (data: ICreateArtFormFields) => {
        console.log(data);
        // Handle form submission here
    };

    return (
        <StyledContainer onSubmit={handleSubmit(onSubmit)}>
            <StyledDropArea ref={dropAreaRef} isError={!!errors.image?.message}>
                <StyledFormContent>
                    <StyledInstructions>
                        Upload images using the file selection dialog or by dragging the desired images into the
                        highlighted area.
                    </StyledInstructions>
                    <StyledButton>Choose image</StyledButton>
                </StyledFormContent>
                <StyledLabel htmlFor="image" />
                <input
                    {...register('image', { required: true })}
                    type="file"
                    id={'image'}
                    hidden
                    name={'image'}
                    accept="image/*"
                    onChange={handleFileInput}
                />
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
