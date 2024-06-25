import styled from 'styled-components';

const HourStyle = styled.span`
    font-size: 16px;
    letter-spacing: -0.01em;
    position: relative;
    margin-left: 1rem;
    margin-left: auto;
    margin-right: 1rem;
    font-weight: bold;
    &::after {
        position: absolute;
        bottom: 0;
        display: block;
        width: calc(100% + 20px);
        height: 14px;
        left: -5px;
        margin-right: 20px;
        z-index: 0;
        opacity: 0.1;
        border-radius: 1em;
        background: #b4c7ff;
        content: '';
    }
`;

const FoucesStyle = styled.span`
    background: #eef0ff;
    padding: 0.2rem 1rem;
    border-radius: 1rem;
    font-weight: bold;
    font-size: 12px;
    color: #404d58;
`;

const SubTitleSchedule = styled.div`
    /* D - Day */
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: -0.04em;
    color: #1a202c;
    margin-bottom: 1rem;
    width: 100%;
    border-bottom: 1px solid #ededed;
    padding-bottom: 0.5rem;
    margin-left: 0.2rem;
    display: flex;
`;

export { HourStyle, FoucesStyle, SubTitleSchedule };
