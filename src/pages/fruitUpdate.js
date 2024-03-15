import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

const FruitUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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
    
    const handleUpdate = async (e) => {
        e.preventDefault();
        const fruit = { name, weight, calories, color, extras };
        const response = await fetch(`/api/fruit/${id}`, {
            method: "PUT",
            body: JSON.stringify(fruit),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        if (response.ok) {
            navigate("/");
        }
    }

    return (
        <div className='update-fruit'>
            <div className="update-wrapper">
                <h2>Update a Fruit</h2>
                <form onSubmit={handleUpdate}>
                    <div>
                    <p>Name:</p>
                    <textarea className='desc'
                        type="text"
                        placeholder="..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    </div>
                    <p>Color:</p>
                    <textarea className='desc'
                        placeholder="..."
                        value={color}
                        onChange={(e) => setColor(e.target.value)} // Update description state
                    ></textarea>
                    <p>Weight:</p>
                    <textarea className='desc'
                        placeholder="..."
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)} // Update description state
                    ></textarea>
                    <div>
                    <p>Calories:</p>
                    <textarea className='desc'
                        placeholder="..."
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                    />
                    </div>
                    <div>
                        <p>Extras:</p>
                        <textarea className='desc'
                        placeholder="..."
                        value={extras}
                        onChange={(e) => setExtras(e.target.value)}
                    />
                    </div>
                    <button className='publish' type="submit" >Update</button>
                    <Link to='/'>
                        <button className='cancel'>Cancel</button>
                    </Link>
                </form>
            </div>
        </div>
      );
    };

export default FruitUpdate;