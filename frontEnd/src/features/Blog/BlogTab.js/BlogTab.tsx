import { useEffect, useState } from 'react';
import { type BlogCategorylist } from '@type/BlogTypes';
import AccodianTab from '@features/Blog/BlogTab.js/BlogTabAcodian';
import styled from 'styled-components';
import { device } from 'config/DeviceConfig';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from 'services/queryKey';
import { fetchBlogCategory } from 'services/blogService';

const TabWrapper = styled.div`
    margin-left: 3rem;
    @media ${device.tablet} {
        margin-left: 0;
    }
`;

const BlogTab = () => {
    const { data, isLoading } = useQuery<BlogCategorylist, Error>({
        queryKey: [queryKey.blogCategory],
        queryFn: fetchBlogCategory,
    });

    const [categories, setCategories] = useState<BlogCategorylist | null>(null);

    useEffect(() => {
        if (!isLoading && data) {
            setCategories(data);
        }
    }, [data, isLoading]);

    return (
        <TabWrapper>
            {categories &&
                Object.keys(categories).map((category, idx) => (
                    <AccodianTab
                        list={categories[category]}
                        category={category}
                        idx={idx}
                        key={idx}
                    />
                ))}
        </TabWrapper>
    );
};

export default BlogTab;
