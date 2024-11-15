import styled, { css } from 'styled-components';

export default styled.input`
    width: 100%;

    background: ${({ theme }) => theme.colors.background2};
    border: 2px solid ${({ theme }) => theme.colors.background2};
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    height: 52px;
    border-radius: 4px;
    outline: none;
    padding: 0 16px;
    font-size: 16px;
    transition: border-color 0.2s ease-in;
    color: ${({ theme }) => theme.colors.primary.text};
    appearance: none;

    &:focus {
        border-color: ${({ theme }) => theme.colors.primary.main};
    }

    ${({ theme, error }) =>
        error &&
        css`
            color: ${theme.colors.danger.main};
            border-color: ${theme.colors.danger.main}!important;
        `}
    &[disabled] {
        border-color: ${({ theme }) => theme.colors.gray[300]};
        background-color: #555;
`;
