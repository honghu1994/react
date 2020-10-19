let oDefault = {sCityName:'深圳'};

let reducer = (state=oDefault,action)=>{
    if(action.type=='change_city_name'){
        let oNewObj = JSON.parse( JSON.stringify(state) );
        oNewObj.sCityName = action.value;
        return oNewObj;
    }
    return state;
}

export default reducer;