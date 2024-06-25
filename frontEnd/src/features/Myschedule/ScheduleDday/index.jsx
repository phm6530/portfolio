import styled from 'styled-components';
import { MdCancel } from 'component/icon/Icon';

import { useAuthCheck } from 'hooks/useAuthCheck';
import { fetchDeleteSchedule } from 'services/ScheduleService';
import useExcuteMutation from 'hooks/useExcuteMutation';
import usePopup from 'hooks/usePopup';
import { format } from 'date-fns';

const SummeryStyle = styled.div`
    border-radius: 1em;
`;

const DdayArrtyle = styled.div`
    display: flex;
    margin-bottom: 1rem;
    border-radius: 0.5em;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.07);
    border-radius: 14px;
    padding: 1rem 1.5rem;
    align-items: flex-start;
    align-items: center;
    .imgWrap {
        display: none;
        margin-right: 1rem;
        img {
            width: 30px;
        }
    }

    padding: 1rem 1.5rem;
    p {
        font-size: 14px;
        margin-top: 0.4rem;
    }
    span {
        font-weight: bold;
        font-size: 16px;
    }
`;

const DdayHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .countNum {
        font-size: 18px;
        letter-spacing: -0.07em;
        color: #565b68;
    }
    svg {
        cursor: pointer;
        opacity: 0.4;
        color: #8f9db8;
        &:hover {
            color: #384867;
        }
    }
    .date {
        margin-right: auto;
        font-size: 0.7rem;
        margin-left: 1rem;
        opacity: 0.4;
    }
`;
const DdayItem = styled.div`
    /* Rectangle 410 */
    box-sizing: border-box;
    background: #ffffff;
    box-shadow: 7px 8px 42.7px rgba(199, 198, 217, 0.19);
    border-radius: 19px;
`;

const DdayTask = ({ task }) => {
    const { checkHandler } = useAuthCheck();
    const { showPopup, PopupComponent } = usePopup();

    const { work, schedule_key, formatted_date } = task;
    const currentDate = new Date();
    const taskDate = new Date(formatted_date);
    const dayDifference = (currentDate - taskDate) / (1000 * 3600 * 24);
    const count = Math.ceil(dayDifference);

    const { mutate: deleteMutate } = useExcuteMutation(
        fetchDeleteSchedule,
        ['Schedule'],
        '삭제',
    );

    const deleteHandler = () => {
        if (!checkHandler('삭제')) {
            return;
        }
        deleteMutate(schedule_key);
    };

    return (
        <>
            <PopupComponent event={deleteHandler} />

            <DdayArrtyle>
                <div className="imgWrap">
                    <img src="/img/calendar/talk.png" alt="" />
                </div>

                <div style={{ flexGrow: 1 }}>
                    <DdayHeader>
                        <span className="countNum">D {count}</span>
                        <span className="date">
                            {format(formatted_date, 'yyyy. MM. dd')}
                        </span>
                        <span
                            onClick={() => {
                                showPopup(work);
                            }}
                        >
                            <MdCancel />
                        </span>
                    </DdayHeader>
                    <p>{work}</p>
                </div>
            </DdayArrtyle>
        </>
    );
};

const ScheduleDdayList = ({ DdayArr }) => {
    return (
        <>
            <SummeryStyle>
                {DdayArr &&
                    DdayArr.map((task, idx) => {
                        return (
                            <DdayItem key={`DdayTask-${idx}`}>
                                <DdayTask task={task} />
                            </DdayItem>
                        );
                    })}
            </SummeryStyle>
        </>
    );
};

export default ScheduleDdayList;
