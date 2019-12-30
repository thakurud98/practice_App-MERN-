import obj from '../reduxTpe'
const { S,F } = obj
const sampleReducer  = (state,{type,payload}) => {

    switch(type) {
        case S :
            return payload;
        case F :
            return payload ;
        default :
            return ''  ;
    }
    
}
export default sampleReducer ;