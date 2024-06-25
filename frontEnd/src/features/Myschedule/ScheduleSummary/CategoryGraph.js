import PrograssBar from '../component/PrograssBar';
import { FlexColumnDiv } from '@style/commonStyle';
import styled from 'styled-components';

const CustumFlexColumnDiv = styled(FlexColumnDiv)`
    margin-left: 4rem;
    flex-grow: 1;

    /* flex-grow: initial; */
    .CategoryWrapTitle {
        font-size: 14px;
        line-height: 17px;
        letter-spacing: -0.08em;
        display: inline-block;
        margin-bottom: 1rem;
        color: #7b7d93;
    }
`;

const CategoryGraph = props => {
    const { categorys = [], arrState } = props;
    console.log(props);
    return (
        <CustumFlexColumnDiv>
            {/* <span className="CategoryWrapTitle">카테고리 별 완료도</span> */}
            {categorys.length !== 0 ? (
                categorys.map((v, idx) => {
                    const tasks = arrState[v];
                    return <PrograssBar tasks={tasks} key={`key-${idx}`} />;
                })
            ) : (
                <div>
                    일정이 없네요
                    <span>{props.selectDay?.slice(5).replace('-', '. ')}</span>
                    은 ...
                </div>
            )}
        </CustumFlexColumnDiv>
    );
};

export default CategoryGraph;
