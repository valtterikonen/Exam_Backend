import { useState } from "react";


const FruitForm = () => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [calories, setCalories] = useState("");
  const [extras, setExtras] = useState("");
  const [weight, setWeight] = useState("");
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError("You must be logged in");
      return;
    }

    const fruit = { name, color, weight, calories, extras };
    const response = await fetch("/api/fruit", {
      method: "POST",
      body: JSON.stringify(fruit),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
     setName("");
      setColor("");
      setWeight("");
      setCalories("");
      setExtras("");
      setError(null);
      window.location.reload();
    }
  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Fruit</h3>

      <label>Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <label>Color:</label>
      <input
        type="text"
        onChange={(e) => setColor(e.target.value)}
        value={color}
      />

      <label>Weight</label>
      <input
        type="number"
        onChange={(e) => setWeight(e.target.value)}
        value={weight}
      />

      <label>Calories:</label>
      <input
        type="number"
        onChange={(e) => setCalories(e.target.value)}
        value={calories}
      />

      <label>Extras:</label>
      <input
        type="text"
        onChange={(e) => setExtras(e.target.value)}
        value={extras}
      />

      <button>Add Fruit</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
export default FruitForm;