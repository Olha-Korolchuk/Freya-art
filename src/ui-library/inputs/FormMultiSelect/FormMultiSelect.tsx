import { FC } from 'react';
import { ISelectInputProps } from './types';
import Select from 'react-select';
import { StyledBox, StyledLable } from '../FormInput/styles';

const customStyles = (isError: boolean) => ({
    container: (base: any) => ({
        ...base,
        width: '100%',
    }),
    control: (base: any) => ({
        ...base,
        borderColor: isError ? '#ff0000' : '#cccccc',
        '&:hover': { borderColor: isError ? '#ff0000' : '#000000' },
        borderRadius: '8px',
        borderWidth: '1px',
        padding: '4px',
        height: '56px',
        fontSize: '20px',
    }),
    valueContainer: (base: any) => ({
        ...base,
        height: '46px',
        minHeight: '46px',
        overflowY: 'auto',
    }),
    option: (base: any) => ({
        ...base,
        padding: '10px',
    }),
    multiValue: (base: any) => ({
        ...base,
        borderRadius: '4px',
    }),
});

export const FormMultiSelect: FC<ISelectInputProps> = ({ options, placeholder, error, onChange, value }) => (
    <StyledBox>
        <Select
            closeMenuOnSelect={false}
            isMulti
            placeholder={placeholder}
            value={value}
            options={options}
            styles={customStyles(!!error)}
            onChange={(values) => onChange(values.map((i) => i.value))}
        />
        <StyledLable>{error || ''}</StyledLable>
    </StyledBox>
);
