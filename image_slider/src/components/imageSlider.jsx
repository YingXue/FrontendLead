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

    // outer div container with 100%
    // inner div with width equal to the number of images, say 5 images, then width is 500%, but the view port is 100% with overflow hidden
    // then each image takes 20% of the inner width, still 100% of the outer width
    // the button moves the inner div to the left or right by 20% of the inner width, which is 100% of the outer width according to the imageIndex
    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
            <div
                style={{
                    display: 'flex', 
                    width: `${images.length * 100}%`,
                    translate: `-${imageIndex* (100/images.length)}%`,
                    transition: 'translate 0.5s ease-in-out',
                }}
            >
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt="product"
                        style={{
                            width: `${100 / images.length}%`,   
                        }}
                    />
                ))}
            </div>

            <button className="img-slider-button" style={{ left: 0 }} onClick={showPre}>
                <ArrowBigLeft />
            </button>
            <button className="img-slider-button" style={{ right: 0 }} onClick={showNext}>
                <ArrowBigRight />
            </button>
        </div>
    );
}