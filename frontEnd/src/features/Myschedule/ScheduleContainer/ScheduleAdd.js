import styled from 'styled-components';

import { v4 as uuidv4 } from 'uuid';
import { useAuthCheck } from 'hooks/useAuthCheck';
import { ReactHookForm, ReactQuery } from 'lib/lib';

import { fetchAddSchedule } from 'services/ScheduleService';
import { TextAreaStyle } from '../../../component/ui/TextArea';
import { Button } from '../../../component/ui/Button';
import ErrorBubble from 'component/error/ErrorBubble';
import HookformRadio from '../component/HookformRadio';

import { SCHEDULE_CATEGORY } from 'constants/pageConstacts';
import { toast } from 'react-toastify';

// lib
const { useForm } = ReactHookForm;
const { useQueryClient, useMutation } = ReactQuery;

const AddScheduleFormStyle = styled.form`
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: relative;
    textarea {
        width: 100%;
        font-size: 14px;
    }
`;
const TextAreaWrap = styled.div`
    width: 100%;
    position: relative;
`;

const RadioCheckboxWrapper = styled.div`
    display: flex;
    margin-right: auto;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    label {
        cursor: pointer;
    }
    .important {
        color: #ad1c1c;
        font-size: 0.8rem;
        margin-right: 1rem;
        border-right: 1px solid #00000026;
        padding-right: 1rem;
        display: flex;
        align-items: center;
        input {
            margin-right: 0.2rem;
        }
    }
`;

const ScheduleAdd = ({ selectDay }) => {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            Schedule_title: '',
            Schedule_important: false,
            TaskCategory: null,
        },
    });
    // console.log('errors : ',errors);
    const { checkHandler } = useAuthCheck();

    const queryclient = useQueryClient();

    const mutation = useMutation({
        mutationFn: data => fetchAddSchedule(data),
        onSuccess: () => {
            toast.success('일정이 등록 되었습니다.');
            // dispatch(alertThunk('일정이 등록 되었습니다.', 1));
            queryclient.invalidateQueries({ queryKey: ['Schedule'] });
            reset();
        },
    });

    // console.log(mutation.data);

    // useEffect(() => {
    //     if (mutation.isError) {
    //         dispatch(alertThunk(mutation.error.message, false));
    //     }
    //     if (mutation.isSuccess) {
    //     }

    //     // console.log(error);
    // }, [mutation.isError, mutation.isSuccess, mutation.data]);

    const AddScheduleHandler = async formData => {
        const requestData = {
            schedule_date: selectDay,
            work: formData.Schedule_title,
            important: formData.Schedule_important,
            category: formData.TaskCategory,
            schedule_key: uuidv4(),
        };

        console.log(requestData);

        if (!checkHandler('입력')) return;
        mutation.mutate(requestData);
    };

    // console.log(errors);
    return (
        <>
            <AddScheduleFormStyle onSubmit={handleSubmit(AddScheduleHandler)}>
                <RadioCheckboxWrapper>
                    <label className="important">
                        <input
                            {...register('Schedule_important')}
                            type="checkbox"
                        />
                        중요!
                    </label>

                    {/* {errors.Schedule_title && (
                        <ErrorBubble>
                            {errors.Schedule_title.message}
                        </ErrorBubble>
                )} */}
                    <HookformRadio
                        options={SCHEDULE_CATEGORY}
                        control={control}
                        errors={errors}
                        keyName={'TaskCategory'}
                    />
                </RadioCheckboxWrapper>
                <TextAreaWrap>
                    {errors.Schedule_title && (
                        <ErrorBubble>
                            {errors.Schedule_title.message}
                        </ErrorBubble>
                    )}
                    <TextAreaStyle
                        $error={errors.Schedule_title}
                        placeholder="일정을 입력해주세요"
                        {...register('Schedule_title', {
                            required: '추가하실 일정을 입력해주세요!',
                            maxLength: {
                                value: 250,
                                message:
                                    '250자를 초과해서 등록 할 수 없습니다.',
                            },
                        })}
                    />
                </TextAreaWrap>
                <Button.Submit>입력하기</Button.Submit>
            </AddScheduleFormStyle>
            {/* {errors.Schedule_Category && <ErrorStyle>{errors.Schedule_Category.message}</ErrorStyle>} */}
        </>
    );
};

export default ScheduleAdd;
