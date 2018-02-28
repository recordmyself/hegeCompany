export let findButtonList = (firstCon, secondCon,that) => {
    // console.log('进来了1');
    for(let v of that.globalStore.menuList) {
        if(v.name == firstCon) {
            for (let j of v.subMenuList) {    
                // console.log(j.name == secondCon);
                if( j.name == secondCon) {        
                  that.store.buttonListArr = j.buttonList
                //   console.log('打印');        
                    break;
                }
            }
            break;
        }
    }
}

export let findButtonListMore = (firstCon, secondCon, thirdCon, that) => {
    for(let v of that.globalStore.menuList) {
        if(v.name == firstCon) {
            for (let j of v.subMenuList) {
                if( j.name == secondCon) {
                    for(let k of j.subMenuList) {
                        if( k.name == thirdCon) {
                          that.store.buttonListArr = k.buttonList
                        //   console.log(that.store.buttonListArr)
                            break;
                        }
                    }
                }
            }
            break;
        }
    }
}

