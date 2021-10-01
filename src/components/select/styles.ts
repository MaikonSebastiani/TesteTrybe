import styled from 'styled-components';

export const Container = styled.div`
    display: inline-block;
    min-width: 200px;
    vertical-align: top;
    & + div {
            margin-left: 15px;
        }
`;

export const SelectOption = styled.select`
    width: 100%;
    padding: 10px;
    height: 40px;
`;
export const Error = styled.span`
    color: #d90a0a;
    padding: 5px 0;
    display: block;
`;
