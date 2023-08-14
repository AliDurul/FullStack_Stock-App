import { fetchFail, fetchStart, getStockSuccess } from "../features/stockSlice";
import { toastSuccessNotify } from "../helper/ToastNotify";
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
      console.log(data);
    } catch (error) {
      console.log(error);
      dispatch(fetchFail);
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
      toastSuccessNotify(`${url} can not be  deleted!`);
    }
  };

  const updateStockData = async (url, id, updatedData) => {
    dispatch(fetchStart);
    try {
      await axiosWithToken.put(`/stock/${url}/${id}/`,updatedData);
      toastSuccessNotify(`${url} succecfuly updated.`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      dispatch(fetchFail);
      toastSuccessNotify(`${url} can not be  Edited!`);
    }
  };

  return { getStockData, deleteStockData,updateStockData };
};

export default useStockCall;
