let reducer = (state=[],action)=>{
    if(action.type=='add_cart'){
        // 这里不能用展开运算符复制数组，因为展开运算符是浅拷贝
        // 而我们这个数组里面的成员是复合类型的变量，所以需要用深拷贝的方法：
        let aNewArr = JSON.parse(JSON.stringify(state));

        // find方法会返回一个数组的成员，这个返回的成员是浅拷贝
        // 查找是不是添加同一个商品
        let oFindObj = aNewArr.find(item=>item.id==action.value.id);

        // 如果是添加同一个商品，就将这个商品的num属性加 1
        if(oFindObj){
            oFindObj.num += 1;
            return aNewArr;
        }else{ // 如果不是添加同一个商品，就直接将这个商品加入数组
            aNewArr.push( action.value );
            return aNewArr;
        }    
    }

    // 修改商品的数量
    if(action.type=='change_goods_num'){
        let aNewArr = JSON.parse(JSON.stringify(state));        
        let oFindObj = aNewArr.find(item=>item.id==action.id);
        oFindObj.num = action.value;
        return aNewArr;
    }

    if(action.type=='delete_goods'){
        let aNewArr = JSON.parse(JSON.stringify(state));
        let aFilterArr = aNewArr.filter(item=>item.id!=action.id);
        return aFilterArr;
    }

    return state
}


export default reducer;