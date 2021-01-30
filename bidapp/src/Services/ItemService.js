import { API } from './APICallBase';

export async function GetAllActiveItems() {
  const endpoint = `GetAllActiveItems`;
  let api = await API();
  return api.get(endpoint);
}

export async function GetItemsByStatus(statusList) {
  let config = {
    headers: {},
    params: {
      itemStatus: statusList
    },
  };
  const endpoint = `GetItemListByStatus`;
  let api = await API();
  return api.get(endpoint, config);
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
    //ImagePath:template.image
  };
  console.log(template);
  let api = await API();
  return api.post(endpoint, params);
}

export async function UploadImage(fileData) {//,fileName){
  const endpoint = `UploadItem`;
  console.log(fileData);
  const file = new FormData();
  file.append("FormFile", fileData);
  file.append("FileName", "test");

  let params = {
    FileName: "test",
    FormFile: fileData
  } 

  console.log(file);
  let api = await API();
  return api.post(endpoint, file);
}