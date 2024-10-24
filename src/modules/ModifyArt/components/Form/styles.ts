import styled from 'styled-components';

export const StyledContainer = styled.div`
    padding: 38px;
    display: flex;
    gap: 38px;
`;

export const StyledForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 480px;
`;

export const StyledDropArea = styled.div`
    width: 520px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 2px dashed #000;
    background-color: #f3fcedaf;
    border-radius: 16px;
    cursor: pointer;
    &.highlight {
        border-color: #9dbd61;
    }
`;

export const StyledFormContent = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 22px;
`;

export const StyledInstructions = styled.p`
    font-size: 16px;
    margin-inline: 20px;
`;

export const StyledFileInput = styled.input`
    display: none;
`;

export const StyledLabel = styled.label`
    border-radius: 30px;
    padding: 8px 36px;
    font-size: 20px;
    background-color: #fff;
    border: #9dbd61 1px solid;
`;

export const StyledGallery = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 10px;

    img {
        width: 480px;
        height: 470px;
        object-fit: cover;
        border-radius: 16px;
    }
`;

export const StyledButton = styled.button`
    border-radius: 30px;
    padding: 8px 36px;
    font-size: 20px;
    text-decoration: none;
    color: #000;
    border: none;
    background-color: #9dbd61;
`;
