export const Product = ({item, onSelectProduct}) => {
    return (
        <div>
            {item.title}
            <button onClick={() => onSelectProduct(item)}>Cick me</button>
        </div>
    )
}