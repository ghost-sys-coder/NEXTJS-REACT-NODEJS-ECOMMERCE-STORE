import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProductPage() {
    const router = useRouter();
    const { id } = router.query;
    const [productInfo, setProductInfo] = useState();
    
    useEffect(() => {
        if (!id) return;

        axios.get('/api/products?id='+id).then(response => {
            setProductInfo(response.data);
        })
    }, [id]);
    const goBack = () => {
        router.push('/products')
    }
    const deleteProduct = async () => {
        axios.delete('/api/products?id=' + id);
        goBack();
    }
    return (
        <Layout>
            <h1 className="text-center">Do you really want to delete this product &nbsp; "{productInfo?.title}"?</h1>
            <div className="flex justify-center gap-2">
                <button
                    onClick={deleteProduct}
                    className="btn-red"
                >Yes</button>
                <button
                    onClick={goBack}
                    className="btn-default"
                >NO</button>
            </div>
        </Layout>
    )
}