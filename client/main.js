import React from 'react'
import ReactDOM from 'react-dom'
import SignUp from './containers/signup'

const App = () => {
    return (<div >
            <SignUp />
    </div>)
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
)

// import notify from './notification'
// import './main.css'
// notify("hello there uday")

// class form {
//     constructor(){
//         alert('ES6 worked trying to wokr')
//     }
// }
// new form()