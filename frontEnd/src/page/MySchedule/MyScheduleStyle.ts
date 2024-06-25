import styled from 'styled-components';
import { Grid } from '../../component/ui/Grid';

const ScheduleGrid = styled(Grid)`
    padding-top: 25rem;
    display: flex;
`;

const ContentsWrap = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 1.5rem;
`;

export { ScheduleGrid, ContentsWrap };
