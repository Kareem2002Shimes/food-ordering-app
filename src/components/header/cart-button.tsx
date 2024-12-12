'use client';
import React from 'react';
import Link from '../link';
import { Routes } from '@/constants/enums';
import { ShoppingCartIcon } from 'lucide-react';
import { getCartQuantity } from '@/lib/cart';
import { useAppSelector } from '@/redux/hooks';
import { selectCartItems } from '@/redux/features/cart/cartSlice';

const CartButton = () => {
  const cart = useAppSelector(selectCartItems);
  const cartQuantity = getCartQuantity(cart);
  return (
    <Link href={`/${Routes.CART}`} className='block relative group'>
      <span className='absolute -top-4 start-4 w-5 h-5 text-sm bg-primary rounded-full text-white text-center'>
        {cartQuantity}
      </span>
      <ShoppingCartIcon
        className={`text-accent group-hover:text-primary duration-200 transition-colors !w-6 !h-6`}
      />
    </Link>
  );
};

export default CartButton;
