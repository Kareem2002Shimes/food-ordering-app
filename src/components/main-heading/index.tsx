function MainHeading({ title, subTitle }: { title: string; subTitle: string }) {
  return (
    <>
      <span className='uppercase text-accent font-semibold leading-4'>
        {subTitle}
      </span>
      <h2 className='text-primary font-bold text-4xl italic'>{title}</h2>
    </>
  );
}

export default MainHeading;
