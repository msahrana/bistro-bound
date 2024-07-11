import {FaTrashAlt} from "react-icons/fa";

const CartRow = ({item, index, handleDelete}) => {
  const {image, name, price, _id} = item || {};

  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={image} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
        </div>
      </td>
      <td>{name}</td>
      <td>$ {price}</td>
      <th>
        <button
          onClick={() => handleDelete(_id)}
          className="btn btn-ghost btn-xl bg-[#D1A054]"
        >
          <FaTrashAlt className="text-white" />
        </button>
      </th>
    </tr>
  );
};

export default CartRow;
