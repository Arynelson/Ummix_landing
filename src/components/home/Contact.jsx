import { useEffect, useState } from 'react';
import { CONTACT_FORM_ENDPOINT } from '../../constants/urls';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';

const INITIAL_FORM = {
  name: '',
  phone: '',
  email: '',
  message: '',
};

export default function Contact() {
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
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...form,
          _subject: 'Novo contato pelo site da Ummix',
        }),
      });

      if (!response.ok) throw new Error('Não foi possível enviar o formulário.');

      setStatus('success');
      setForm(INITIAL_FORM);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contato" className="relative overflow-hidden bg-ummix-dark px-6 py-28 text-white md:px-16 md:py-36">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center bottom, rgba(155,25,26,.25), transparent 60%)' }}
        aria-hidden="true"
      />

      <div ref={anim.ref} style={anim.style} className="relative mx-auto flex max-w-5xl justify-center">
        <h2 className="sr-only">Fale com a Ummix</h2>
        <button
          type="button"
          onClick={() => {
            setStatus('idle');
            setIsOpen(true);
          }}
          className="inline-flex min-h-14 items-center gap-3 rounded-full bg-ummix-red px-9 py-4 font-sans text-base font-bold text-white shadow-[0_16px_32px_-10px_rgba(155,25,26,0.6)] transition-transform hover:scale-[1.03]"
        >
          Falar com a Ummix <span aria-hidden="true">→</span>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-black/65 px-4 py-6" role="presentation" onMouseDown={() => setIsOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-form-title"
            className="relative w-full max-w-xl rounded-3xl bg-white p-6 text-ummix-dark shadow-2xl md:p-9"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full text-ummix-dark transition-colors hover:bg-ummix-gray"
              aria-label="Fechar formulário"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>

            <h3 id="contact-form-title" className="pr-12 font-heading text-3xl font-extrabold tracking-tight">
              Fale com a Ummix
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-ummix-gray-dark">
              Conte um pouco sobre o que você precisa. Nossa equipe entra em contato.
            </p>

            {status === 'success' ? (
              <div className="mt-8 rounded-2xl bg-ummix-gray p-6" role="status">
                <p className="font-heading text-xl font-extrabold">Mensagem enviada.</p>
                <p className="mt-2 text-sm text-ummix-gray-dark">Obrigado pelo contato. Em breve, falaremos com você.</p>
              </div>
            ) : (
              <form className="mt-8 space-y-5" onSubmit={submitForm}>
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm font-bold">Nome*</label>
                  <input id="contact-name" name="name" value={form.name} onChange={updateField} required autoComplete="name" className="min-h-12 w-full rounded-xl border border-ummix-dark/20 px-4 text-base" />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="mb-2 block text-sm font-bold">Telefone*</label>
                  <input id="contact-phone" name="phone" value={form.phone} onChange={updateField} required type="tel" autoComplete="tel" className="min-h-12 w-full rounded-xl border border-ummix-dark/20 px-4 text-base" />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm font-bold">E-mail*</label>
                  <input id="contact-email" name="email" value={form.email} onChange={updateField} required type="email" autoComplete="email" className="min-h-12 w-full rounded-xl border border-ummix-dark/20 px-4 text-base" />
                </div>
                <div>
                  <label htmlFor="contact-message" className="mb-2 block text-sm font-bold">Mensagem</label>
                  <textarea id="contact-message" name="message" value={form.message} onChange={updateField} rows="4" className="w-full rounded-xl border border-ummix-dark/20 px-4 py-3 text-base" />
                </div>
                {status === 'error' && <p className="text-sm font-semibold text-ummix-red" role="alert">Não foi possível enviar agora. Tente novamente em alguns instantes.</p>}
                <button type="submit" disabled={status === 'submitting'} className="inline-flex min-h-12 items-center justify-center rounded-full bg-ummix-red px-7 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-70">
                  {status === 'submitting' ? 'Enviando...' : 'Enviar mensagem'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
