import { SubTitle } from 'component/ui/Subtitle';
import styled from 'styled-components';
import CateGoryButton from 'component/ui/CateGoryButton';
const HeaderStyle = styled.div`
    display: flex;
`;

const CustumSubTitle = styled(SubTitle)`
    width: auto;
    margin-bottom: 0;
`;

const ScheduleHeader = () => {
    const CateGory = ['DashBoard', 'Task', 'report'];
    return (
        <>
            <HeaderStyle>
                <CustumSubTitle>
                    <div className="subText">
                        <div className="point">MY SCHEDULES</div>
                    </div>
                </CustumSubTitle>
            </HeaderStyle>
            <CateGoryButton CateGory={CateGory} />
        </>
    );
};

export default ScheduleHeader;
