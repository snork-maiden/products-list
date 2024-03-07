import md5 from "md5";
import config from "../../config";

const baseURL = 'http://api.valantis.store:40000/'

const Actions = {
    GetIds: 'get_ids',
    GetItems: "get_items",
    GetFields: 'get_fields',
    Filter: 'filter'
}

const Fields = {
    Brand: 'brand',
    Price: "price",
}

export async function getProductsItems(page) {
    const offset = config.limit * (page - 1);

    const response = await getProductsData(Actions.GetIds, { offset, limit: config.limit });
    const ids = response.result;

    return await getProductsList(ids);
}

export async function getProductsPrices() {
    return await getProductsFields(Fields.Price)
}

export async function getBrands() {
    return await getProductsFields(Fields.Brand)
}

async function getProductsFields(fieldName) {
    const limit = 200;
    let offset = 0;
    let fields = []

    do {
        const response = await getProductsData(Actions.GetFields, {
            field: fieldName,
            limit,
            offset
        })

        offset += limit;
        fields.push(response.result);

    } while (fields.length % limit === 0);

    return fields.filter(field => field !== null)
}

async function getProductsData(action, params) {
    const date = (new Date()).toJSON();
    const today = date.slice(0, 10).replaceAll('-', '');
    

    const token = config.password + '_' + today;
    console.log(token)
    try {
        let response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'X-Auth': md5(token),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action,
                params
            })
        })
        if (response.ok) {
            return await response.json()
        }
        console.error('HTTP error ' + response.status);
        if (response.status === 400 || response.status == 401) return
        // getProductsData(action, params);
    } catch (error) {
        console.error(error)
    }
}
async function getProductsList(ids) {
    const response = await getProductsData(Actions.GetItems, { ids })
    // leaveUniqIds(response.result)
   return response.result

//    function leaveUniqIds(list) {
//     list = list.reverse()
//     let ids = list.map(item => item.id)
//     const obj = Object.fromEntries(ids, list);
//     console.log(Array.from(Object.values(obj)))
//    }
}

