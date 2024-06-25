import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';
import { SubDepsTitle } from '@style/commonStyle';

const MarginLeft = styled.div`
    margin-left: auto;
`;
const More = styled.div`
    width: 17px;
    height: 17px;
    margin-left: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(241 245 250);
    svg {
        font-size: 10px;
        color: rgb(98 99 121);
    }
`;

const Link = styled.div`
    display: inline-flex;
    align-items: center;
    color: rgb(99 104 129);
    font-size: 12px;
    cursor: pointer;
    font-weight: normal;
`;

const CardSubTitleWrap = styled.div`
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

const CardSubtitle = ({
    title,
    isRedirect = false,
    redirectTo,
    buttonText,
}) => {
    const navigate = useNavigate();
    return (
        <CardSubTitleWrap>
            <SubDepsTitle>{title}</SubDepsTitle>

            <MarginLeft>
                <Link
                    onClick={() =>
                        isRedirect
                            ? navigate(redirectTo)
                            : window.open(redirectTo, '_blank')
                    }
                >
                    {buttonText}

                    <More>
                        <FaPlus />
                    </More>
                </Link>
            </MarginLeft>
        </CardSubTitleWrap>
    );
};

export default CardSubtitle;
