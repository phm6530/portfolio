import styled from 'styled-components';
import ErrorBubble from 'component/error/ErrorBubble';
import { Controller } from 'react-hook-form';
import { FormControlLabel, RadioGroup, Radio, useTheme } from '@mui/material';

const RadioWrap = styled.div`
    position: relative;
    display: flex;
    margin-right: auto;

    label {
        font-size: 14px;
        margin-right: 1.4rem;
        display: flex;
        cursor: pointer;
        &:hover {
            text-shadow: 0 0 0;
        }
        input {
            margin-right: 5px;

            &:checked {
                color: red;
            }
        }
    }
`;
const HookformRadio = ({ options, control, errors, keyName }) => {
    const theme = useTheme();

    const radioProps = (option, field) => ({
        size: 'small',
        value: option,
        onChange: field.onChange,
        checked: field.value === option,
    });

    return (
        <>
            <RadioWrap>
                {errors[keyName] && (
                    <ErrorBubble>{errors[keyName].message}</ErrorBubble>
                )}
                <Controller
                    control={control}
                    name={keyName}
                    rules={{ required: '필수항목입니다.' }}
                    render={({ field }) => (
                        <RadioGroup row {...field}>
                            {options.map(option => (
                                <FormControlLabel
                                    control={
                                        <Radio {...radioProps(option, field)} />
                                    }
                                    key={option}
                                    label={option}
                                    sx={{
                                        '.MuiFormControlLabel-label': {
                                            color:
                                                option === field.value
                                                    ? theme.palette.secondary
                                                          .main
                                                    : null,
                                        },
                                    }}
                                />
                            ))}
                        </RadioGroup>
                    )}
                />
            </RadioWrap>
        </>
    );
};

export default HookformRadio;
