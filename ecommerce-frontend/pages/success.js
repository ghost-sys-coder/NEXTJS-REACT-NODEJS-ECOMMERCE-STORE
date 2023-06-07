// import Center from "@/components/Center";
import Header from "@/components/Header";
import { CartContext } from "@/context/CartContext";
import { runFireWorks } from "@/lib/utils";
import { useContext, useEffect } from "react";
import styled from "styled-components";

const Center = styled.div`
    height: 100vh;
    transform: translateY(-100px);
    display: flex;
    justify-content: center;
    align-items: center;
`

const ColumnsWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;

    h1 {
        padding-block: 1rem;
    }
`;

export default function Success() {

    const { clearCart } = useContext(CartContext);

    useEffect(() => {
        localStorage.clear();
        clearCart();
        runFireWorks();
    }, []);


    return (
        <>
            <Header />
            <Center>
                <ColumnsWrapper>
                    <Box>
                        <h1>Thanks for your order!</h1>
                        <p>We will email you when your order is fullfilled.</p>
                    </Box>
                </ColumnsWrapper>
            </Center>
        </>
    )
}