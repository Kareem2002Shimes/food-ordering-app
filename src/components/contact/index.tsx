import MainHeading from '@/components/main-heading';
import { Routes } from '@/constants/enums';
import { getCurrentLocale } from '@/lib/getCurrentLocale';
import getTrans from '@/lib/translation';

const Contact = async () => {
  const locale = await getCurrentLocale();
  const { home } = await getTrans(locale);
  const { contact } = home;
  return (
    <section className='section-gap' id={Routes.CONTACT}>
      <div className='container text-center'>
        <MainHeading
          subTitle={contact["Don'tHesitate"]}
          title={contact.contactUs}
        />
        <div className='mt-8'>
          <a className='text-4xl underline text-accent' href='tel:+2012121212'>
            +2012121212
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
