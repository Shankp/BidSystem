import { API } from './APICallBase';


export async function AddNewbid(template) {
  const endpoint = `AddBid`;
 
  let api = await API();
  return api.post(endpoint, {
    ItemId: template.ItemId,
    BidValue: template.bidValue    
  });
}