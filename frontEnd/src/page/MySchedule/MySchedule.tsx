import { ReactQuery, ReactRouteDom } from 'lib/lib';
import { useEffect, useState } from 'react';

import { scheduleFetch } from 'services/ScheduleService';
import { TodaySeletor } from 'utils/TodaySeletor';

//그래프
import ScheduleHeader from 'features/Myschedule/Layout/ScheduleHeader';
import ScheduleRoute from 'Route/ScheduleRoute';
import { keepPreviousData, useQueryClient } from '@tanstack/react-query';
import { SpinnerLoading } from 'component/loading/SpinnerLoading';
import { Grid } from '@layout/Grid';
import DashBoard from 'component/ui/DashBoard/DashBoard';

// lib
const { useQuery } = ReactQuery;
const { useSearchParams } = ReactRouteDom;

export default function MySchedule() {
    const today = TodaySeletor(); //오늘날짜 계산
    const [selectDay, setSelectDay] = useState(today());
    const [param] = useSearchParams(new URL(window.location).searchParams);

    const getYear = param.get('year') || today().split('-')[0];
    const getMonth = param.get('month') || today().split('-')[1];

    //FetchData
    const [listData, setListData] = useState();
    const [DdayArr, setDdayArr] = useState();

    const queryClient = useQueryClient();

    const { isSuccess, isError, error, data, isLoading } = useQuery({
        queryKey: ['Schedule', +getMonth],
        queryFn: () => scheduleFetch(+getYear, +getMonth),
        staleTime: 10000,
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });

    useEffect(() => {
        queryClient.getQueryData(['Schedule', +getMonth]);
    }, [isSuccess, getMonth, queryClient]);

    useEffect(() => {
        queryClient
            .prefetchQuery({
                queryKey: ['Schedule', +getMonth + 1],
                queryFn: () => scheduleFetch(getYear, +getMonth + 1),
            })
            .then(() => {
                queryClient.getQueryData(['Schedule', +getMonth + 1]);
                // console.log('test ::: ', test);
            });
    }, [getYear, getMonth, queryClient]);

    useEffect(() => {
        if (isSuccess) {
            setListData(data.restResponseData);
            setDdayArr(data.D_Day);
        }
    }, [isSuccess, isError, data, error]);

    if (isLoading) {
        <SpinnerLoading />;
    }

    return (
        <>
            {/* UserProFile */}
            <DashBoard
                pageTitle={'MySchedule'}
                subComment={'저의 Coding 스케줄을 관리합니다'}
            />
            <Grid>
                <ScheduleHeader />

                {/* 서브 라우터 */}
                <ScheduleRoute
                    setSelectDay={setSelectDay}
                    listData={listData}
                    selectDay={selectDay}
                    paramYear={getYear}
                    paramMonth={getMonth}
                    DdayArr={DdayArr}
                />
            </Grid>
        </>
    );
}
