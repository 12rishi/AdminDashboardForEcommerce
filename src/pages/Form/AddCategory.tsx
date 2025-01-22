import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { API } from '../../http';
import { AddProduct, addCategory, addProduct } from '../../store/dataSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Status } from '../../types/status';

interface Category {
  id: string;
  categoryName: string;
}
const AddCategory = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.datas);
  const navigate = useNavigate();
  const [data, setData] = useState<{
    categoryName: string;
  }>({
    categoryName: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(addCategory(data));
    if (status === Status.SUCCESS) {
      navigate('/tables');
    } else {
      navigate('/forms/add-category');
    }
  };

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
                name="categoryName"
                id="categoryName"
                className="w-full  pl-12 bg-gray-200 md:py-2 focus:outline-none"
                placeholder="categoryName"
              />
            </div>

            <button className="w-full p-2 font-medium text-white uppercase bg-gradient-to-b from-gray-700 to-gray-900 md:p-4">
              Add Category
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
