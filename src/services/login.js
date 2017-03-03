import api from '../utils/request';

export async function query() {
    return api.request("/teacher/mine/info")
}
