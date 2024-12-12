import CartItems from './_components/CartItems';
import CheckoutForm from './_components/CheckoutForm';

function CartPage() {
  return (
    <main>
      <section className='section-gap'>
        <div className='container'>
          <h1 className='text-primary text-center font-bold text-4xl italic mb-10'>
            Cart
          </h1>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
            <CartItems />
            <CheckoutForm />
          </div>
        </div>
      </section>
    </main>
  );
}

export default CartPage;
