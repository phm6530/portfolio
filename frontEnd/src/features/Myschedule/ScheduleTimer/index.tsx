import { FlexRow } from '@style/commonStyle';
import { useEffect, useState } from 'react';

import StopWatch from '../component/StopWatch';
import useWebSocket from 'services/useWebSocket';
import HookformRadio from '../component/HookformRadio';

import { format } from 'date-fns';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthCheck } from 'hooks/useAuthCheck';
import { fetchTimerStart, fetchTimerEnd } from 'services/tastTimerService';

import { useForm } from 'react-hook-form';
import { SCHEDULE_CATEGORY } from 'constants/pageConstacts';
import { toast } from 'react-toastify';
import {
    Button,
    Today,
    ButtonToggle,
    StopWatchStyle,
} from '@features/Myschedule/ScheduleTimer/ScheduleTimerStyle';

import useTimer from 'hooks/useTimer';
import useStore from 'store/zustandStore';

const ScheduleTimer = () => {
    const [timerData, setTimerData] = useState(null);
    const { user } = useStore(state => state.userAuth);

    const { checkHandler } = useAuthCheck();
    const [touched, setTouched] = useState<boolean>();
    const { data, isLoading, getWebsoketTimer } = useTimer();

    const { data: websoketData } = useWebSocket('ws://localhost:8080');
    const [running, setRunning] = useState(false);

    const nowTIme = () => {
        return format(new Date(), 'yyyy-MM-dd HH:mm:ss').split(' ');
    };

    const queryClient = useQueryClient();

    useEffect(() => {
        // console.log('websoketData', websoketData);
        if (websoketData) {
            getWebsoketTimer();
        }
    }, [websoketData, getWebsoketTimer]);

    const {
        control,
        getValues,
        formState: { errors },
        reset,
        trigger,
        watch,
    } = useForm({
        defaultValues: {
            category: null,
        },
    });

    const { mutate: startMutate } = useMutation({
        mutationFn: data => fetchTimerStart(data),
        onSuccess: () => {
            toast.success('타이머시작');
            queryClient.invalidateQueries({
                queryKey: ['ScheduleTimer'],
            });
            setTouched(false);
            reset();
        },
    });

    const { mutate: endMutate } = useMutation({
        mutationFn: data => fetchTimerEnd(data),
        onSuccess: () => {
            toast.info('타이머중지');
            queryClient.invalidateQueries({
                queryKey: ['ScheduleTimer'],
            });
            setRunning(false);
        },
    });

    const watchd = watch('category');

    useEffect(() => {
        if (touched) {
            trigger('category');
        }
    }, [watchd, touched, trigger]);

    useEffect(() => {
        if (data?.timerData) {
            setTimerData(data.timerData);
            setRunning(true);
        }
    }, [data]);

    // Start Timer
    const toggleHandler = (running: boolean) => {
        if (!checkHandler()) return;
        if (!running) {
            setTouched(true);
            trigger('category');
            const category = getValues('category');
            if (!category) return;

            const nowTime = nowTIme();
            const fetchData = {
                startTime: nowTime[1],
                date: nowTime[0],
                category,
                ...user,
            };
            startMutate(fetchData);
        } else {
            const nowTime = nowTIme();
            const fetchData = {
                endTime: nowTime[1],
                ...user,
            };

            endMutate(fetchData);
        }
    };

    // End Timer

    const today = format(new Date(), 'yyyy.MM.dd');

    if (isLoading) {
        return <>loading....</>;
    }

    return (
        <>
            <StopWatchStyle>
                {/* <div className="timer-icon">
                    <TfiTimer />
                </div> */}
                <Today>{today}</Today>
                {data?.timerData ? (
                    <StopWatch
                        running={running}
                        date={data.timerData.date}
                        startTime={data.timerData.start_time}
                        endDate={data.timerData.end_time}
                    />
                ) : (
                    '지금은 진행중 인 Task가 없어요'
                )}

                <div className="stateMessage">
                    {data?.timerData ? (
                        <>
                            {/* <img src="/img/contact/talk2.png" alt="kakao" /> */}
                            <div className="on">
                                지금 저는 &#39; {timerData?.category} &#39; 중
                                입니다..
                            </div>
                        </>
                    ) : (
                        <HookformRadio
                            options={SCHEDULE_CATEGORY}
                            control={control}
                            errors={errors}
                            keyName={'category'}
                        />
                    )}
                </div>
                <FlexRow>
                    <ButtonToggle>
                        <Button
                            $running={running}
                            // disabled={running}
                            onClick={() => toggleHandler(running)}
                        >
                            {!running ? 'START' : 'END'}
                        </Button>
                    </ButtonToggle>
                </FlexRow>
            </StopWatchStyle>
        </>
    );
};

export default ScheduleTimer;
