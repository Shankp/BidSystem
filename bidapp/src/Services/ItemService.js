import { API } from './APICallBase';

export async function GetAllActiveItems() {
  const endpoint = `GetAllActiveItems`;
  let api = await API();
  return api.get(endpoint);
}

export async function AddItemService(template) {
  const endpoint = `AddItem`;
  let params = {
    ItemTitle: template.title,
    ItemSubTitle: template.subTitle,
    ItemDescription: template.MoreDetails,
    ItemStatus: template.itemStatus,
    ExpireTime: template.ExpireTime
    //startingBid: template.startingBid
  };
  let api = await API();
  return api.post(endpoint, params);
}