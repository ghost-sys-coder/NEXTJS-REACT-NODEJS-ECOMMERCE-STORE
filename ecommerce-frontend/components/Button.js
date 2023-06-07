import { primary } from "@/constants/colors";
import styled, {css} from "styled-components"

export const ButtonStyle = css`
background-color: #5542F6;
border: none;
color: #fff;
padding: .5rem 2rem;
border-radius: .5rem;
cursor: pointer;
display: inline-flex;
align-items: center;
font-family: 'Poppins', sans-serif;
font-weight: 800;

svg {
    height: 1.5rem;
}

${props => props.white && !props.outline && css`
    background-color: #fff;
    color: #000;
    font-weight: 400;
`}

${props => props.white && props.outline && css`
    background-color: transparent;
    color: #fff;
    border: 1px solid #fff;
    font-weight: 400;
`}

${props => props.primary && css`
    background-color: #5542F6;
    color: #fff;
    border: 1px solid #5542F6;

    svg {
        height: 1.5rem;
        margin-right: 3px;
    }
`}

${props => props.primary && !props.outline && css`
    background-color: ${primary};
    border: 1px solid ${primary};
    color: #fff;
`}

${props => props.primary && props.outline && css`
    background-color: transparent;
    border: 2px solid ${primary};
    color: ${primary};
`}

${props => props.black && !props.outline && css`
    background-color: #000;
    color: #fff;
`}

${props => props.black && props.outline && css`
    background-color: transparent;
    color: #000;
    border: 1px solid #000;
`}

${props => props.block && css`
    display: block;
    width: 100%;
    margin-top: 1rem;
`}

${props => props.size === 'l' && css`
    font-size: 1.2rem;
    padding: .5rem 1.5rem;
`}
`;


const StyledButton = styled.button`
    ${ButtonStyle}
`
export default function Button({ children, ...rest }) {
    return (
        <StyledButton {...rest}>
            {children}
        </StyledButton>
    )   
}