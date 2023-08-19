import { fetchFail, fetchStart, getProdCatBrandsSuccess, getStockSuccess } from "../features/stockSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import useAxios from "./useAxios";
import { useDispatch } from "react-redux";

const useStockCall = () => {
  const dispatch = useDispatch();
  const { axiosWithToken } = useAxios();

  const getStockData = async (url) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`/stock/${url}/`);
      dispatch(getStockSuccess({ data, url }));
    } catch (error) {
      console.log(error);

      dispatch(fetchFail());
    }
  };

  const deleteStockData = async (url, id) => {
    dispatch(fetchStart);
    try {
      await axiosWithToken.delete(`/stock/${url}/${id}/`);
      toastSuccessNotify(`${url} succecfuly deleted.`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      dispatch(fetchFail);
      toastErrorNotify(`${url} can not be  deleted!`);
    }
  };

  const updateStockData = async (url, id, updatedData) => {
    dispatch(fetchStart);
    try {
      await axiosWithToken.put(`/stock/${url}/${id}/`, updatedData);
      toastSuccessNotify(`${url} succecfuly updated.`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      dispatch(fetchFail);
      toastErrorNotify(`${url} can not be  Edited!`);
    }
  };

  const createStockData = async (url, newData) => {
    dispatch(fetchStart);
    try {
      await axiosWithToken.post(`/stock/${url}/`, newData);
      toastSuccessNotify(`${url} succecfuly added.`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      dispatch(fetchFail);
      toastErrorNotify(`${url} can not be  added!`);
    }
  };

  const getProdCatBrands = async () => {
    dispatch(fetchStart());

    try {
      const [products, categories, brands] = await Promise.all([
        axiosWithToken("/stock/products/"),
        axiosWithToken("/stock/categories/"),
        axiosWithToken("/stock/brands/"),
      ]);
      dispatch(
        getProdCatBrandsSuccess([
          products?.data,
          categories?.data,
          brands?.data,
        ])
      )
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toastErrorNotify(`Data can not be  fetched!`);
    }
  };

  return {
    getStockData,
    deleteStockData,
    updateStockData,
    createStockData,
    getProdCatBrands,
  };
};

export default useStockCall;
