import React from "react";

export const useDebounceValue = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = React.useState(value);

    React.useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {clearTimeout(timerId)};
    }, [value, delay]);

    return debouncedValue;
}