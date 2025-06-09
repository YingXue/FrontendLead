import './productGrid.css';

export const ProductGrid = ({ products }) => {
    return (
        <div className="grid">
            {products.map((product) => (
                <div key={product.id} className="card">
                    <img src={product.image} alt={product.title} />
                    <h4>{product.title}</h4>
                    <p>{product.description.slice(0, 100)}...</p>
                </div>
            ))}
        </div>
    );
}