export { getDifferentArr }

/**
 * 获取两个对象数组的差集
 *  @param allArr：全数组
 *  @param partArr：缺省数组
 */
function getDifferentArr(allArr, partArr) {
    for (let i = allArr.length - 1; i >= 0; i--) {
        for (let j = 0; j < partArr.length; j++) {
            if (allArr[i].id === partArr[j].id) {
                allArr.splice(i, 1);
                break;
            }
        }
    }
    return allArr;
}