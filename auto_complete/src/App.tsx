import {AutoComplete} from './components/autoComplete'

function App() {
  return (
    <div style={{display: 'flex', flexDirection:'column', width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center'}}>
      <AutoComplete/>
    </div>
  )
}

export default App

// functional requirement:
// a input box for user to start typing
// the auto complete suggestions are rendered in a dropdown (most frequent or with infinite scroll)
// user typing triggers backend api fetch to grab auto complete suggestions
// when user select an entry from the suggestions (enter or mouse click), dropdown disappears and input box gets updated
// input debounced

// accessible:
// arrow up down
// esc to close dropdown
// aria label
// color contrast

// nice to have:
// highlighted the matching input to show relevance
// api cancellation if new input appears
// caching
