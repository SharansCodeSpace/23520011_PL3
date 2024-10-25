import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import theme from '../theme';
import { ThemeProvider } from '@mui/material/styles';
import { useCart } from '../context/CartContext';
import { Shimmer } from 'react-shimmer';

function ProductList() {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        fetch('/products.json')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Grid container spacing={4} className="p-5">
                {products.map(product => (
                    <Grid item xs={12} sm={6} md={3} key={product.id}>
                        <Card>
                            {!imageLoaded && (
                                <Shimmer width={350} height={350} />
                            )}
                            <CardMedia
                                component="img"
                                image={product.image}
                                alt={product.name}
                                onLoad={() => setImageLoaded(true)}
                                style={{ display: imageLoaded ? 'block' : 'none' }}
                            />
                            <CardContent>
                                <Typography variant="h6" className='font-bold'>{product.name}</Typography>
                                <Typography variant="body2" color="textSecondary" className='font-semibold'>Rs. {product.price}</Typography>
                                <div className='flex justify-between mt-2'>
                                    <Button component={Link} to={`/product/${product.id}`}>View Details</Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className="mt-2"
                                        onClick={() => addToCart(product)} // Add product to cart
                                    >
                                        Add to Cart
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </ThemeProvider>
    );
}

export default ProductList;
