import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const PasswordField = ({
    field,
    form: { touched, errors },
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleMouseDownPassword = () => {
        setShowPassword(true);
    }

    const handleMousUpPassword = () => {
        setShowPassword(false);
    }

    return (
        <TextField
            {...field}
            {...props}
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            error={touched[field.name] && Boolean(errors[field.name])}
            helperText={touched[field.name] && errors[field.name]}
            slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMousUpPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }
            }}
        />
    );
};
