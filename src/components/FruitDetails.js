import { Link, useNavigate } from "react-router-dom";


const FruitDetails = ({ fruit }) => {
  const navigate = useNavigate();

  const fruitDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this fruit?')) {
      return;
    }
    await fetch(`/api/fruit/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  };

  return (
    <div className="fruit-details">
      <Link to={`/fruit/${fruit._id}`}>
        <h4>{fruit.name}</h4>
      </Link>
      <Link to={`/fruit/${fruit._id}/update`}>
        <button className="update" key={fruit._id}>update</button>
      </Link>
      <span
        className="material-symbols-outlined"
        onClick={() => {
          fruitDelete(fruit._id);
          navigate("/login");
        }}
      >
        delete
      </span>
    </div>
  );
};

export default FruitDetails;