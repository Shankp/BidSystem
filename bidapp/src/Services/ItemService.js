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
    ItemDescription: template.moreDetails,
    ItemStatus: template.itemStatus,
    ExpireTime: template.expireTime,  
    StartingBid: template.startingBid
  };
  console.log(template);
  let api = await API();
  return api.post(endpoint, params);
}