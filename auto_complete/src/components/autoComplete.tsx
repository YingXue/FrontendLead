import * as React from 'react';
import './autoComplete.css'

export const useDebouncer = (value: any, delay: number) => {
    const [debouncedValue, setDebouncedValue] = React.useState(value);

    React.useEffect(()=> {
        const timerId = setTimeout(()=> {
            setDebouncedValue(value)
        }, delay);
        return () => {clearTimeout(timerId)}
    }, [value, delay]);

    return debouncedValue;
}

interface Suggestion {
    id: string;
    title: string;
}
export const AutoComplete:React.FC = () => {
    const [userInput, setUserInput] = React.useState('');
    const [suggestions, setSuggestions] = React.useState<Suggestion[]>([]);
    const [showResults, setShowResults] = React.useState(false);
    const [cachedSuggestions, setCachedSuggestions] = React.useState<Record<string, Suggestion[]>>({});

    const fetchSuggestions = async () => {
        // IMPROVEMENT: use cache
        try {
            if (cachedSuggestions[userInput]) {
                // console.log('from cache');
                setSuggestions(cachedSuggestions[userInput]);
            }
            else {
                // console.log('from api')
                const response = await fetch(`https://dummyjson.com/products/search?q=${userInput.toLocaleLowerCase()}`);
                const {products} = await response.json();
                setSuggestions(products);
                setCachedSuggestions(prev => ({...prev, [userInput.toLowerCase()]: products}));
            }
        }
        catch {
            // do some error handling
        }
    }

    React.useEffect(() => {
        // IMPROVEMENT: simply debouncing without using the useDebounce hook
        const timerId = setTimeout(()=> {
            fetchSuggestions()},
        500);

        // The cleanup function is called:
        // Before the effect runs again — i.e., when the dependency userInput changes.
        // When the component unmounts — React will also run the cleanup when the component is being removed from the DOM.
        return () => {
            clearTimeout(timerId);
        }

    }, [userInput]);

    const onChangeInput = (e: any) => {
        setUserInput(e.target.value);
    }

    const onSuggestionSelected = (suggestion: Suggestion) => {
        console.log(suggestion);
        setUserInput(suggestion.title);
        setSuggestions([]);
    }

    return (
        <>
            <input
                type='text'
                value={userInput}
                onChange={onChangeInput}
                style={{width: 500}}
                // IMPROVEMENT: only show results when focus
                onFocus={()=> setShowResults(true)}
                onBlur={() => setTimeout(() => setShowResults(false), 500)}
            />
            {showResults&& !!suggestions && suggestions.length > 0 && 
                <div className='searchResults'>
                    {suggestions.map((suggestion: Suggestion) => 
                        <div key={suggestion.id} className='searchResult'>
                            <span onClick={() => onSuggestionSelected(suggestion)}>{suggestion.title}</span>
                        </div>
                    )}
                </div>
            }
        </>
    );
}