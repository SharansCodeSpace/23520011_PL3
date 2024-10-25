import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Typography, Button, Card, CardContent, CardMedia } from '@mui/material';
import { useCart } from '../context/CartContext';
import theme from '../theme';
import { ThemeProvider } from '@mui/material/styles';

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        fetch('/products.json')
            .then(res => res.json())
            .then(data => {
                const selectedProduct = data.find(prod => prod.id === parseInt(id));
                setProduct(selectedProduct);
            });
    }, [id]);

    if (!product) return <Typography>Loading...</Typography>;

    return (
        <ThemeProvider theme={theme}>
            <Card className="m-5">
                <CardMedia
                    className='h-96'
                    component="img"
                    image={product.image}
                    alt={product.name}
                />
                <CardContent>
                    <Typography variant="h4">{product.name}</Typography>
                    <Typography variant="body1">{product.description}</Typography>
                    <Typography variant="h6">Rs. {product.price}</Typography>
                    <Button
                        className='mt-2'
                        variant="contained"
                        color="secondary"
                        onClick={() => addToCart(product)}
                    >
                        Add to Cart
                    </Button>
                </CardContent>
            </Card>
        </ThemeProvider>
    );
}

export default ProductDetails;
