import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Category,
  InititalState,
  OrderData,
  OrderStatus,
  Product,
  SingleOrder,
  User,
} from '../types/data';
import { Status } from '../types/status';

import { AppDispatch } from './store';
import { APIAuthenticated } from '../http';

export interface AddProduct {
  productName: string;
  productDescription: string;
  productPrice: number;
  productTotalStockQty: number;
  image: null;
  categoryId: string;
}

const initialState: InititalState = {
  orders: [],
  products: [],
  users: [],
  categories: [],
  singleOrder: [],
  status: Status.LOADING,
  singleProduct: null,
};

interface DeleteProduct {
  productId: string;
}
interface DeleteUser {
  userId: string;
}
interface DeleteOrder {
  orderId: string;
}
interface DeleteCategory {
  categoryId: string;
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setStatus(state: InititalState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setProduct(state: InititalState, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    setOrders(state: InititalState, action: PayloadAction<OrderData[]>) {
      state.orders = action.payload;
    },
    setCategories(state: InititalState, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
    setUsers(state: InititalState, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    setSingleProduct(state: InititalState, action: PayloadAction<Product>) {
      state.singleProduct = action.payload;
    },
    setDeleteProduct(
      state: InititalState,
      action: PayloadAction<DeleteProduct>,
    ) {
      const index = state.products.findIndex(
        (item) => (item.id = action.payload.productId),
      );
      state.products.splice(index, 1);
    },
    setDeleteUser(state: InititalState, action: PayloadAction<DeleteUser>) {
      const index = state.users.findIndex(
        (item) => (item.id = action.payload.userId),
      );
      state.users.splice(index, 1);
    },
    setDeleteOrder(state: InititalState, action: PayloadAction<DeleteOrder>) {
      const index = state.orders.findIndex(
        (item) => (item.id = action.payload.orderId),
      );
      state.orders.splice(index, 1);
    },
    setDeleteCategory(
      state: InititalState,
      action: PayloadAction<DeleteCategory>,
    ) {
      const index = state.categories.findIndex(
        (item) => (item.id = action.payload.categoryId),
      );
      state.categories.splice(index, 1);
    },
    setSingleOrder(state: InititalState, action: PayloadAction<SingleOrder[]>) {
      state.singleOrder = action.payload;
    },
    updateOrderStatusById(
      state: InititalState,
      action: PayloadAction<{ orderId: string; status: OrderStatus }>,
    ) {
      const index = state.singleOrder.findIndex(
        (order) => (order.id = action.payload.orderId),
      );
      if (index !== -1) {
        state.singleOrder[index].Order.orderStatus = action.payload.status;
        console.log(action.payload.status, 'STATUS');
      }
    },
    // setOrderStatus(state:InititalState,action:PayloadAction<{id:string,status:string}>){
    //     state.singleOrder
    // },
  },
});

export const {
  setOrders,
  setCategories,
  setSingleOrder,
  updateOrderStatusById,
  setDeleteCategory,
  setProduct,
  setStatus,
  setUsers,
  setSingleProduct,
  setDeleteProduct,
  setDeleteUser,
  setDeleteOrder,
} = dataSlice.actions;
export default dataSlice.reducer;

export function fetchProducts() {
  return async function fetchProductsThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get('admin/product');
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setProduct(data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchOrders() {
  return async function fetchOrdersThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get('/order');
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setOrders(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchUsers() {
  return async function fetchUsersThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get('/users');
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setUsers(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function addProduct(data: AddProduct) {
  return async function addProductThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.post('/admin/product', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function addCategory(data: { categoryName: string }) {
  return async function addCategoryThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.post('/admin/category', data);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        setCategories(response.data.data);
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchCaetgories() {
  return async function fetchCaetgoriesThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get('admin/category');
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setCategories(data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
export function deleteProduct(id: string) {
  return async function deleteProductThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.delete('/admin/product/' + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
export function deleteUser(id: string) {
  return async function deleteUserThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.delete('/users/' + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setDeleteUser({ userId: id }));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function deleteOrder(id: string) {
  return async function deleteProductThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.delete('/order/admin/' + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setDeleteOrder({ orderId: id }));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
export function deleteCategory(id: string) {
  return async function deleteProductThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.delete('/admin/category/' + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setDeleteCategory({ categoryId: id }));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function singleProduct(id: string) {
  return async function singleProductThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get('/admin/product/' + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setSingleProduct(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function singleOrder(id: string) {
  return async function singleOrderThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get('/order/customer/' + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setSingleOrder(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function handleOrderStatusById(status: OrderStatus, id: string) {
  return async function handleOrderStatusThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.patch('/order/admin/' + id, {
        orderStatus: status,
      });
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(updateOrderStatusById({ orderId: id, status }));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
