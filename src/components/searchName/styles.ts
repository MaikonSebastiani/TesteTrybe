import styled, { css } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
    width: 100%;
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 5px;
    margin: 0 auto 15px;
    display: flex;
    align-items: center;
    justify-content: center;

`;
export const Button = styled.button`
    padding: 10px;
    min-height: 40px;
    width: 100px;
    background-color: #3636bb;
    color: #fff;
    border: solid 1px;
    margin-left: 15px;
    &:hover {
        background: ${shade(0.2, '#3636bb')}
    }
`;
