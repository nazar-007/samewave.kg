import { useState, useEffect } from 'react';
import { getItems, deleteItem } from '../services/api';
import './ItemList.css';

function ItemList({ onItemCreated }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const data = await getItems();
            setItems(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch items. Make sure the backend is running.');
            console.error('Error fetching items:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [onItemCreated]);

    const handleDelete = async (id) => {
        try {
            await deleteItem(id);
            setItems(items.filter(item => item.id !== id));
        } catch (err) {
            setError('Failed to delete item');
            console.error('Error deleting item:', err);
        }
    };

    if (loading) {
        return <div className="loading">Loading items...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="item-list">
            <h2>Items List</h2>
            {items.length === 0 ? (
                <p className="empty-message">No items yet. Create one above!</p>
            ) : (
                <div className="items-grid">
                    {items.map((item) => (
                        <div key={item.id} className="item-card">
                            <div className="item-header">
                                <h3>{item.name}</h3>
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(item.id)}
                                    aria-label="Delete item"
                                >
                                    ×
                                </button>
                            </div>
                            <p className="item-description">{item.description}</p>
                            <span className="item-id">ID: {item.id}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ItemList;
