import * as React from 'react';
import './autoComplete.css'

const useDebouncer = (value: any, delay: number) => {
    const [debouncedValue, setDebouncedValue] = React.useState(value);

    React.useEffect(()=> {
        const timerId = setTimeout(()=> {
            setDebouncedValue(value)
        }, delay);
        return () => {clearTimeout(timerId)}
    }, [value, delay]);

    return debouncedValue;
}
export const AutoComplete:React.FC = () => {
    const [userInput, setUserInput] = React.useState('');
    const [suggestions, setSuggestions] = React.useState([]);
    const debouncedInput = useDebouncer(userInput, 500);

    React.useEffect(() => {
        const fetchSuggestions = async () => {
            if (debouncedInput) {
                try{
                    const response = await fetch(`https://dummyjson.com/products/search?q=${debouncedInput.toLocaleLowerCase()}`);
                    const {products} = await response.json();
                    const fetchedSuggestions = products.map((product: any) => product.title);

                    // if suggestions has only one entry and it's exactly the same as the input, skip it
                    if (!(fetchedSuggestions.length === 1 && fetchedSuggestions[0].toLowerCase() === debouncedInput.toLowerCase())) {
                        setSuggestions(fetchedSuggestions);
                    } else {
                        setSuggestions([]);
                    }
                }
                catch {
                    // do some error handling
                }
            }
            else {
                setSuggestions([]);
            }
        }
        fetchSuggestions();
    }, [debouncedInput]);

    const onChangeInput = (e: any) => {
        setUserInput(e.target.value);
    }

    const onSuggestionSelected = (suggestion:string) => {
        setUserInput(suggestion);
        setSuggestions([]);
    }

    return (
        <>
            <input type='text' value={userInput} onChange={onChangeInput} style={{width: 500}}/>
            {!!suggestions && suggestions.length > 0 && 
                <div className='searchResults'>
                {suggestions.map((suggestion, index) => 
                    <div key={index} className='searchResult'>
                    <button onClick={() => onSuggestionSelected(suggestion)}>{suggestion}</button>
                    </div>
                )}
                </div>
            }
        </>
    );
}