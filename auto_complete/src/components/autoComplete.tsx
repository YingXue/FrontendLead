import * as React from 'react';
import './autoComplete.css'

export const AutoComplete:React.FC = () => {
    const [userInput, setUserInput] = React.useState('');
    const [suggestions, setSuggestions] = React.useState(['123', ['12345']]);

    const onChangeInput = (e: any) => {
        setUserInput(e.target.value);
    }

    React.useEffect(() => {}, [userInput]);

    return (
        <>
            <input type='text' value={userInput} onChange={onChangeInput} style={{width: 500}}/>
            <div className='searchResults'>
                {suggestions?.map((suggestion, index) => 
                    <div className='searchResult'>
                    <span key={index}>{suggestion}</span>
                    </div>
                )}
            </div>
        </>
    );
}