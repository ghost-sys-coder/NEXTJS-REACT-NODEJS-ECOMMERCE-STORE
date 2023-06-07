import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./CartIcon";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

const Bg = styled.div`
    background-color: #222;
    color: #fff;
    padding: 5rem 0;
`

const Title = styled.h1`
    margin: 0;
    font-weight: normal;
    padding-bottom: 1rem;
`

const Desc = styled.p`
    color: #aaa;
    font-size: 0.8rem;
    padding-bottom: 1rem;
    line-height: 1.5;
`

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 0.9fr 1.1fr;
    gap: 2rem;

    img {
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: 1rem;
    }
`
const Column = styled.div`
    display: flex;
    align-items: center;
`

const ButtonsWrapper = styled.div`
    display: flex;
    gap: .5rem;
    margin-top: 1rem;
`

const Featured = ({ ...product }) => {
    const { addProduct } = useContext(CartContext);

    const addFeaturedProductToCart = () => {
        addProduct(product._id);
    }
  
    return (
        <Bg>
            <Center>
                <ColumnsWrapper>
                    <Column>
                        <div>
                            <Title>{product.title}</Title>
                            <Desc>{product.description}</Desc>
                            <ButtonsWrapper>
                                <ButtonLink href={'/products/'+product._id} outline={1} white={1} size='l'>Read More</ButtonLink>
                                <Button
                                    white size='l'
                                    onClick={addFeaturedProductToCart}
                                >
                                    <CartIcon />
                                    Add to cart
                                </Button>
                            </ButtonsWrapper>
                        </div>
                    </Column>
                    <Column>
                        <img src={product.images[0]} />
                    </Column>
                </ColumnsWrapper>
            </Center>
        </Bg>
    )
}

export default Featured;