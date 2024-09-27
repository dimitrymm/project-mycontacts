import styled, { css } from 'styled-components';

export const StyledButton = styled.button`
    height: 52px;
    border: none;
    padding: 0 16px;
    background: ${({ theme }) => theme.colors.primary.main};
    font-size: 16px;
    font-weight: bold;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    color: #fff;
    border-radius: 4px;
    transition: 0.2s ease-in;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background: ${({ theme }) => theme.colors.primary.light};
    }
    &:active {
        background: ${({ theme }) => theme.colors.primary.dark};
    }
    &[disabled] {
        background: #999 !important;
        color: #999 !important;
        cursor: default !important;
    }

    ${({ theme, danger }) =>
        danger &&
        css`
            background: ${theme.colors.danger.main};

            &:hover {
                background: ${theme.colors.danger.light};
            }
            &:active {
                background: ${theme.colors.danger.dark};
            }
        `}
`;
