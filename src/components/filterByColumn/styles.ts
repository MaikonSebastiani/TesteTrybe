import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
    disabled: boolean
}
interface OptionsProps {
    hidden?: boolean
}
export const Container = styled.div<ContainerProps>`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    ${(props) => props.disabled && props.disabled === true && css`
        select, input, .sendForm {
            pointer-events: none; 
            opacity: 0.5;
        }
    `}
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

export const Close = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 40px;
    padding-left: 10px;
    span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: solid 1px;
        font-size: 11px;
        line-height: 0;
        font-weight: 600;
        cursor: pointer;
    }
`;

export const Option = styled.option<OptionsProps>`
    /* ${(props) => props.hidden && props.hidden === true && css`
        visibility: block;
    `} */
`;
