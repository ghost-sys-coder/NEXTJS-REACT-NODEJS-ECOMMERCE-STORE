import styled from "styled-components"

const StyledDiv = styled.div`
    /* max-width: 900px; */
    margin: 0 10%;
    padding: 1rem 2rem;
`

export default function Center({ children }) {
    return (
        <StyledDiv>
            {children}
        </StyledDiv>
    )
}

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: center;
`