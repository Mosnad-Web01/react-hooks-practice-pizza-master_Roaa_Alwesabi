import React, { useState, useEffect } from "react";

function PizzaForm({ pizza, onFormSubmit }) {
  const [formData, setFormData] = useState({
    topping: "",
    size: "Small",
    vegetarian: "Vegetarian"
  });

  useEffect(() => {
    if (pizza) {
      setFormData({
        topping: pizza.topping,
        size: pizza.size,
        vegetarian: pizza.vegetarian
      });
    }
  }, [pizza]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit({ ...pizza, ...formData });
  };

  if (!pizza) return null; // Don't render if no pizza is selected

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="col-5">
          <input
            className="form-control"
            type="text"
            name="topping"
            placeholder="Pizza Topping"
            value={formData.topping}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <select className="form-control" name="size" value={formData.size} onChange={handleChange}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Vegetarian"
              checked={formData.vegetarian === "Vegetarian"}
              onChange={handleChange}
            />
            <label className="form-check-label">Vegetarian</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Not Vegetarian"
              checked={formData.vegetarian === "Not Vegetarian"}
              onChange={handleChange}
            />
            <label className="form-check-label">Not Vegetarian</label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default PizzaForm;
