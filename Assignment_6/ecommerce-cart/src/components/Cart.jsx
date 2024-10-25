import { useCart } from '../context/CartContext';
import { Button, Typography, Card, CardContent, Grid } from '@mui/material';
import theme from '../theme';
import { ThemeProvider } from '@mui/material/styles';

function Cart() {
    const { cart, removeFromCart, adjustQuantity } = useCart();

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <ThemeProvider theme={theme}>
            <div className="p-5 flex flex-col gap-4">
                <Typography variant="h4" className='mb-3'>Your Cart</Typography>
                {cart.length === 0 ? (
                    <Typography>Your cart is empty</Typography>
                ) : (
                    <>
                        <Grid container spacing={3}>
                            {cart.map(item => (
                                <Grid item xs={12} sm={6} key={item.id}>
                                    <Card>
                                        <CardContent className='flex flex-col gap-3'>
                                            <Typography variant='h6'>{item.name}</Typography>
                                            <Typography>Quantity: {item.quantity}</Typography>
                                            <Typography>Price: Rs. {item.price}</Typography>
                                            <div className='flex gap-2 items-center'>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    Remove
                                                </Button>
                                                <Button
                                                    onClick={() => adjustQuantity(item.id, 1)}
                                                    disabled={item.quantity >= 10}
                                                >
                                                    <span className='text-lg'>Add</span>
                                                </Button>
                                                <Button
                                                    onClick={() => adjustQuantity(item.id, -1)}
                                                    disabled={item.quantity === 1}
                                                >
                                                    <span className='text-lg'>Subtract</span>
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Typography variant="h6">Total Amount : Rs. {totalPrice.toFixed(2)}</Typography>
                    </>
                )}
            </div>
        </ThemeProvider>
    );
}

export default Cart;
