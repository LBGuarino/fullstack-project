import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

export interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  description: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  image,
  description,
}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Image src={image} alt={name} width={200} height={200} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to Cart</Button>
        <Button size="small">Add to Wishlist</Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
