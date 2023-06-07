import Featured from "@/components/Featured";
import Header from "@/components/Header"
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
 

const HomePage = ({ featuredProduct, newProducts }) => {
 

  return (
    <div>
      <Header />
      <Featured {...featuredProduct} />
      <NewProducts newProducts={newProducts} />
    </div>
  )
}


export default HomePage;

export async function getServerSideProps() {
  const featuredProductId = '646dfe87a8b2b5af36e144e7';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);

  const newProducts = await Product.find({}, null, { sort: { '_id': 1 }, limit: 10 });

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts))
    }
  }
}