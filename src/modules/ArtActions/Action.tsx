import { Controller, useForm } from 'react-hook-form';
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
    StyledReplace,
} from './styles';
import { FC, useRef, useState } from 'react';
import { createDefaultValues, ICreateArtFormFields } from './data';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { LINK_TEMPLATES } from '@/constants/link';
import { IArtActionRequest, IArtIterator } from '@/api/art/types';
import { FormMultiSelect } from '@/ui-library/inputs/FormMultiSelect';
import { genreOptions, typeOptions } from '@/constants/select';

interface IActionProps {
    handler: (data: IArtActionRequest) => void;
    defaultValues?: IArtIterator;
    isEdit?: boolean;
}

export const Action: FC<IActionProps> = ({ defaultValues, handler, isEdit = false }) => {
    const dropAreaRef = useRef<HTMLDivElement | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [url, setUrl] = useState<string | null>(defaultValues?.image || null);

    const push = useNavigate();
    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isSubmitted },
    } = useForm<ICreateArtFormFields>({ defaultValues: createDefaultValues(defaultValues) });
    const { enqueueSnackbar } = useSnackbar();

    const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setUrl(URL.createObjectURL(file));
            setFile(file);
        }
    };

    const onSubmit = (data: ICreateArtFormFields) => {
        try {
            const image = (file || url) as string | File | undefined;

            if (image) {
                handler({ ...data, image });
                enqueueSnackbar('Success', { variant: 'success' });
                push(isEdit ? LINK_TEMPLATES.DETAILED(defaultValues?.id || '') : LINK_TEMPLATES.PROFILE());
            } else {
                enqueueSnackbar('Please provide a valid image.', { variant: 'warning' });
            }
        } catch (error) {
            enqueueSnackbar('Something went wrong', { variant: 'warning' });
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
                <StyledGallery>{!!url && <img src={url} alt="preview" />}</StyledGallery>
                {!!url && (
                    <StyledReplace>
                        <StyledButton>Replace image</StyledButton>
                    </StyledReplace>
                )}
            </StyledDropArea>
            <StyledForm>
                <FormInput
                    placeholder="Title"
                    type="title"
                    register={register('title', { required: 'Title is required' })}
                    error={errors.title?.message}
                />

                <Controller
                    name={'genre'}
                    control={control}
                    rules={{
                        required: 'Genre is required',
                    }}
                    render={({ field: { onChange, value } }) => (
                        <FormMultiSelect
                            placeholder="Select Genres"
                            options={genreOptions}
                            onChange={onChange}
                            error={errors.genre?.message}
                            value={genreOptions.filter((option) => value?.includes(option.value))}
                        />
                    )}
                />
                <Controller
                    name={'type'}
                    control={control}
                    rules={{
                        required: 'Type is required',
                    }}
                    render={({ field: { onChange, value } }) => (
                        <FormMultiSelect
                            placeholder="Select Types"
                            options={typeOptions}
                            error={errors.type?.message}
                            value={typeOptions.filter((option) => value?.includes(option.value))}
                            onChange={onChange}
                        />
                    )}
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
