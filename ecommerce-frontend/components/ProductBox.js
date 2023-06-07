import styled from "styled-components"
import Button from "./Button";
import CartIcon from "./CartIcon";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

const ProductWrapper = styled.div`

`

const WhiteBox = styled(Link)`
    background-color: #fff;
    padding: 20px;
    text-align: center;

    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;

    img {
        max-width: 100%;
        max-height: 200px;
        object-fit: cover;
    }

`;

const Title = styled(Link)`
    font-size: .9rem;
    font-weight: normal;
    padding: .2rem;
    color: inherit;
`;

const ProductInfoBox = styled.div`
    margin-top: 10px;
`
const PriceRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2px;
`
const Price = styled.p`
    font-size: 1rem;
    font-weight: 800;
`

export default function ProductBox({ _id, title, images, description, price }) {
    const { addProduct } = useContext(CartContext);

    const url = '/product/' + _id;

    return (
        <ProductWrapper>
            <WhiteBox href={url} key={_id}>
                <div>
                    <img src={images[0]} alt="" />
                </div>
            </WhiteBox>
            <ProductInfoBox>
                <Title href={url}>{title}</Title>
                <PriceRow>
                    <div>
                        <Price>Shs: {price}</Price>
                    </div>
                    <Button
                        onClick={() => addProduct(_id)}
                        primary outline>
                        Add to Cart
                    </Button>
                </PriceRow>
            </ProductInfoBox>
        </ProductWrapper>
    )
}