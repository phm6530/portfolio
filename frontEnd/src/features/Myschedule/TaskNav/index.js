import useCategoryFilter from 'hooks/useCategoryFilter';
import CategoryGraph from '../ScheduleSummary/CategoryGraph';
import styled from 'styled-components';
import { TodaySeletor } from 'utils/TodaySeletor';
import { Button } from 'component/ui/Button';
import { useSearchParams } from 'react-router-dom';
import ScheduleDdaySetter from '../component/ScheduleDdaySetter';
import { format } from 'date-fns';
import TotalGraph from '../component/TotalGraph';
import { SubDescription, SubTitle } from '@style/commonStyle';
import useModal from 'hooks/useModal';

const ButtonNavWrap = styled.div`
    border-radius: 1em;

    /* box-shadow:
        -4px -4px 15px rgba(255, 255, 255, 0.7),
        4px 4px 15px rgba(36, 36, 36, 0.15); */
    /* width: 100%; */
    /* padding: 10px; */
    border-radius: 1em;
    display: flex;
    justify-content: flex-start;
    /* margin-bottom: 2rem; */
`;

const CategoryGraphStyle = styled(CategoryGraph)`
    width: 50%;
`;

const SelelctDayDescript = styled.div`
    /* width: 40%; */
`;

const FontWrapper = styled.div`
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
`;

const Wrapper = styled.div`
    display: flex;
    background: #fff;
    padding: 2rem 2.5rem;
    border: 1px solid #7d879c4a;
    min-height: 250px;
    border-radius: 1rem;
    align-items: center;
    justify-content: center;
    justify-content: flex-start;
`;

const TaskNav = ({ listData = {}, selectDay, setSelectDay }) => {
    const { cateGorys, categoryFilter, viewRage } = useCategoryFilter({
        listData,
        selectDay,
    });

    const { showModalHandler, ModalComponent } = useModal();

    const [, setSeachParam] = useSearchParams();

    const todayButton = () => {
        setSelectDay(today());
        setSeachParam({
            year: today().split('-')[0],
            month: today().split('-')[1],
        });
    };

    // // 현재 URL의 검색 파라미터 객체 생성
    // const searchParams = new URLSearchParams(window.location.search);

    // // 검색 파라미터 수정
    // searchParams.set('year', todayStr.split('-')[0]);
    // searchParams.set('month', todayStr.split('-')[1]);

    // const DdayPopupShow = () => {
    //     setDdayForm(prev => !prev);
    // };

    const today = TodaySeletor();

    // console.log('selectDay', selectDay);
    return (
        <>
            <ModalComponent />
            {/* {dDayForm && <Popup closePopup={() => setDdayForm(false)}></Popup>} */}

            <SelelctDayDescript>
                <FontWrapper>
                    <SubTitle>MY TASK</SubTitle>

                    <ButtonNavWrap>
                        <Button.ForsquareBtn onClick={() => todayButton()}>
                            ToDay
                        </Button.ForsquareBtn>
                        <Button.ForsquareBtn
                            onClick={() =>
                                showModalHandler(<ScheduleDdaySetter />)
                            }
                        >
                            D-day 설정
                        </Button.ForsquareBtn>
                    </ButtonNavWrap>
                </FontWrapper>
                <SubDescription>
                    {format(selectDay, 'yyyy. MM. dd')} 일의 일정을 기록합니다.
                </SubDescription>
            </SelelctDayDescript>

            {/* 카테고리 */}

            <Wrapper>
                {cateGorys.length !== 0 ? (
                    <>
                        <TotalGraph
                            selectDateRange={[selectDay]}
                            viewRage={viewRage}
                            arrState={categoryFilter}
                        />

                        <CategoryGraphStyle
                            selectDay={selectDay}
                            viewRage={viewRage}
                            categorys={cateGorys}
                            arrState={categoryFilter}
                        />
                    </>
                ) : (
                    '일정이 없습니다..'
                )}
            </Wrapper>
        </>
    );
};

export default TaskNav;
