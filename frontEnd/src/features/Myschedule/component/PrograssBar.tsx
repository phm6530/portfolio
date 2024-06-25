import { FlexColumnDiv, SubTitleTextStyle } from '@style/commonStyle';
import styled from 'styled-components';
import { PercentCalculator } from 'utils/Calculator';

import usePrograssbar from 'hooks/usePrograssbar';
import useTextsnap from 'hooks/useTextsnap';
import { FlexRow } from '@style/commonStyle';
import { TbDeviceImacSearch } from 'react-icons/tb';
import { IoFitnessOutline } from 'react-icons/io5';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import Prograssbar from 'component/ui/Prograssbar';

const CompleteStyle = styled.div`
    color: #4dacd2;
    font-size: 20px;
    display: inline-block;
    padding: 0 0.4rem;
    margin: 0;
    border-radius: 1rem;
    margin-right: auto;

    opacity: 0;
    transition: opacity 0.5s ease;
    ${props => {
        return props.$active && `opacity: 1`;
    }};
`;

const CategoryIconStyle = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 100%;
    border: 5px solid rgba(0, 0, 0, 0.05);
    margin-right: 1rem;

    display: flex;
    align-items: center;
    justify-content: center;
    svg {
        font-size: 21px;
    }
    ${props => {
        switch (props.$catecory) {
            case 'Study':
                return 'background : rgb(233 238 245); color: #748295;';
            case 'Fitness':
                return 'background : rgb(238 237 251); color: #748295;';
            case 'Coding':
                return 'background : rgb(254 234 241); color: #748295;';
            default:
                return 'red';
        }
    }};
`;

const CustumFlexRow = styled(FlexRow)`
    margin-bottom: 1rem;
    width: 100%;
    flex-grow: 1;
`;

const FlexGrowColumnDiv = styled(FlexColumnDiv)`
    flex-grow: 1;
`;

export default function PrograssBar({ tasks }) {
    const { result: percent } = PercentCalculator(tasks);

    const PrograssRef = usePrograssbar(percent);
    const textRef = useTextsnap(percent);
    // useEffect(() => {
    //     // console.log(ref);
    //     const io = new IntersectionObserver(
    //         entry => {
    //             if (entry[0].isIntersecting) {
    //                 // console.log('발견');
    //             }
    //         },
    //         { threshold: 0.1 },
    //     );
    //     if (ref) {
    //         io.observe(ref.current);
    //     }

    //     return () => {
    //         io.disconnect(ref.current);
    //     };
    // }, []);

    // console.log(tasks);
    const CategoryIcon = ({ catecory }) => {
        const Icon = catecory => {
            switch (catecory) {
                case 'Study':
                    return <HiOutlinePencilSquare />;
                case 'Fitness':
                    return <IoFitnessOutline />;
                case 'Coding':
                    return <TbDeviceImacSearch />;
            }
        };
        return (
            <CategoryIconStyle $catecory={catecory}>
                {Icon(catecory)}
            </CategoryIconStyle>
        );
    };
    return (
        <CustumFlexRow>
            <CategoryIcon catecory={tasks[0].category} />

            <FlexGrowColumnDiv>
                <SubTitleTextStyle>
                    <span className="categoryTitle">{tasks[0].category}</span>
                    <CompleteStyle $active={percent === 100}>
                        <IoIosCheckmarkCircleOutline />
                    </CompleteStyle>
                </SubTitleTextStyle>
                <Prograssbar percent={percent} />
            </FlexGrowColumnDiv>
        </CustumFlexRow>
    );
}
