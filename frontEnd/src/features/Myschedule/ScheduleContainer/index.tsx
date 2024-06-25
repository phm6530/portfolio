import styled from 'styled-components';
import ScheduleAdd from './ScheduleAdd';
import 'react-day-picker/dist/style.css';

import ScheduleList from './ScheduleList';
import { SubDepsTitle } from '@style/commonStyle';

import { AnimatePresence } from 'framer-motion';
import Motion from 'component/animations/Motion';

const ScheduleWrap = styled.div`
    flex-grow: 1;
`;

const SubDepsTitleCustum = styled(SubDepsTitle)`
    margin-top: 4rem;
`;

export default function ScheduleContainer({ selectDay, listData }) {
    //dDay Popup
    // const formMethods = useForm({
    //     defaultValues: {
    //         dDay: '',
    //     },
    // });
    /* Subtract */

    return (
        <>
            <ScheduleWrap>
                <SubDepsTitleCustum>Task List</SubDepsTitleCustum>
                {/* <DayStyle>{selectDay.replaceAll('-', '. ')}</DayStyle> */}
                <AnimatePresence mode="wait">
                    <Motion.FadeInOut key={selectDay}>
                        <ScheduleList
                            listData={listData}
                            selectDay={selectDay} //업로드해야할 날짜
                        />
                    </Motion.FadeInOut>
                </AnimatePresence>
                <ScheduleAdd
                    selectDay={selectDay} //업로드해야할 날짜
                />
            </ScheduleWrap>
        </>
    );
}
