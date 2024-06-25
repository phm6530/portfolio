import ProjectListItem from '@features/project/ProjectListItem';
import { SubTitle } from 'component/ui/Subtitle';
import PostAddBtn from 'component/ui/PostAddBtn';
import CateGoryButton from 'component/ui/CateGoryButton';
import { ReactRouteDom } from 'lib/lib';
import SkeletonPost from 'component/loading/Skeleton';
import SearchForm from 'component/ui/SearchForm';

import {
    NoSeachingData,
    ProjectListStyle,
    FlexRow,
} from '@features/project/ProjectListStyle';

import useFetchProjectList from '@features/project/hooks/useFetchProjectList';
import useStore from 'store/zustandStore';

const { useSearchParams } = ReactRouteDom;

export default function ProjectList(): JSX.Element {
    const { data = [], isLoading, isError } = useFetchProjectList();
    const login = useStore(state => state.userAuth.login);
    const [param] = useSearchParams();
    const SeachValue = param.get('search');

    const SeachArr = data.filter(e => {
        if (SeachValue === 'All') {
            return true;
        } else if (SeachValue && SeachValue !== 'All') {
            return e.hashtag.includes(SeachValue);
        }
        return false;
    });

    const ProjectArr = SeachValue ? SeachArr : data && data;
    const CateGory = ['All', '반응형', 'React', '참여율 100%'];

    return (
        <>
            <ProjectListStyle>
                <SubTitle>
                    <div className="subText">
                        <span className="point">MY PORTPOLIO</span>{' '}
                        <span style={{ marginRight: 'auto' }}>LIST</span>
                    </div>

                    {/* add Project */}
                    {login && <PostAddBtn />}
                </SubTitle>
                {/* List */}
                <FlexRow>
                    <CateGoryButton CateGory={CateGory} type={'queryString'} />
                    {/* 검색창 */}
                    <SearchForm />
                </FlexRow>
                {!isLoading && SeachValue && SeachArr.length === 0 && (
                    <NoSeachingData>
                        &quot;{SeachValue}&quot; 키워드와 일치하는 항목이 없음
                    </NoSeachingData>
                )}
                {!isLoading && isError && 'error'}
                {!isLoading ? (
                    <>
                        {data.length === 0 && '등록된 프로젝트가 없습니다..'}
                        {ProjectArr.map(project => {
                            return (
                                <ProjectListItem
                                    project={project}
                                    key={project.projectKey! + SeachValue}
                                />
                            );
                        })}
                    </>
                ) : (
                    <>
                        {/* 스켈레톤 */}
                        <SkeletonPost listCnt={6} />
                    </>
                )}
            </ProjectListStyle>
        </>
    );
}
