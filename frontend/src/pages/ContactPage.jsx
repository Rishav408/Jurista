import ContactInfo from '../components/contact/ContactInfo';
import ContactForm from '../components/contact/ContactForm';
import FAQ from '../components/contact/FAQ';

/** Contact page — split layout with character + FAQ accordion. */
export default function ContactPage() {
  return (
    <>
      <section className="pb-16 pt-20 sm:pt-28">
        <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <ContactInfo />
          <ContactForm />
        </div>
      </section>
      <FAQ />
    </>
  );
}
