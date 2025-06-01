import React from "react";
import "./App.css";

function App() {
    const [userInput, setUserInput] = React.useState<string>("");
    const [suggestions, setSuggestions] = React.useState([]);
    const [showSuggestions, setShowSuggestions] = React.useState(false);
    const [cachedSuggestion, setCachedSuggestion] = React.useState([]);
    const [activeIndex, setActiveIndex] = React.useState(-1);

    const fetchSuggestions = async ()=> {
        if ((cachedSuggestion as any)[userInput]) {
            setSuggestions((cachedSuggestion as any)[userInput]);
        }
        else {
            const response = await fetch(`https://dummyjson.com/products/search?q=${userInput}`);
            const {products} = await response.json();
            setSuggestions(products);
            setCachedSuggestion(prev => ({...prev, [userInput]: products}));
        }
    }

    React.useEffect(() => {
        const timer = setTimeout(() => {
            fetchSuggestions();
        }, 500);
        return () => {
            clearTimeout(timer);
        }
    }, [userInput]);

    const suggestionOnSelect = (suggestion: string) => {
        setUserInput(suggestion);
    }

    const onKeyDown = (e: any) => {
        if (suggestions.length === 0) return;
        switch(e.key) {
            case 'ArrowDown':
                setActiveIndex(prev => Math.min(prev+1, suggestions.length -1));
                break;
            case 'ArrowUp':
                setActiveIndex(prev => Math.max(prev - 1, 0));
                break;
            case 'Enter':
                if (activeIndex >=0) {
                    setUserInput((suggestions[activeIndex] as any).title);
                    setShowSuggestions(false);
                    setActiveIndex(-1);
                }
                break;
            case 'Esc':
                setShowSuggestions(false);
                setActiveIndex(-1);
                break;
            default: 
                setShowSuggestions(true);
        }
    }

    return (
        <div className="container">
            <h1>Auto complete</h1>
            <input
                className="userInput"
                value={userInput}
                onChange={(e) => {setUserInput(e.target.value)}}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => {setTimeout(() => setShowSuggestions(false), 500)}}
                aria-label={"type in something for search"}
                onKeyDown={onKeyDown}
            />
            { showSuggestions &&
                <div className="suggestions" role="listbox">
                {
                    suggestions?.map((suggestion: any, index: number) => (
                        <div
                            role="option"
                            key={suggestion.id}
                            className={`suggestion ${activeIndex === index? 'active': ''}`}
                            onClick={(() => suggestionOnSelect(suggestion.title))}
                        >
                            {suggestion.title}
                        </div>
                    ))
                }
                </div>
            }
        </div>
    )
}

export default App

// functional requirement:
// a input box for user to start typing
// the auto complete suggestions are rendered in a dropdown (most frequent or with scroll)
// user typing triggers backend api fetch to grab auto complete suggestions
// when user select an entry from the suggestions, dropdown disappears and input box gets updated
// input debounced

// nice to have:
// highlighted the matching input to show relevance
// api cancellation if new input appears
// caching

// accessible:
// arrow up down for suggestion selection
// can hit enter to auto complete
// esc to close dropdown
// aria label
// color contrast