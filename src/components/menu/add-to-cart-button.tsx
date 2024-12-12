'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { formatCurrency } from '@/lib/formatters';
import { Checkbox } from '../ui/checkbox';
import { Extra, ProductSizes, Size } from '@prisma/client';
import { ProductWithRelations } from '@/types/product';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  addCartItem,
  removeCartItem,
  removeItemFromCart,
  selectCartItems,
} from '@/redux/features/cart/cartSlice';
import { getItemQuantity } from '@/lib/cart';

function AddToCartButton({ item }: { item: ProductWithRelations }) {
  const cart = useAppSelector(selectCartItems);
  const quantity = getItemQuantity(item.id, cart);
  const dispatch = useAppDispatch();
  const defaultSize =
    cart.find((element) => element.id === item.id)?.size ||
    item.sizes.find((size) => size.name === ProductSizes.SMALL);

  const defaultExtras =
    cart.find((element) => element.id === item.id)?.extras || [];

  const [selectedSize, setSelectedSize] = useState<Size>(defaultSize!);
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>(defaultExtras);

  let totalPrice = item.basePrice;
  if (selectedSize) {
    totalPrice += selectedSize.price;
  }
  if (selectedExtras.length > 0) {
    for (const extra of selectedExtras) {
      totalPrice += extra.price;
    }
  }

  const handleAddToCart = () => {
    dispatch(
      addCartItem({
        basePrice: item.basePrice,
        id: item.id,
        image: item.image,
        name: item.name,
        size: selectedSize,
        extras: selectedExtras,
      })
    );
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type='button'
          size='lg'
          className='mt-4 text-white rounded-full !px-8'
        >
          <span>Add To Cart</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] max-h-[80vh] overflow-y-auto'>
        <DialogHeader className='flex items-center'>
          <Image src={item.image} alt={item.name} width={200} height={200} />
          <DialogTitle>{item.name}</DialogTitle>
          <DialogDescription className='text-center'>
            {item.description}
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-10'>
          <div className='space-y-4 text-center'>
            <Label htmlFor='pick-size'>Pick your size</Label>
            <PickSize
              sizes={item.sizes}
              item={item}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />
          </div>
          <div className='space-y-4 text-center'>
            <Label htmlFor='add-extras'>Any extras?</Label>
            <Extras
              extras={item.extras}
              selectedExtras={selectedExtras}
              setSelectedExtras={setSelectedExtras}
            />
          </div>
        </div>
        <DialogFooter>
          {quantity === 0 ? (
            <Button
              type='submit'
              onClick={handleAddToCart}
              className='w-full h-10'
            >
              Add to cart {formatCurrency(totalPrice)}
            </Button>
          ) : (
            <ChooseQuantity
              quantity={quantity}
              item={item}
              selectedSize={selectedSize}
              selectedExtras={selectedExtras}
            />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddToCartButton;

function PickSize({
  sizes,
  item,
  selectedSize,
  setSelectedSize,
}: {
  sizes: Size[];
  selectedSize: Size;
  item: ProductWithRelations;
  setSelectedSize: React.Dispatch<React.SetStateAction<Size>>;
}) {
  return (
    <RadioGroup defaultValue='comfortable'>
      {sizes.map((size) => (
        <div
          key={size.id}
          className='flex items-center space-x-2 border border-gray-100 rounded-md p-4'
        >
          <RadioGroupItem
            value={selectedSize.name}
            checked={selectedSize.id === size.id}
            onClick={() => setSelectedSize(size)}
            id={size.id}
          />
          <Label htmlFor={size.id}>
            {size.name} {formatCurrency(size.price + item.basePrice)}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
function Extras({
  extras,
  selectedExtras,
  setSelectedExtras,
}: {
  extras: Extra[];
  selectedExtras: Extra[];
  setSelectedExtras: React.Dispatch<React.SetStateAction<Extra[]>>;
}) {
  const handleExtra = (extra: Extra) => {
    if (selectedExtras.find((e) => e.id === extra.id)) {
      const filteredSelectedExtras = selectedExtras.filter(
        (item) => item.id !== extra.id
      );
      setSelectedExtras(filteredSelectedExtras);
    } else {
      setSelectedExtras((prev) => [...prev, extra]);
    }
  };
  return extras.map((extra) => (
    <div
      key={extra.id}
      className='flex items-center space-x-2 border border-gray-100 rounded-md p-4'
    >
      <Checkbox
        id={extra.id}
        onClick={() => handleExtra(extra)}
        checked={Boolean(selectedExtras.find((e) => e.id === extra.id))}
      />
      <Label
        htmlFor={extra.id}
        className='text-sm text-accent font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
      >
        {extra.name} {formatCurrency(extra.price)}
      </Label>
    </div>
  ));
}

const ChooseQuantity = ({
  quantity,
  item,
  selectedExtras,
  selectedSize,
}: {
  quantity: number;
  selectedExtras: Extra[];
  selectedSize: Size;
  item: ProductWithRelations;
}) => {
  const dispatch = useAppDispatch();
  return (
    <div className='flex items-center flex-col gap-2 mt-4 w-full'>
      <div className='flex items-center justify-center gap-2'>
        <Button
          variant='outline'
          onClick={() => dispatch(removeCartItem({ id: item.id }))}
        >
          -
        </Button>
        <div>
          <span className='text-black'>{quantity} in cart</span>
        </div>
        <Button
          variant='outline'
          onClick={() =>
            dispatch(
              addCartItem({
                basePrice: item.basePrice,
                id: item.id,
                image: item.image,
                name: item.name,
                extras: selectedExtras,
                size: selectedSize,
              })
            )
          }
        >
          +
        </Button>
      </div>
      <Button
        size='sm'
        onClick={() => dispatch(removeItemFromCart({ id: item.id }))}
      >
        Remove
      </Button>
    </div>
  );
};
