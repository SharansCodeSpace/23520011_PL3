import { createContext, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);
            if (existingProduct) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });

        // Show success alert
        setSnackbar({
            open: true,
            message: `${product.name} added to the cart!`,
            severity: 'success',
        });
    };

    const removeFromCart = (id) => {
        const removedProduct = cart.find((item) => item.id === id);
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));

        // Show success alert
        setSnackbar({
            open: true,
            message: `${removedProduct?.name} removed from the cart!`,
            severity: 'warning',
        });
    };

    const adjustQuantity = (id, amount) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + amount } : item
            )
        );

        // Show success alert
        const adjustedProduct = cart.find((item) => item.id === id);
        const newQuantity = adjustedProduct?.quantity + amount;
        setSnackbar({
            open: true,
            message: `Adjusted ${adjustedProduct?.name}'s quantity to ${newQuantity}.`,
            severity: 'info',
        });
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, adjustQuantity }}>
            {children}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </CartContext.Provider>
    );
};
