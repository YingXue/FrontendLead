import { useProducts} from "./hooks/useProducts";
import { ProductGrid } from "./productGrid";

export const AirbnbGrid = ()=> {
    const {products, observerRef} = useProducts();

    return (
        <>
            <ProductGrid products={products} />
            <div ref={observerRef}>Loading...</div>
        </>
    );
}