import React from 'react'
import ReactDOM from 'react-dom'
import ProjectRouter from './projectRouter'


const App = () => {
    return (<div >
            <ProjectRouter />
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