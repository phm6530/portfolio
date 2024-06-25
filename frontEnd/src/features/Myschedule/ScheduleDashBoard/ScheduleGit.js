import { FlexColumnDiv } from '@style/commonStyle';
import styled from 'styled-components';
import { format } from 'date-fns';
import { FaGithub } from 'react-icons/fa';

import { ReactQuery } from 'lib/lib';
import { useEffect, useState } from 'react';
import { fetchGit } from 'services/ScheduleService';
import { SpinnerLoading } from 'component/loading/SpinnerLoading';

import { Button, Skeleton } from '@mui/material';
import useModal from 'hooks/useModal';

const { useQuery } = ReactQuery;

const CustumFlexColumnDiv = styled(FlexColumnDiv)`
    flex-grow: initial;
    /* margin-left: 3rem; */
    width: 100%;
    font-size: 14px;
    .git_contents {
        font-size: 14px;
        margin-bottom: 0.8rem;
        background: #f7fbff;
        flex-grow: 1;
        width: 100%;
        padding: 0.5rem 1rem;
        border-radius: 0.7rem;
        .gitDate {
            font-weight: bold;
        }
    }
    .gitLink {
        display: flex;
        align-items: center;
        font-weight: bold;
        border-radius: 9.5rem;
        margin-bottom: 1rem;
        font-size: 10px;
        /* border: 1px solid #cdcdcd; */
        padding: 0 0.5rem;
        background: #f9f9f9;
        border: 1px solid #dfdfdf;
        cursor: pointer;
        cursor: pointer;
        .gitCount {
            font-size: 1.1rem;
            color: rgba(114, 100, 239, 1);
            margin: 0 1rem;
        }
        svg {
            margin-right: 0.4rem;
            font-size: 1rem;
        }
    }
`;

const ScheduleGit = () => {
    const [commitCount, setCommitCount] = useState([]);

    const { showModalHandler, ModalComponent } = useModal();

    const { data, isLoading } = useQuery({
        queryKey: ['git'],
        queryFn: fetchGit,
    });

    const getUtcKrDate = () => {
        const month = String(new Date().getMonth() + 1).padStart(2, '0');
        const year = new Date().getFullYear();
        const day = String(new Date().getDate()).padStart(2, '0');

        const krDate = new Date(`${year}-${month}-${day}T00:00:00+09:00`);
        const utcDate = krDate.toISOString();

        return utcDate;
    };

    useEffect(() => {
        const utcKrDate = getUtcKrDate();

        const todayGitFilter = data => {
            const todayGit = data
                .filter(e => {
                    // console.log(e.commit.committer.date, e.commit.message);
                    return e.commit.committer.date > utcKrDate;
                })
                .map(e => {
                    return {
                        message: e.commit.message,
                        date: e.commit.committer.date,
                    };
                });
            return todayGit;
        };

        if (data) {
            const todayGitData = todayGitFilter(data);
            // console.log(todayGitData);
            setCommitCount(todayGitData);
        }
    }, [data]);

    const GitCommitLog = ({ commitCount }) => {
        return (
            <>
                {commitCount.length !== 0
                    ? commitCount.map((e, idx) => (
                          <div className="git_contents" key={idx}>
                              <div className="gitDate">
                                  {format(e.date, 'MM. dd')}
                              </div>
                              {e.message}
                          </div>
                      ))
                    : 'Commit 이력이 없습니다.'}
            </>
        );
    };

    return (
        <>
            <ModalComponent />

            <CustumFlexColumnDiv>
                {!isLoading ? (
                    <>
                        <div className="gitLink">
                            <FaGithub /> Commit Count
                            <span className="gitCount">
                                {commitCount.length}
                            </span>
                        </div>
                        <Button
                            variant="custom"
                            onClick={() =>
                                showModalHandler(
                                    <GitCommitLog
                                        isLoading={isLoading}
                                        commitCount={commitCount}
                                    />,
                                )
                            }
                        >
                            asdf
                        </Button>
                    </>
                ) : (
                    <SpinnerLoading />
                )}
            </CustumFlexColumnDiv>
        </>
    );
};

export default ScheduleGit;
