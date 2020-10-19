let oDefaultState = {
    sCity_name:'深圳'
}

let reducer = (state=oDefaultState,action)=>{
    if(action.type=='change_city'){
        let oNewState = JSON.parse( JSON.stringify(state) );
        oNewState.sCity_name = action.value;
        return oNewState;
    }

    return state;
}

export default reducer;