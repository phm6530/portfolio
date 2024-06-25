import ScheduleDashBoard from 'features/Myschedule/ScheduleDashBoard';
import ScheduleSummary from 'features/Myschedule/ScheduleSummary';
import ScheduleDdayList from 'features/Myschedule/ScheduleDday';
import { FlexRow } from '@style/commonStyle';
import { TodaySeletor } from 'utils/TodaySeletor';
import ScheduleGit from 'features/Myschedule/ScheduleDashBoard/ScheduleGit';
import ScheduleList from 'features/Myschedule/ScheduleContainer/ScheduleList';
import CardSubtitle from 'features/Myschedule/component/CardSubtitle';
import ScheduleTimer from 'features/Myschedule/ScheduleTimer';
import { LeftWrap, SubTitle, RightWrap } from '@style/commonStyle';

const DashBoardPage = props => {
    const { DdayArr } = props;

    const today = TodaySeletor();

    return (
        <>
            <FlexRow>
                <LeftWrap>
                    <ScheduleTimer />

                    <CardSubtitle
                        title={'D - Day Schedule'}
                        redirectTo={'/myschedule/Task'}
                        // buttonText={'Task'}
                    />
                </LeftWrap>

                <RightWrap>
                    {/* Summary */}
                    <SubTitle>MY STATUS</SubTitle>
                    <ScheduleGit />
                    {/* Rank */}
                    <ScheduleDashBoard />
                    {/* Summary */}
                    <ScheduleSummary {...props} />
                    <CardSubtitle
                        title={'Today Task'}
                        isRedirect={true}
                        redirectTo={'/myschedule/Task'}
                        buttonText={'Task'}
                    />
                    <ScheduleList
                        selectDay={today()}
                        listData={props.listData} //업로드해야할 날짜
                    />{' '}
                    {/*  */}
                </RightWrap>
            </FlexRow>
        </>
    );
};

export default DashBoardPage;
