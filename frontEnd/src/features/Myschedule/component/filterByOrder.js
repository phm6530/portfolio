import { format } from 'date-fns';

const filterByDate = (arr = {}, selectDay) => {
    const targetDay = format(selectDay, 'yyyy-MM-dd');
    let filterArr = [];
    for (const [date, events] of Object.entries(arr)) {
        if (targetDay === date) {
            filterArr = filterArr.concat(events);
        }
    }
    // console.log(filterArr);
    return filterArr;
};

export { filterByDate };
