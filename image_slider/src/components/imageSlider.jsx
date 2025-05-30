import React from "react";
import {ArrowBigLeft, ArrowBigRight} from 'lucide-react';
import './imageSlider.css'

export const ImageSlider = () => {
    const [images, setImages] = React.useState([]);
    const [imageIndex, setImageIndex] = React.useState(0);

    React.useEffect(() => {
        const fetchImages = async () => {
            const response = await fetch('https://dummyjson.com/products');
            const {products} = await response.json();
            setImages(products.map(product => product.images[0]));
        }
        fetchImages();
    }, []);

    const showPre = () => {
        if (imageIndex ===0) setImageIndex(images.length-1);
        else setImageIndex(imageIndex-1);
    }

    const showNext = () => {
        if (imageIndex === images.legnth-1) setImageIndex(0);
        else setImageIndex(imageIndex+1);
    }

    return (
        <div style={{width: '100%', height: '100%', position: 'relative'}}>
            {<img src={images[imageIndex]} alt={'product image '} className="img-slider-img"/>}
            <button className="img-slider-button" style={{left: 0}} onClick={showPre}><ArrowBigLeft/></button>
            <button className="img-slider-button"style={{right: 0}} onClick={showNext}><ArrowBigRight/></button>
        </div>
    );
}