import { useEffect, useState } from "react";

const UpdateItem = ({ itemId }) => {
    const API_URI = `http://${import.meta.env.VITE_API_URI}/doors/${itemId}`;
    const [item, setItem] = useState(null);
    const [formData, setFormData] = useState({ name: "", status: "" });

    // Fetch the existing item when itemId changes
    useEffect(() => {
        if (!itemId) return; // Prevent fetching if no ID

        fetch(API_URI)
            .then((response) => response.json())
            .then((data) => {
                setItem(data);
                setFormData({ name: data.name, status: data.status });
            })
            .catch((error) => console.error("Error fetching item:", error));
    }, [itemId]); // 👈 Now it updates when itemId changes

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(API_URI, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((updatedItem) => {
                setItem(updatedItem);
                alert("Item updated successfully!");
            })
            .catch((error) => console.error("Error updating item:", error));
    };

    if (!item) return <p>Loading...</p>;

    return (
        <div>
            <h2>Update Item</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <label>
                    Status:
                    <select name="status" value={formData.status} onChange={handleChange} required>
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                    </select>
                </label>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateItem;
