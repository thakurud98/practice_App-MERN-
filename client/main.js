import React from 'react'
import ReactDOM from 'react-dom'
import ProjectRouter from './projectRouter'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./public/css/main.css"
import {Provider} from 'react-redux'
import store from './containers/store/store';

const App = () => {
    return (
    <Provider store = {store}><div >
            <ProjectRouter />
    </div> </Provider>)
}

ReactDOM.render(
        <App />,
    document.getElementById("root")
)