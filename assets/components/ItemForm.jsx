import { useState } from 'react';
import { createItem } from '../services/api';
import './ItemForm.css';

function ItemForm({ onItemCreated }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim() || !description.trim()) {
            setError('Please fill in all fields');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            await createItem({ name, description });
            setName('');
            setDescription('');
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
            onItemCreated();
        } catch (err) {
            setError('Failed to create item. Make sure the backend is running.');
            console.error('Error creating item:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="item-form-container">
            <h2>Create New Item</h2>
            <form onSubmit={handleSubmit} className="item-form">
                <div className="form-group">
                    <label htmlFor="name">Item Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter item name"
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter item description"
                        rows="4"
                        disabled={loading}
                    />
                </div>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">Item created successfully!</div>}

                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Item'}
                </button>
            </form>
        </div>
    );
}

export default ItemForm;
