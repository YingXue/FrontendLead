import { useState, useCallback, useRef } from "react";
import { useInfiniteScroll } from "./useInfiniteScroll";

const fetchProducts = async (page = 1, limit = 10) => {
    const res = await fetch(`https://fakestoreapi.com/products?limit=${limit}&page=${page}`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
};

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const pageRef = useRef(1); // page ref instead of state to prevent re-render
    const observerRef = useRef(null); // DOM ref
    const loadingRef = useRef(false); //use as a lock

    /* Why It’s a useCallback
        1) The function instance stays stable.
        2) It's not re-created on every render.
        3) This stability is critical because it's passed to useInfiniteScroll as a dependency.
            - If loadProducts changed on every render, it would re-attach the observer every time — which we don’t want.
    */
    const loadProducts = useCallback(async () => {
        if (loadingRef.current) return; // loadingRef is the lock
        loadingRef.current = true; // lock it. we won't fetch while it's still fetching
        console.log('Fetching page:', pageRef.current);

        try {
            const newProducts = await fetchProducts(pageRef.current);
            setProducts((prev) => [...prev, ...newProducts]);
            pageRef.current += 1;
        }
        catch (err) {
            console.error(err);
        } finally {
            loadingRef.current = false; // release the lock
        }
    }, []);

    useInfiniteScroll({ targetRef: observerRef, onIntersect: loadProducts });

    return { products, observerRef };
};