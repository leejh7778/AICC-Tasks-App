import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../redux/slices/modalSlice';
import { toast } from 'react-toastify';
import { fetchGetItemsData, fetchPostItemData } from '../redux/slices/apiSlice';

const Modal = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authData);
  // console.log(user?.sub);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    isCompleted: false,
    isImportant: false,
    userId: user?.sub,
  });

  const handleChange = (e) => {
    // setFormData({ ...formData, [e.target.name]: e.target.value });
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value, // name 입력값을 받는데, 만약 타입이 checkbox이면 checked값을 받고 아니면 value 값을 받는다.
    }));
  };

  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.sub) {
      alert('잘못된 사용자 입니다.');
      return;
    }

    if (!formData.title) {
      toast.error('제목을 입력해 주세요');
      return;
    }

    if (!formData.description) {
      toast.error('내용을 입력해 주세요');
      return;
    }

    if (!formData.date) {
      toast.error('날짜를 입력해 주세요');
      return;
    }

    // console.log(formData);

    try {
      dispatch(fetchPostItemData(formData));
      toast.success('할일이 추가되었습니다.');

      handleCloseModal();

      await dispatch(fetchGetItemsData(user?.sub)).unwrap();
    } catch (error) {
      console.error('Error adding taks: ', error);
      toast.error('할일 추가에 실패했습니다.');
    }
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };
  return (
    <div className="modal fixed bg-black bg-opacity-50 flex items-center justify-center w-full h-full left-0 top-0 z-50">
      <div className="form-wrapper bg-gray-700 rounded-md w-1/2 flex flex-col items-center relative p-4">
        <h2 className="text-2xl py-2 border-b border-gray-300 w-fit font-semibold">
          할일 추가하기
        </h2>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="input-control">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="제목을 입력해주세요..."
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="input-control">
            <label htmlFor="description">내용</label>
            <textarea
              type="text"
              id="description"
              name="description"
              placeholder="내용을 입력해주세요..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="input-control">
            <label htmlFor="date">입력 날짜</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div className="input-control toggler">
            <label htmlFor="isCompleted">완료 여부</label>
            <input
              type="checkbox"
              id="isCompleted"
              name="isCompleted"
              value={formData.isCompleted}
              onChange={handleChange}
            />
          </div>
          <div className="input-control toggler">
            <label htmlFor="isImportant">중요성 여부</label>
            <input
              type="checkbox"
              id="isImportant"
              name="isImportant"
              value={formData.isImportant}
              onChange={handleChange}
            />
          </div>
          <div className="submit btn flex justify-end">
            <button
              type="submit"
              className="flex justify-end gg-black w-fit py-3 px-6 rounded-md hover: bg-slate-500"
            >
              Create Task
            </button>
          </div>
        </form>

        <IoMdClose
          onClick={handleCloseModal}
          className="absolute right-10 top-10 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Modal;
