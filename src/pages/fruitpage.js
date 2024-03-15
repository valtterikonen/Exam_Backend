import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const FruitPage = () => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [weight, setWeight] = useState("");
    const [calories, setCalories] = useState("");
    const [color, setColor] = useState("");
    const [extras, setExtras] = useState("");

    useEffect(() => {
        const fetchFruit = async () => {
            const res = await fetch('/api/fruit/' + id, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            const data = await res.json();
            

            if (res.ok) {
                console.log(data);
                setName(data.name);
                setWeight(data.weight);
                setCalories(data.calories);
                setColor(data.color);
                setExtras(data.extras);
            }
            else {
                console.log("Error fetching fruit");
            }
        }
        fetchFruit();
    }, [id]);

    return (
        <div className="fruit-page">
                <h1 key={id}>{name}</h1>
                <p>Weight: {weight}</p>
                <p>Calories: {calories}</p>
                <p>Color: {color}</p>
                <p>Extras: {extras}</p>
        </div>
    );
}
export default FruitPage;