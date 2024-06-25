import DashBoard from 'component/ui/DashBoard/DashBoard';

import BannerCommon from 'component/ui/BannerCommon';
import DashBoardTitle from 'component/ui/DashBoard/DashBoardTitle';
import { ReactQuery, ReactRouteDom } from 'lib/lib';
import { useEffect, useState } from 'react';

import { scheduleFetch } from 'services/ScheduleService';
import { TodaySeletor } from 'utils/TodaySeletor';

// styled
import { PageGrid, PageWrapper } from '@layout/Grid';

//그래프
import { FlexColumnDiv } from '@style/commonStyle';
import ScheduleHeader from 'features/Myschedule/Layout/ScheduleHeader';
import ScheduleRoute from 'Route/ScheduleRoute';
import styled from 'styled-components';
import { keepPreviousData, useQueryClient } from '@tanstack/react-query';
import { SpinnerLoading } from 'component/loading/SpinnerLoading';

// lib
const { useQuery } = ReactQuery;
const { useSearchParams } = ReactRouteDom;

const CustumlexColumnDiv = styled(FlexColumnDiv)`
    padding: 3rem 3.5rem;
    border-radius: 2.5rem;
    flex-grow: 1;
    background: var(--background-color-box);
    border: var(--border--btn-type-1);
`;

export default function MySchedule() {
    const today = TodaySeletor(); //오늘날짜 계산
    const [selectDay, setSelectDay] = useState(today());
    const [param] = useSearchParams();

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
    console.log('변경되나?');

    useEffect(() => {
        if (isSuccess) {
            setListData(data.restResponseData);
            setDdayArr(data.D_Day);
        }
    }, [isSuccess, isError, data, error]);

    return (
        <PageWrapper>
            <DashBoard page={'Calendar'}>
                {/* header */}
                <BannerCommon.BannerPoint>
                    <img src="/img/calendar.png" alt="calendar" />
                    MY STUDY
                </BannerCommon.BannerPoint>

                <DashBoardTitle>
                    <b>MY SCHEDULE</b>
                </DashBoardTitle>
            </DashBoard>

            <PageGrid>
                {/* UserProFile */}
                {/* <UserProfile /> */}
                <CustumlexColumnDiv>
                    <ScheduleHeader />
                    {/* 서브 라우터 */}
                    {/* <ScheduleRoute
                        setSelectDay={setSelectDay}
                        listData={listData}
                        selectDay={selectDay}
                        paramYear={getYear}
                        paramMonth={getMonth}
                        DdayArr={DdayArr}
                    /> */}
                    {isLoading && <SpinnerLoading />}
                </CustumlexColumnDiv>
            </PageGrid>
        </PageWrapper>
    );
}
