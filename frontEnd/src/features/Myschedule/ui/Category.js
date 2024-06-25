import styled from 'styled-components';

const CategoryStyle = styled.span`
    font-size: 0.7rem;
    padding: 2px 0px;
    opacity: 0.5;
    border-radius: 11px;
`;

export default function Category({ children }) {
    return <CategoryStyle>{children}</CategoryStyle>;
}
