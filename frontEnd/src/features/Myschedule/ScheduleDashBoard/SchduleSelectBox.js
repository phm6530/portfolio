import styled from 'styled-components';

const MarginTop = styled.div`
    margin-top: 5px;
`;

export default function ScheduleSelectBox() {
    return (
        <MarginTop>
            <select>
                <option value="TODAY">TODAY</option>
                <option value="WEEK">WEEK</option>
            </select>
        </MarginTop>
    );
}
