import ScheduleContainer from 'features/Myschedule/ScheduleContainer';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import ScheduleDdayList from 'features/Myschedule/ScheduleDday';
import TaskNav from 'features/Myschedule/TaskNav';
import Motion from 'component/animations/Motion';
import { AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { SubDepsTitle, LeftWrap, RightWrap } from '@style/commonStyle';

// import Calendar from 'features/Myschedule/Calendar';

const MotionPageCustum = styled(Motion.Page)`
    flex-grow: 1;
`;

const SubDepsTitleCustum = styled(SubDepsTitle)`
    margin-top: 4rem;
`;

const DayPickerStyle = styled(DayPicker)`
    padding: 1rem;
    margin-bottom: 2rem !important;
    box-shadow: 7px 8px 42.7px rgba(199, 198, 217, 0.19);
    border-radius: 2rem;
    box-sizing: border-box;
    background: url(/img/board/board.jpg);
    background-size: cover;
    border: 10px solid #0000007a;
    box-shadow: 13px 28px 35.9px rgb(0 0 0 / 55%);
`;

const FlexRowWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const TaskPage = props => {
    const {
        setSelectDay,
        listData,
        selectDay,
        paramYear,
        paramMonth,
        DdayArr,
    } = props;

    const bookedDayss = listData && Object.keys(listData).map(e => new Date(e));

    const [param] = useSearchParams();
    const getYear = param.get('year');
    const getMonth = param.get('month');

    // const bookedStyle = { border: '2px solid red' };
    const modifiersStyles = {
        selected: { backgroundColor: 'rgb(201 115 201)', color: '#fff' }, // 예시: 파란 배경에 흰 글씨
        // booked: bookedStyle, // bookedStyle은 사전에 정의된 스타일 객체이어야 함
    };

    const test = date => {
        if (!date) return; // date undefined 취소방지
        const formating = format(date, 'yyyy-MM-dd');
        setSelectDay(formating);
    };

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleMonthChange = date => {
        console.log('date :::::::::::', date);
        const dateFormat = format(date, 'yyyy-MM').split('-');
        navigate(`${pathname}?year=${dateFormat[0]}&month=${+dateFormat[1]}`);
    };

    const monthCaculator = () => {
        const test = new Date(`${getYear}-${getMonth}`);
        return test;
    };

    return (
        <FlexRowWrapper>
            {/* <ScheduleDdayList DdayArr={DdayArr} /> */}
            <LeftWrap>
                <DayPickerStyle
                    className="custumDaypicker"
                    mode="single"
                    selected={new Date(selectDay)}
                    onSelect={e => test(e)}
                    modifiers={{ booked: bookedDayss }}
                    modifiersStyles={modifiersStyles}
                    modifiersClassNames={{ booked: 'bookedDay' }}
                    onMonthChange={e => handleMonthChange(e)}
                    month={getMonth ? monthCaculator() : selectDay}
                    // footer={footer}
                />

                <div className="wrapper">
                    <SubDepsTitleCustum>D-day</SubDepsTitleCustum>
                    <ScheduleDdayList DdayArr={DdayArr} />
                </div>
                {/* <Calendar
                setSelectDay={setSelectDay}
                listData={listData}
                selectDay={selectDay}
                paramYear={paramYear}
                paramMonth={paramMonth}
            /> */}
            </LeftWrap>
            <RightWrap>
                <AnimatePresence mode="wait">
                    <MotionPageCustum key={selectDay}>
                        <div className="flex-column-wrap flex-grow">
                            <TaskNav
                                selectDay={selectDay}
                                listData={listData}
                                setSelectDay={setSelectDay}
                            />

                            <ScheduleContainer
                                selectDay={selectDay}
                                listData={listData}
                                setSelectDay={setSelectDay}
                            />
                        </div>
                    </MotionPageCustum>
                </AnimatePresence>
            </RightWrap>
        </FlexRowWrapper>
    );
};

export default TaskPage;
