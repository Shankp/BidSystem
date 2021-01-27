import { API } from './APICallBase';

export async function GetAllActiveItems() {
    const endpoint = `GetAllItem`;
    let api = await API();
    return api.get(endpoint);
  }