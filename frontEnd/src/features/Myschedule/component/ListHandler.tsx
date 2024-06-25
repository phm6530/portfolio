import { MdModeEdit } from 'react-icons/md';
import { useAuthCheck } from 'hooks/useAuthCheck';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdCancel } from 'component/icon/Icon';

import { Checkbox, Button as Btn, useTheme } from '@mui/material';

import {
    fetchEditSchedule,
    fetchDeleteSchedule,
    fetchToggleComplete,
} from 'services/ScheduleService';

import {
    FormStyle,
    ImportantStyle,
    TextArea,
    IsComplete,
} from './styles/ListHandlerStyled';
import { FlexColumnDiv } from '@style/commonStyle';
import Category from '../ui/Category';
import useExcuteMutation from 'hooks/useExcuteMutation';
import styled from 'styled-components';

const Button = styled.button`
    svg {
        cursor: pointer;
        opacity: 0.4;
        color: #8f9db8;
        &:hover {
            color: #384867;
        }
    }
`;

const FullFlexColumnDiv = styled(FlexColumnDiv)`
    flex-grow: 1;
`;

const ListHandler = ({ selectWork, setSelectWork, ScheduleItem }) => {
    const { register, handleSubmit, setValue } = useForm();
    const { checkHandler } = useAuthCheck();
    const { ref, ...rest } = register('work', {
        required: '빈칸은 입력 불가합니다.',
    });

    const [prevWork, setPrevWork] = useState(ScheduleItem.work);
    const theme = useTheme();

    const [textAreaHeight, setTextArerHeight] = useState(
        ScheduleItem.work.split(/\r\n|\r|\n/).length,
    );

    const { schedule_key, complete, important } = ScheduleItem;
    // console.log(important);

    const { mutate: EditMutate } = useExcuteMutation(
        fetchEditSchedule,
        ['Schedule'],
        '수정',
    );

    const { mutate: deleteMutate } = useExcuteMutation(
        fetchDeleteSchedule,
        ['Schedule'],
        '삭제',
    );

    const { mutate: toggleMutate } = useExcuteMutation(fetchToggleComplete, [
        'Schedule',
    ]);

    // Inline Edit 가능하도록 setValue 설정함
    useEffect(() => {
        setValue('work', ScheduleItem.work);

        // 불필요한 요청막을라고 해둠
        setPrevWork(ScheduleItem.work);
    }, [ScheduleItem, setValue]);

    const onEditHandler = async data => {
        console.log('data::::', data);
        const requstData = {
            work: data.work,
            schedule_key: ScheduleItem.schedule_key,
        };
        if (prevWork === data.work) {
            console.log('동일함');
        } else {
            console.log('실행');
            EditMutate(requstData);
        }
        setSelectWork(null);
    };

    const readOnlyHandler = idx => {
        if (!checkHandler()) return;
        setSelectWork(idx);
    };

    const onToggleHandler = key => {
        if (!checkHandler()) return;
        toggleMutate(key);
    };

    const removeSchedule = () => {
        if (!checkHandler()) return;
        deleteMutate(ScheduleItem.schedule_key);
        hidePopup();
    };

    const textAreaRef = useRef(null);
    const setRefs = input => {
        ref(input);
        textAreaRef.current = input; // 여기에서 input을 직접 할당
    };

    useEffect(() => {
        if (ScheduleItem.schedule_key === selectWork) {
            textAreaRef.current.focus();
        }
    }, [selectWork, ScheduleItem.schedule_key]);

    return (
        <>
            {/* 삭제팝업 */}
            <PopupComponent event={removeSchedule} />

            <IsComplete $Dday={important === 2} $complete={complete}>
                <Checkbox
                    sx={{
                        padding: 0,
                        mr: 1,
                        color: theme.palette.checkbox.main,
                    }}
                    onChange={() => onToggleHandler(schedule_key)}
                    checked={complete === 1}
                />

                {important === 2 && (
                    <ImportantStyle>
                        <img src="/img/calendar/dday.png" alt=""></img>
                    </ImportantStyle>
                )}
                {important === 1 && (
                    <ImportantStyle>
                        <img src="/img/calendar/important.png" alt=""></img>
                    </ImportantStyle>
                )}

                <FormStyle onSubmit={handleSubmit(onEditHandler)}>
                    <FullFlexColumnDiv>
                        <TextArea
                            ref={e => setRefs(e)}
                            {...rest}
                            rows={textAreaHeight}
                            $select={ScheduleItem.schedule_key === selectWork}
                            readOnly={ScheduleItem.schedule_key !== selectWork}
                            onChange={e => {
                                setTextArerHeight(
                                    e.target.value.split(/\r\n|\r|\n/).length,
                                );
                            }}
                        />
                        <Category>{ScheduleItem.category}</Category>
                    </FullFlexColumnDiv>
                    {ScheduleItem.schedule_key === selectWork && (
                        <Btn type="submit" variant="custom" size="small">
                            확인
                        </Btn>
                    )}
                </FormStyle>

                {/* 수정 */}
                <Button
                    onClick={() => readOnlyHandler(ScheduleItem.schedule_key)}
                >
                    <MdModeEdit size={'17'} />
                </Button>

                {/* 삭제 */}
                <Button onClick={() => showPopup('일정')}>
                    <MdCancel />
                </Button>
            </IsComplete>
        </>
    );
};

export default ListHandler;
