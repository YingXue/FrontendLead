import React from "react"
import {Product} from "./product";
import './products.css'
export const Products = () => {
    const [products, setProducts] = React.useState([]);
    const [filteredProducts, setFilterProducts] = React.useState([]);
    const [selectedImage, setSelectedImage] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [filter, setFilter] = React.useState('');

    React.useEffect(() => {
        const fetchProducts = async () => {
        setLoading(true);
           const result = await fetch('https://dummyjson.com/products');
           const {products} = await result.json();
           console.log(products);
           setLoading(false);
           setProducts(products);
           setFilterProducts(products);
           setSelectedImage(products?.[0].images[0]);
        }
        try {
            fetchProducts();
        }
        catch {
            //some error handling
        }
    }, []); //fetch products

    const onSelectProduct = (product) => {
        setSelectedImage(product.images[0]);
    }

    const onInputChange = (e) => {
        setFilter(e.target.value);
        const filtered = products.filter(product=>product.title.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilterProducts(filtered);
    }

    return (
        <>
         {loading ? 'Loading' :
            <div className="container">
                {selectedImage && <img src={selectedImage} alt={'image for the product'} style={{height: 200}}/>}
                <input type='text' value={filter} onChange={onInputChange} />
                <div className="products-list">
                    {filteredProducts.map((item, index) => <Product key={index} item={item} onSelectProduct={onSelectProduct}/>)}
                </div>
            </div>}
        </>
    )
}