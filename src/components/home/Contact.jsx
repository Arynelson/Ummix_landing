import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
import { submitForm as sendForm } from '../../services/formSubmit';
import { pushDataLayerEvent } from '../../services/analytics';
import { useLocale } from '../../LocaleProvider.jsx';
import { HOME_COPY } from '../../home-copy.js';
import { Button, IconButton, Input, Textarea, Toast } from '../../ds/components';

const INITIAL_FORM = {
  name: '',
  phone: '',
  email: '',
  message: '',
};

export default function Contact() {
  const { locale } = useLocale();
  const copy = HOME_COPY[locale].contact;
  const anim = useAnimateOnScroll();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setStatus('submitting');

    try {
      await sendForm({
        ...form,
        _form_type: 'contact',
      });

      pushDataLayerEvent('ummix_lead_submitted', {
        form_name: 'contact',
        page_type: 'home',
        language: locale === 'pt' ? 'pt-BR' : locale,
      });
      setStatus('success');
      setForm(INITIAL_FORM);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contato" data-theme="dark" className="relative overflow-hidden bg-ink-900 px-6 py-16 text-body md:px-16 md:py-20">

      <div ref={anim.ref} style={anim.style} className="relative mx-auto flex max-w-5xl flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <h2 className="max-w-xl font-display text-3xl font-bold leading-tight tracking-tight text-strong md:text-4xl">{copy.sectionTitle}</h2>
        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            setStatus('idle');
            setIsOpen(true);
          }}
          iconRight={<span aria-hidden="true">→</span>}
        >
          {copy.button}
        </Button>
      </div>

      {/* O modal vai para o <body>: fora do data-theme="dark" da seção, o formulário usa o tema claro. */}
      {isOpen && createPortal(
        <div className="fixed inset-0 z-70 grid place-items-center overflow-y-auto bg-overlay px-4 py-4 sm:py-6" role="presentation" onMouseDown={() => setIsOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-form-title"
            className="relative max-h-[calc(100dvh-2rem)] w-full max-w-xl overflow-y-auto rounded-[var(--radius-xl)] bg-card p-5 text-strong shadow-[var(--shadow-lg)] sm:p-6 md:p-9"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <IconButton
              label={copy.close}
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="lg"
              className="absolute right-5 top-5"
            >
              <X size={20} strokeWidth={1.75} aria-hidden="true" />
            </IconButton>

            <h3 id="contact-form-title" className="pr-12 font-display text-3xl font-bold tracking-tight text-strong">
              {copy.title}
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-body">
              {copy.description}
            </p>

            {status === 'success' ? (
              <div className="mt-8">
                <Toast tone="success" title={copy.successTitle} message={copy.successDescription} />
              </div>
            ) : (
              <form className="mt-6 space-y-4 sm:mt-8 sm:space-y-5" onSubmit={submitForm}>
                <Input id="contact-name" label={copy.name} name="name" value={form.name} onChange={updateField} required autoComplete="name" />
                <Input id="contact-phone" label={copy.phone} name="phone" value={form.phone} onChange={updateField} required type="tel" autoComplete="tel" />
                <Input id="contact-email" label={copy.email} name="email" value={form.email} onChange={updateField} required type="email" autoComplete="email" />
                <Textarea id="contact-message" label={copy.message} name="message" value={form.message} onChange={updateField} rows={3} />
                {status === 'error' && (
                  <div role="alert">
                    <Toast tone="danger" message={copy.error} />
                  </div>
                )}
                <Button type="submit" variant="primary" size="lg" disabled={status === 'submitting'}>
                  {status === 'submitting' ? copy.submitting : copy.submit}
                </Button>
              </form>
            )}
          </div>
        </div>,
        document.body,
      )}
    </section>
  );
}
