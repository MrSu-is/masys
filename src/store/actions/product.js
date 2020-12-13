import { listApi } from "../../service/product"

export const loadProduct = payload => async dispatch => {
  console.log(payload)
  const res = await listApi(payload.page)
  
  dispatch({
    type: "PRODUCT_LOADED",
    payload: { ...res, page: payload.page }
  });
};
