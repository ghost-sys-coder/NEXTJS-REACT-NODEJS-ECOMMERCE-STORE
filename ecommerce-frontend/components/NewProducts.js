import styled from "styled-components";
import Center from "./Center";
import ProductBox from "./ProductBox";

const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
`

const Title = styled.h2`
    font-size: 2rem;
    margin: 30px 0 20px;
    font-weight: normal;
    text-align: center;
`

const NewProducts = ({ newProducts }) => {
    console.log(newProducts)
    return (
        <Center>
            <Title>New Arrivals</Title>
            <ProductGrid>
                {newProducts?.length > 0 && newProducts.map(product => {
                    return (
                        <ProductBox key={product._id} {...product} />
                    )
                })}
            </ProductGrid>
        </Center>
    )
}

export default NewProducts;