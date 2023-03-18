import React from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';

const TextFieldWrapper = ({
    name,
    ...otherProps
}) => {
    const [field, meta] = useField(name);

    const inputs = {
        ...field,
        ...otherProps,
        fullWidth: true,
        variant: 'outlined'
    };

    if (meta.touched && meta.error) {
        inputs.error = true;
        inputs.helperText = meta.error;
    }

    return (
        <TextField {...inputs} />
    );
}

export default React.memo(TextFieldWrapper)

