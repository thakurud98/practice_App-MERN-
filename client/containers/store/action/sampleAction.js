import obj from '../reduxTpe';
const { S, F}  = obj;

const sampleAction  = () => dispatch => {
    return dispatch({
       type: S,
       payload: "test"
    })
    

}
export default sampleAction;