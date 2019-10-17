import * as constants from './constants'
import axios from 'axios'


export function LoginUserAPI (data) {
    console.log("called========================")
    console.log("data for Login API================", data)
    axios.post( constants.LOGIN, data)
    .then((res)=>{
        if(res.status === 200){
            console.log("res==============", res.data)
            return JSON.parse(res.data)
        }
    }).catch((e)=>{
        console.log("e==============", e.toString())

    })
}