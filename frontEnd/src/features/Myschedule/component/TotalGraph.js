import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { PercentCalculator } from 'utils/Calculator';

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`;

const Day = styled.span`
    font-size: 0.8rem;
    font-weight: bold;
`;

const TotalorComplete = styled.div`
    font-size: 14px;
    margin-top: 1rem;
    span:nth-of-type(2) {
        margin-right: 1rem;
    }
    .num {
        margin-left: 0.2rem;
        color: rgb(65 49 203);
        font-weight: bold;
    }
`;

const TotalGraph = props => {
    const { selectDateRange, arrState } = props;
    const counterRef = useRef(null);

    // console.log(
    //     'selectDateRangeselectDateRangeselectDateRange',
    //     selectDateRange,
    // );

    const values = Object.values(arrState);
    const weekArr = () => {
        let arr = [];
        values.forEach(item => {
            arr = arr.concat(item);
        });
        return {
            arr,
            test: () => {
                return arr.length;
            },
        };
    };
    const { arr, test } = weekArr(arrState);
    const { result, completeCount } = PercentCalculator(arr);

    useEffect(() => {
        gsap.to('.circular-pbar', {
            '--p': `${result}%`,
            duration: 2,
            ease: 'expo.out',
        });

        // GSAP 애니메이션: 숫자 증가
        if (counterRef.current) {
            const startValue = +counterRef.current.innerHTML;
            gsap.fromTo(
                counterRef.current,
                { innerHTML: startValue }, //시작
                {
                    innerHTML: result, //최종상태
                    duration: 1, //걸리는 시간임
                    ease: 'power1.out', //가속도 조정 이건 공식문서 확인 ㄱㄱ
                    roundProps: 'innerHTML', //innerHTMl가 올라간다라는 소리
                    snap: { innerHTML: 1 }, //1단위로 스냅한다는 뜻
                },
            );
        }
    }, [result]);

    return (
        <Wrap>
            <div>
                {selectDateRange.map((e, idx) => {
                    if (idx === 1) {
                        return <Day key={idx}>~ {e}</Day>;
                    } else {
                        return <Day key={idx}>{e}</Day>;
                    }
                })}
            </div>
            <div className="circular-pbar">
                <div className="circular-pbar-counter">
                    <span ref={counterRef}></span>%
                </div>
            </div>
            <TotalorComplete>
                <span>전체</span> <span className="num">{test()}</span>
                <span>완료</span> <span className="num">{completeCount}</span>
            </TotalorComplete>
        </Wrap>
    );
};

export default TotalGraph;
