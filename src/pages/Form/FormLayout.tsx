import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { API } from '../../http';
import { AddProduct, addProduct } from '../../store/dataSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Status } from '../../types/status';

interface Category {
  id: string;
  categoryName: string;
}
const FormLayout = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.datas);
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [data, setData] = useState<AddProduct>({
    productName: '',
    categoryId: '',
    productImageUrl: '',
    productDescription: '',
    productPrice: 0,
    productTotalStockQty: 0,
  });
  const fetchCategories = async () => {
    const response = await API.get('admin/category');
    if (response.status === 200) {
      setCategories(response.data.data);
    }
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    setData({
      ...data,
      [name]: name == 'image' ? files?.[0] : value,
    });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(addProduct(data));
    if (status === Status.SUCCESS) {
      navigate('/tables');
    } else {
      navigate('/forms/form-layout');
    }
  };
  // useEffect(()=>{
  //   if(status === Status.SUCCESS){
  //     navigate("/tables")
  //   }
  // },[status,dispatch])

  useEffect(() => {
    fetchCategories();
  }, []);
  console.log(categories);
  return (
    <>
      <Breadcrumb pageName="Form Layout" />

      <div className="flex items-center justify-center h-screen overflow-hidden  ">
        <div
          className=" bg-white w-17/12 lg:w-9/12 md:6/12 shadow-3xl "
          style={{ marginTop: '-200px' }}
        >
          <form className="p-3 md:p-5" onSubmit={handleSubmit}>
            <div className="flex items-center mb-6 text-lg md:mb-8">
              <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
                <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
              </svg>
              <input
                onChange={handleChange}
                type="text"
                name="productName"
                id="productName"
                className="w-full  pl-12 bg-gray-200 md:py-2 focus:outline-none"
                placeholder="productName"
              />
            </div>
            <div className="flex items-center mb-6 text-lg md:mb-8">
              <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
                <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
              </svg>
              <textarea
                onChange={handleChange}
                typeof="productDescription"
                name="productDescription"
                id="productDescription"
                className="w-full py-2 pl-12 bg-gray-200 md:py-2 focus:outline-none"
                placeholder="productDescription"
                rows={4}
              >
                {' '}
              </textarea>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className="flex items-center mb-6 text-lg md:mb-8">
                <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
                  <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
                </svg>
                <input
                  onChange={handleChange}
                  type="number"
                  name="productPrice"
                  id="productPrice"
                  className="w-full  pl-12 bg-gray-200 md:py-2 focus:outline-none"
                  placeholder="productPrice"
                />
              </div>
              <div className="flex items-center mb-6 text-lg md:mb-8">
                <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
                  <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
                </svg>

                <input
                  type="number"
                  onChange={handleChange}
                  name="productTotalStockQty"
                  id="productStockQty"
                  className="w-full  pl-12 bg-gray-200 md:py-2 focus:outline-none"
                  placeholder="productStockQty"
                />
              </div>
              <div className="flex items-center mb-6 text-lg md:mb-8">
                <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
                  <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
                </svg>

                <input
                  type="file"
                  name="image"
                  id="productImage"
                  className="w-auto  pl-12 bg-gray-200 md:py-2 focus:outline-none"
                  placeholder="productImage"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select product category
              </label>
              <select
                id="countries"
                className="bg-gray-50 bproduct bproduct-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:bproduct-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:bproduct-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:bproduct-blue-500"
                onChange={handleChange}
                name="categoryId"
              >
                {categories?.length > 0 &&
                  categories.map((category) => {
                    return (
                      <option value={category.id}>
                        {category.categoryName}
                      </option>
                    );
                  })}
              </select>
            </div>
            <button className="w-full p-2 font-medium text-white uppercase bg-gradient-to-b from-gray-700 to-gray-900 md:p-4">
              AddProduct
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormLayout;
