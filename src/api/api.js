import md5 from "md5";
import config from "../../config";

const baseURL = 'https://api.valantis.store:41000/'

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

export async function getFilteredItems(params) {
    const response = await getProductsData(Actions.Filter, params, 0);
    const ids = response?.result;
    if (!ids.length) return [];

    return await getProductsList(ids);
}

export async function getProductsItems(page) {
    const offset = config.limit * (page - 1);

    const response = await getProductsData(Actions.GetIds, { offset, limit: config.limit }, 0);
    const ids = response?.result;

    return await getProductsList(ids);
}

export async function getProductsPrices() {
    return await getProductsFields(Fields.Price)
}

export async function getBrands() {
    return await getProductsFields(Fields.Brand)
}

async function getProductsFields(fieldName) {
    const limit = 2000;
    let offset = 0;
    let fields = []

    do {
        try {
            var response = await getProductsData(Actions.GetFields, {
                field: fieldName,
                limit,
                offset
            }, 0)
            if (!response?.result) continue;
            offset += limit;
            fields.push(...response.result);
        } catch (error) {
            console.error(error);
        }

    } while ((fields.length % limit) === 0);

    fields = fields.filter(field => field !== null)

    const uniqueFields = Array.from(new Set(fields))

    return uniqueFields;
}

async function getProductsData(action, params, retriesNumber) {
    const date = (new Date()).toJSON();
    const today = date.slice(0, 10).replaceAll('-', '');


    const token = config.password + '_' + today;
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
        } else {
            if (retriesNumber > 5) {
                return null;
            }
            console.error('HTTP error ' + response.status);
            if (response.status === 400 || response.status === 401) return;
            await getProductsData(action, params, ++retriesNumber)
        }
    } catch (error) {
        console.error(error)
        if (retriesNumber > 5) {
            return null;
        }
        await getProductsData(action, params, ++retriesNumber)
    }
}

async function getProductsList(ids) {
    const response = await getProductsData(Actions.GetItems, { ids }, 0)
    if (!response?.result) return
    return leaveUniqIds(response.result);

    function leaveUniqIds(products) {
        let ids = new Set(products.map(product => product.id));
        ids = Array.from(ids)
        return ids.map(id => products.find(product => product.id === id))
    }
}