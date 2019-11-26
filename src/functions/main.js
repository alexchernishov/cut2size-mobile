

export const groupBy = (xs, key) => {
    return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};
export const groupArrayBy = (xs, key, innerKey) => {

    if(innerKey){
        let newArr= [];
        for(let i  in xs){
            newArr.push(xs[i][innerKey].reduce(function(rv, x) {
                (rv[x[key]] = rv[x[key]] || []).push(x);
                return rv;
            }, {}))
        }
        return newArr;
    }

    return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};
export const groupGalleryImages = (xs, key) => {
    // console.log(xs);
    let res = [];
    xs.map(function(curObj, index) {
        // console.log(rv[x[key]]);
        let arrRes = curObj;
        let id = curObj[key].match(/\d/g);
        let type = curObj[key].match(/main|small/g);
        id = (id && id[0]) ? parseInt(id[0]) : id;
        type = (type && type[0]) ? type[0] : id;
        arrRes['id'] = id;
        arrRes['type'] = type;
        return res.push(arrRes);
    }, {});

    return groupBy(res,'id');
};
export const groupImages = (xs, key) => {
    // console.log(xs);
    let res = [];
    xs.map(function(curObj, index) {
        // console.log(rv[x[key]]);
        let arrRes = curObj;
        let id = curObj[key].match(/\d/g);
        let type = curObj[key].match(/main|small/g);
        id = (id && id[0]) ? parseInt(id[0]) : id;
        type = (type && type[0]) ? type[0] : id;
        arrRes['id'] = id
        arrRes['type'] = type;
        return res.push(arrRes);
    }, {});

    return groupBy(res,'type');
};
export const filterToString = (filters) => {
    if(filters){
        let str = [];
        for (let p in filters){
            if (filters.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(filters[p].values));
            }
        }
        return str.join("&");
    }
    return '';
};

export const historyToString = (params) => {
    let filters = [];
    for( let p of params.entries()) {
            filters.push(encodeURIComponent(p[0]) + "=" + encodeURIComponent(p[1]));

    }
    return filters.join("&");
};


export const locationSearchToArray = (search) => {


    return   new URLSearchParams(search);
    return search.substr(1, search.length).split("&");
};

export const filtersToHistory = (filters,location,history) => {
    if(filters){
        const params = new URLSearchParams(location.search);
        let page = params.get('page');
        let newParams =  new URLSearchParams();
        if(page && page !== null){
            newParams.set('page',page);
        }
        for (let p in filters){
            if (filters.hasOwnProperty(p)) {
                newParams.set(p,filters[p].values);
            }
        }
        let newUrl = `${location.pathname}?${newParams}`;
        history.push( newUrl);
    }else{
        const params = new URLSearchParams(location.search);
        let page = params.get('page');
        let newParams =  new URLSearchParams();
        if(page && page !== null){
            newParams.set('page',page);
        }
        let newUrl = `${location.pathname}?${newParams}`;
        history.push( newUrl);
    }
    return filters;
};


export const checkActive = (filtersState,value_item) => {
    let active = false;
    if(typeof filtersState[value_item['product_property.slug']] !== 'undefined'){
        let checkArray =  filtersState[value_item['product_property.slug']];

        for(let i in checkArray.values ){
            if(checkArray.values[i] === value_item.slug){
                active = true;
                break;
            }
        }
    }
    return active;
};

export const getFilterName = (slug,properties) => {
    let name = false;

    for(let i in properties){
        if(properties[i]['product_property.slug'] && properties[i]['product_property.slug'] == slug){
            name = properties[i]['product_property.name'];
            break;
        }
    }
    return name;
};
export const filterObject = (obj,predicate) => {
    let result = {}, key;

    for (key in obj) {
        if (obj.hasOwnProperty(key) && predicate(obj[key])) {
            result[key] = obj[key];
        }
    }

    return result;
};
export const groupByLimit = (array,limit) => {

    let newArray = {};
    let numb = 1;
    for (let i=1; i<= array.length; i++){
        if( newArray[numb] === undefined ){
            newArray[numb] = [array[i-1]]
        } else {
          newArray[numb].push(array[i-1]);
        }
        if( (i%limit) == 0){
            numb++;
        }
    }
    return newArray;
};

export const groupObjectByLimit = (obj,limit) => {

    let newArray = {};
    let numb = 1;
    for (let i in Object.keys(obj)){

        if( newArray[numb] === undefined ){
            newArray[numb] = [{[Object.keys(obj)[i]]:obj[Object.keys(obj)[i]]}]
        } else {
          newArray[numb].push({[Object.keys(obj)[i]]:obj[Object.keys(obj)[i]]});
        }
        if( ((parseInt(i)+1)%limit) == 0){
            numb++;
        }
    }
    return newArray;
};


export const filterKeys = (obj,keys) => {
    let newObj = {};

    for(let i in Object.keys(obj)){
        if(keys.includes(Object.keys(obj)[i])){
            newObj[Object.keys(obj)[i]] = obj[Object.keys(obj)[i]];
        }
    }
    return newObj;
};

export const keyLengthExists = (array,key) => {
    let newArray = [];

    for(let i in array){
        if(array[i][key] && array[i][key].length>0){
            newArray.push(array[i])
        }
    }
    return newArray;
};


export const formatDate = (date) => {
    date = new Date(date);
    let hours = date.getUTCHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let miliseconds = date.getMilliseconds();
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + ':' + minutes + ':' + seconds + ':' + miliseconds;
    return date.getDate()+ "-" + date.getMonth()+1  +  "-" + date.getFullYear() + ":" + strTime;
};


export const filterImageFilename = (filename) => {

    return filename.replace(/[^a-z\0-9\.]/gi,"_");
};
export const arrayObjKeyExists = (array,key) => {
    let res = false;

    array.forEach(function (item) {
        item = item.id? item.id : item;
        if(item ===key){
            res =  true;
        }

    });
    return res;
};
