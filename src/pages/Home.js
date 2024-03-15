import FruitForm from "../components/Fruitform";
import FruitDetails from "../components/FruitDetails";
import { useEffect, useState } from "react";
const Home = () => {
  const [fruitArray, setFruitArray] = useState([]);
  useEffect(() => {
    const getFruit = async () => {
      const response = await fetch("/api/fruit", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data.error);
        setFruitArray([]);
        return;
      }
      setFruitArray(data);
    };
    getFruit();
  }, []);
  return (
    <div className="home">
      <div className="fruit">
        {fruitArray.length === 0 && <h2>No Fruit Found</h2>}
        {fruitArray.map((fruit) => (
          <FruitDetails key={fruit._id} fruit={fruit} />
        ))}
      </div>
      <FruitForm />
    </div>
  );
};
export default Home;