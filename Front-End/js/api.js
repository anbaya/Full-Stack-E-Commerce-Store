const API_BASE = "/api";

async function apiGet(endpoint) {
    const response = await fetch(`${API_BASE}/${endpoint}`);
    const data = await response.json();
    return data;
}

async function apiPost(endpoint, payload) {
    const response = await fetch(`${API_BASE}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    const data = await response.json();
    return data;
}

async function apiPut(endpoint, payload) {
    const response = await fetch(`${API_BASE}/${endpoint}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    const data = await response.json();
    return data;
}

async function apiDelete(endpoint) {
    const response = await fetch(`${API_BASE}/${endpoint}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    return data;
}

export {
    apiGet,
    apiPost,
    apiPut,
    apiDelete
};