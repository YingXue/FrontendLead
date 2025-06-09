import { useEffect } from "react";

/* Custom hook that:
    1) Accepts a targetRef (the sentinel DOM node) and an onIntersect callback.
    2) Sets up an IntersectionObserver that observes the target and calls onIntersect when it becomes visible.
    3) Cleans up properly on unmount.
*/
export const useInfiniteScroll = ({targetRef, onIntersect}) => {
    useEffect(()=> {
        const current = targetRef.current;
        if (!current) return;

        const observer = new IntersectionObserver((entries)=> {
            const entry = entries[0];
            if (entry.isIntersecting) {
                console.log('intersecting')
                onIntersect();
            }
        });

        if (current) observer.observe(current); // attach the observer to the DOM element that we watch

        return () => {
            if (current) observer.unobserve(current); // cleanup
        }
    },
    [targetRef.current, onIntersect]);
}