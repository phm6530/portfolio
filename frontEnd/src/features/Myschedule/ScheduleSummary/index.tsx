import { BoxStyle, FlexWrapDiv } from '@style/commonStyle';
import SummaryHeader from '../ScheduleDashBoard/SummaryHeader';
import TotalGraph from '../component/TotalGraph';
import CategoryGraph from './CategoryGraph';

import styled from 'styled-components';
import useCategoryFilter from 'hooks/useCategoryFilter';
import CardSubtitle from '../component/CardSubtitle';

const CustumFlexWrapDiv = styled(FlexWrapDiv)`
    flex-grow: 1;
`;

const FlexGrow = styled(BoxStyle)`
    flex-grow: 1;
`;

const ScheduleSummary = props => {
    const { listData, selectDay } = props;
    // console.log(props);

    const {
        cateGorys,
        selectDateRange,
        categoryFilter: arrState,
        setViewRage,
        viewRage,
    } = useCategoryFilter({
        listData,
    });

    return (
        <FlexGrow>
            <CardSubtitle
                title={'MY Schedule Summary'}
                isRedirect={true}
                redirectTo={'/myschedule/report'}
                buttonText={'Report'}
            />

            <CustumFlexWrapDiv>
                <SummaryHeader viewRage={viewRage} setViewRage={setViewRage} />
                {arrState && (
                    <TotalGraph
                        selectDateRange={selectDateRange}
                        viewRage={viewRage}
                        arrState={arrState}
                        {...props}
                    />
                )}
                {/* CategoryGraph */}
                <CategoryGraph
                    selectDay={selectDay}
                    viewRage={viewRage}
                    categorys={cateGorys}
                    arrState={arrState}
                />
            </CustumFlexWrapDiv>
        </FlexGrow>
    );
};

export default ScheduleSummary;
