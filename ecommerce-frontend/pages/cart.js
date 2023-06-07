import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import { CartContext } from "@/context/CartContext";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.3fr .7fr;
    gap: 40px;
    margin-top: 40px;
`;

const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
`;

const ProductInfoCell = styled.td`
    padding: 10px 0;
    font-size: .7rem;
`;

const ProductImage = styled.div`
    width: 100px;
    height: 100px;
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        max-width: 80px;
        max-height: 80px;
    }
`;

const QuantityLabel = styled.span`
    padding: 0 3px;
`

const CityHolder = styled.div`
    display: flex;
    gap: 1rem;
`;

export default function CartPage() {
    const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [country, setCountry] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const router = useRouter();
   

    useEffect(() => {
        if (cartProducts.length > 0) {
            axios.post('/api/cart', {
                ids: cartProducts
            }).then(response => {
                setProducts(response.data);
            })
        } else {
            setProducts([]);
        }
    }, [cartProducts]);

    // useEffect(() => { 
    //     if (window.location.href.includes('success')) {
    //         setIsSuccess(true);
    //         clearCart();
    //     }
    // }, [])

    const moreOfThisProduct = (productId) => {
        addProduct(productId)
    }

    const lessThisProduct = (productId) => {
        removeProduct(productId)   
    }

    const goToPayment = async (event) => {
        event.preventDefault();
        const response = await axios.post('/api/checkout', {
            name, email, city,
            postalCode, streetAddress, country,
            cartProducts,
        });

        if (response.data.url) {
            window.location = response.data.url;
        }
    }

    let total = 0;

    for (const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;

        total += price;
    }

    // if (isSuccess) {
    //     return (
    //         <>
    //             <Header />
    //             <Center>
    //                 <ColumnsWrapper>
    //                     <Box>
    //                         <h1>Thanks for your order!</h1>
    //                         <p>We will email you when your order is fullfilled.</p>
    //                     </Box>
    //                 </ColumnsWrapper>
    //             </Center>
    //         </>
    //     )
    // }

    return (
        <>
            <Header />
            <Center>
                <ColumnsWrapper>
                    <Box>
                    <h2>Cart</h2>
                    {!cartProducts.length && (
                        <div>Your cart is empty...</div>
                    )}
                    {products?.length > 0 && (
                        <Table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product.title}>
                                        <ProductInfoCell>
                                            <ProductImage>
                                                <img src={product.images[0]} alt="" />
                                            </ProductImage>
                                            {product.title}
                                        </ProductInfoCell>
                                        <td>
                                            <Button
                                                onClick={()=> lessThisProduct(product._id)}
                                            >-</Button>
                                            <QuantityLabel>{cartProducts.filter(id => id === product._id).length}</QuantityLabel>
                                            <Button
                                                onClick={() => moreOfThisProduct(product._id)}
                                            >+</Button>
                                        </td>
                                        <td><span>UGX:</span> {product.price * cartProducts.filter(id => id === product._id).length}</td>
                                    </tr>
                                ))}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>UGX: {total}</td>
                                    </tr>
                            </tbody>
                        </Table>
                    )}
                    </Box>
                    
                    {cartProducts?.length && (
                        <Box>
                            <h2>Order Information</h2>
                            <form onSubmit={goToPayment}>
                                <Input
                                        value={name}
                                        // name='name'
                                        onChange={event => setName(event.target.value)} 
                                    type='text' placeholder='Name...' />
                                <Input
                                        value={email}
                                        // name='email'
                                        onChange={event => setEmail(event.target.value) } 
                                    type='text' placeholder='Email...' />
                                <CityHolder>
                                    <Input
                                            value={city}
                                            // name='city'
                                            onChange={event => setCity(event.target.value)} 
                                        type='text' placeholder='City...' />
                                    <Input
                                            value={postalCode}
                                            // name='postalCode'
                                            onChange={event => setPostalCode(event.target.value)} 
                                        type="text" placeholder="Postal Code..." />
                                </CityHolder>
                                <Input
                                        value={streetAddress}
                                        // name='streetAddress'
                                        onChange={event => setStreetAddress(event.target.value)} 
                                    type='text' placeholder='Street Address...' />
                                <Input
                                        value={country}
                                        // name='country'
                                        onChange={event => setCountry(event.target.value)} 
                                    type='text' placeholder='Country...'
                                />
                                <Input
                                    // name='products'
                                    type='hidden'
                                    value={cartProducts.join(',')} 
                                    />
                                <Button
                                    block black
                                    // type='submit'
                                >Continue Payment</Button>
                            </form>
                        </Box>
                    )}
                </ColumnsWrapper>
            </Center>
        </>
    )
}