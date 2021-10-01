import styled, { css } from 'styled-components';

interface InputProps {
    width: string
}

export const Container = styled.input<InputProps>`
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 5px;
    border: solid 1px;
    display: block;
    margin: 0 auto 15px;

    ${(props) => props.width && css`
        width:  ${props.width};
    `}
`;
