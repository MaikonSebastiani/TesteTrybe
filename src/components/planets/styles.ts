import styled from 'styled-components';

export const Component = styled.tbody`
    td {
        border-right: solid 1px;
        &:last-child {
            border: none;
        }
    }
`;
