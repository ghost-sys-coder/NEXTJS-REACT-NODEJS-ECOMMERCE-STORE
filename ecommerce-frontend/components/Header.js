import Link from "next/link";
import styled from "styled-components";
import Center, { Wrapper } from "./Center";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";


const StyledHeader = styled.header`
    background-color: #222;
`
const Logo = styled(Link)`
    color: #fff;
    text-decoration: none;
`
const StyledNav = styled.nav`
    display: flex;
    gap: 1.5rem;
`
const NavLink = styled(Link)`
    color: #aaa;
`
export default function Header() {
    const { cartProducts } = useContext(CartContext);

    return (
        <StyledHeader>
            <Center>
                <Wrapper>
                <Logo href={'/'}>StoreMart</Logo>
                <StyledNav>
                    <NavLink href={'/'}>Home</NavLink>
                    <NavLink href={'/products'}>All products</NavLink>
                    <NavLink href={'/categories'}>Categories</NavLink>
                    <NavLink href={'/account'}>Account</NavLink>
                    <NavLink href={'/cart'}>Cart ({cartProducts.length})</NavLink>
                </StyledNav>
                </Wrapper>
            </Center>
        </StyledHeader>
    )
}