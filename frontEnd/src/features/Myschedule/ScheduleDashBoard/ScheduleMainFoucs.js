import { SubTitleTextStyle } from 'features/CommonStyles';
import { HourStyle } from '../component/styles/ScheduleCommonStyles';
import { FaCrown } from 'react-icons/fa';
import styled from 'styled-components';
import { format } from 'date-fns';

const ItemWrap = styled.div`
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.05em;
    padding: 0.8rem;
    width: 50%;
    box-shadow: 7px 8px 42.7px rgba(199, 198, 217, 0.19);
    border-radius: 23px;
`;
const Ranking = styled.span`
    /* 1st */
    font-size: 14px;
    line-height: 17px;
    color: #7e96a6;
    margin-right: 1rem;
    width: 30px;
    svg {
        color: #f3923b;
    }
`;

const Wrapper = styled.div`
    width: 100%;
`;

const Category = styled.span`
    font-weight: bold;
`;

const ScheduleMainFoucs = ({ timerData, categoryDailyTotals }) => {
    const today = format(new Date(), 'yyyy-MM-dd');

    const filterDate = categoryDailyTotals.filter(e => {
        return e.date === today;
    });

    const parseTotalTime = time => {
        const [hour, minutes, seconed] = time.split(':').map(e => +e);
        return hour * 3600 + minutes * 60 + seconed;
    };

    // const hour = Math.floor(total / 3600);
    // const minites = Math.floor((total % 3600) / 60);
    // const seconed = total % 60;

    // 선택정렬
    filterDate.sort(
        (a, b) => parseTotalTime(b.totalTime) - parseTotalTime(a.totalTime),
    );

    // const Hour = 10;
    // const foucs = 'Coding';
    return (
        <Wrapper>
            {filterDate.map((item, idx) => {
                const arr = ['1st', '2nd', '3nd'];

                return (
                    <ItemWrap key={idx}>
                        <Ranking>{idx === 0 ? <FaCrown /> : arr[idx]}</Ranking>
                        <Category>{item.category}</Category>
                        <HourStyle>{item.totalTime}</HourStyle>
                    </ItemWrap>
                );
            })}
            {/* {show === 'hour' ? (
                <Heading>
                    <HourStyle>{Hour}h</HourStyle>
                </Heading> 
            ) : (
                <Heading>
                    <HourStyle>{foucs}</HourStyle>
                </Heading>
            )} */}
        </Wrapper>
    );
};

export default ScheduleMainFoucs;
