import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { removeUser } from "../../store/slices/userSlice";

const UserHeader: FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center self-center">
      <div className="">
        <img
          className="inline-block h-6 w-6 rounded-full ring-2 ring-white m-2"
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>

      <span className="inline-block text-white m-2">Ivan Ivanov</span>
      <button
        className="inline-block text-white m-2"
        onClick={() => dispatch(removeUser())}
      >
        Exit
      </button>
    </div>
  );
};

export default UserHeader;
