import { FormInput } from './components/FormInput';
import {
    StyledDropArea,
    StyledFileInput,
    StyledFormContent,
    StyledGallery,
    StyledInstructions,
    StyledLabel,
    StyledContainer,
    StyledForm,
    StyledButton,
} from './styles';
import React, { useEffect, useRef, useState } from 'react';

export const Form = () => {
    const dropAreaRef = useRef<HTMLDivElement | null>(null);
    const [isImageChosen, setIsImageChosen] = useState(false);

    useEffect(() => {
        const dropArea = dropAreaRef.current;

        const preventDefaults = (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
        };

        const highlight = () => {
            if (dropArea) {
                dropArea.classList.add('highlight');
            }
        };

        const unhighlight = () => {
            if (dropArea) {
                dropArea.classList.remove('highlight');
            }
        };

        const handleDragEnter = (e: DragEvent) => {
            preventDefaults(e);
            highlight();
        };

        const handleDragOver = (e: DragEvent) => {
            preventDefaults(e);
            highlight();
        };

        const handleDragLeave = (e: DragEvent) => {
            preventDefaults(e);
            unhighlight();
        };

        const handleDrop = (e: DragEvent) => {
            preventDefaults(e);
            unhighlight();
            const dt = e.dataTransfer;
            if (!dt) return;
            const files = dt.files;
            handleFiles(files);
        };

        const handleFiles = (files: FileList) => {
            clearGallery();
            Array.from(files).forEach((file) => {
                uploadFile(file);
                previewFile(file);
            });
        };

        const clearGallery = () => {
            const gallery = document.getElementById('gallery');
            if (gallery) {
                gallery.innerHTML = '';
            }
        };

        const uploadFile = (file: File) => {
            const formData = new FormData();
            formData.append('file', file);
            // Add your upload logic here
        };

        const previewFile = (file: File) => {
            setIsImageChosen(true);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (reader.result && typeof reader.result === 'string') {
                    const img = document.createElement('img');
                    img.src = reader.result;
                    img.style.width = '100%';
                    img.style.height = '180px';
                    img.style.verticalAlign = 'middle';
                    img.style.borderRadius = '16px';
                    img.style.objectFit = 'cover';
                    document.getElementById('gallery')?.appendChild(img);
                }
            };
        };

        dropArea?.addEventListener('dragenter', handleDragEnter);
        dropArea?.addEventListener('dragover', handleDragOver);
        dropArea?.addEventListener('dragleave', handleDragLeave);
        dropArea?.addEventListener('drop', handleDrop);

        return () => {
            dropArea?.removeEventListener('dragenter', handleDragEnter);
            dropArea?.removeEventListener('dragover', handleDragOver);
            dropArea?.removeEventListener('dragleave', handleDragLeave);
            dropArea?.removeEventListener('drop', handleDrop);
        };
    }, []);

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        handleFiles(e.target.files);
    };

    const handleFiles = (files: FileList) => {
        clearGallery();
        Array.from(files).forEach((file) => {
            uploadFile(file);
            previewFile(file);
        });
    };

    const clearGallery = () => {
        const gallery = document.getElementById('gallery');
        if (gallery) {
            gallery.innerHTML = '';
        }
    };

    const uploadFile = (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        // Handle file upload here
    };

    const previewFile = (file: File) => {
        setIsImageChosen(true);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            if (reader.result && typeof reader.result === 'string') {
                const img = document.createElement('img');
                img.src = reader.result;
                img.style.width = '98%';
                img.style.height = '460px';
                img.style.verticalAlign = 'middle';
                img.style.borderRadius = '16px';
                img.style.objectFit = 'cover';
                document.getElementById('gallery')?.appendChild(img);
            }
        };
    };
    return (
        <StyledContainer>
            <StyledDropArea id="drop-area" ref={dropAreaRef}>
                {!isImageChosen && (
                    <StyledFormContent>
                        <StyledInstructions>
                            Upload images using the file selection dialog or by dragging the desired images into the
                            highlighted area
                        </StyledInstructions>
                        <StyledFileInput type="file" id="fileElem" accept="image/*" onChange={handleFileInput} />
                        <StyledLabel htmlFor="fileElem">Choose image</StyledLabel>
                    </StyledFormContent>
                )}
                <StyledGallery id="gallery"></StyledGallery>
            </StyledDropArea>
            <StyledForm>
                <FormInput placeholder="Title" type="title" register={''} error={''}></FormInput>
                <FormInput placeholder="Genre" type="genre" register={''} error={''}></FormInput>
                <FormInput placeholder="Type" type="type" register={''} error={''}></FormInput>
                <FormInput placeholder="Description" type="description" register={''} error={''}></FormInput>
                <StyledButton>Submit</StyledButton>
            </StyledForm>
        </StyledContainer>
    );
};
