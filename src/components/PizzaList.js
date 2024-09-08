import React, { useState, useEffect } from "react";
import Pizza from "./Pizza";
import PizzaForm from "./PizzaForm";

function PizzaList() {
  const [pizzas, setPizzas] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/pizzas")
      .then(response => response.json())
      .then(data => setPizzas(data));
  }, []);

  const handleEditClick = (pizza) => {
    setSelectedPizza(pizza);
  };

  const handleFormSubmit = (updatedPizza) => {
    fetch(`http://localhost:3001/pizzas/${updatedPizza.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedPizza)
    })
      .then(response => response.json())
      .then(data => {
        setPizzas(pizzas.map(p => (p.id === data.id ? data : p)));
        setSelectedPizza(null); // Clear selection after submission
      });
  };

  return (
    <>
      {selectedPizza && <PizzaForm pizza={selectedPizza} onFormSubmit={handleFormSubmit} />}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Topping</th>
            <th scope="col">Size</th>
            <th scope="col">Vegetarian?</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {pizzas.map(pizza => (
            <Pizza key={pizza.id} pizza={pizza} onEditClick={handleEditClick} />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default PizzaList;
