import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { differenceInSeconds } from 'date-fns';

const TimerStyle = styled.span`
    font-weight: 500;
    line-height: 40px;
    color: #ffffff;
    text-shadow: 3px 6px 9.4px rgba(0, 0, 0, 0.25);
    margin-top: 2.5rem;
    font-size: 40px;
    line-height: 52px;
`;

const StopWatch = ({ date, startTime, endDate, running }) => {
    // console.log('startTime::: ', startTime);
    // console.log('date:::', date);
    const diffInSeconed = differenceInSeconds(
        new Date(),
        new Date(`${date} ${startTime}`),
    );
    // console.log('startTimestartTimestartTime::: ', startTime);
    // console.log('new Date()::::::::::`', new Date());

    const initalHour = Math.floor(diffInSeconed / 3600);
    const initalMinites = Math.floor((diffInSeconed % 3600) / 60);
    const initalSeconeds = diffInSeconed % 60;

    // console.log(initalHour, '시간');
    // console.log(initalMinites, '분');
    // console.log(initalSeconeds, '초');

    //Timer Func
    const [timer, setTimer] = useState({
        Hour: initalHour || 0,
        minit: initalMinites || 0,
        second: initalSeconeds || 0,
    });

    // console.log(timer);

    const TimerFormetting = target => {
        return String(target).padStart(2, 0);
    };
    useEffect(() => {
        if (running) {
            const diffInSeconds = differenceInSeconds(
                new Date(),
                new Date(`${date} ${startTime}`),
            );

            const initialHour = Math.floor(diffInSeconds / 3600);
            const initialMinutes = Math.floor((diffInSeconds % 3600) / 60);
            const initialSeconds = diffInSeconds % 60;

            setTimer({
                Hour: initialHour,
                minit: initialMinutes,
                second: initialSeconds,
            });

            const timerId = setInterval(() => {
                setTimer(prev => {
                    let nextSecond = prev.second + 1;
                    let nextMinute = prev.minit;
                    let nextHour = prev.Hour;

                    if (nextSecond === 60) {
                        nextMinute++;
                        nextSecond = 0;
                    }

                    if (nextMinute === 60) {
                        nextHour++;
                        nextMinute = 0;
                    }

                    return {
                        Hour: nextHour,
                        minit: nextMinute,
                        second: nextSecond,
                    };
                });
            }, 1000);

            return () => clearInterval(timerId);
        }
    }, [running, date, startTime]);

    return (
        <TimerStyle>
            {TimerFormetting(timer.Hour)}:{TimerFormetting(timer.minit)}:
            {TimerFormetting(timer.second)}
        </TimerStyle>
    );
};

export default StopWatch;
