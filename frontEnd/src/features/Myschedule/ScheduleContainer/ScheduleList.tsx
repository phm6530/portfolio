import ListHandler from '../component/ListHandler';
import { useState } from 'react';
import { filterByDate } from '../component/filterByOrder';

const ScheduleList = ({ selectDay, listData }) => {
    const [selectWork, setSelectWork] = useState(null);

    //오늘날짜 필터링
    const filterArr = filterByDate(listData, selectDay);
    filterArr.sort((a, b) => b.important - a.important);

    // console.log(listData);

    return (
        <>
            {filterArr.length === 0 && (
                <div>
                    {selectDay && selectDay.replaceAll('-', '. ')}은 일정이
                    없습니다.
                </div>
            )}

            {filterArr.map((Schedule, idx) => {
                // console.log(Schedule);
                return (
                    <ListHandler
                        idx={idx}
                        key={Schedule.id}
                        ScheduleItem={Schedule}
                        setSelectWork={setSelectWork}
                        selectWork={selectWork}
                    />
                );
            })}
        </>
    );
};

export default ScheduleList;
