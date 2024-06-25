import styled from 'styled-components';

const SummaryHeaderStyle = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
`;

const Button = styled.button`
    padding: 0.3rem 1.2rem;
    margin-right: 0.4rem;
    font-size: 12px;
    border-radius: 2rem;
    color: rgba(114, 100, 239, 1);
    border: 1px solid transparent;
    ${props =>
        props.$active &&
        'font-weight: bold; border: 1px solid rgba(114, 100, 239, .3);'};
`;

const select = ['today', 'Week'];

const SummaryHeader = ({ viewRage, setViewRage }) => {
    return (
        <SummaryHeaderStyle>
            {select.map((e, idx) => {
                return (
                    <Button
                        type="button"
                        key={idx}
                        onClick={() => setViewRage(e)}
                        $active={viewRage === e}
                    >
                        {e === 'today' ? '오늘' : '이번주'}
                    </Button>
                );
            })}
        </SummaryHeaderStyle>
    );
};

export default SummaryHeader;
