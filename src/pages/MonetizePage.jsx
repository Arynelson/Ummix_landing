import { useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { CONTACT_FORM_CC_EMAIL } from '../constants/urls'
import { useLocale } from '../LocaleProvider.jsx'
import { LABELS } from '../i18n-labels.js'
import { submitForm as sendForm } from '../services/formSubmit'
import { pushDataLayerEvent } from '../services/analytics'
import { MONETIZE_COPY } from '../monetize-copy.js'

function ArrowIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12 4 4L19 6" />
    </svg>
  )
}

function SignalVisual({ copy }) {
  return (
    <div className="monetize-signal" role="img" aria-label={copy.visualAria}>
      <div className="monetize-signal__topline">
        <span className="monetize-signal__status"><span aria-hidden="true" />{copy.visualStatus}</span>
        <span>{copy.visualRoute}</span>
      </div>

      <div className="monetize-signal__screen">
        <div className="monetize-signal__screen-head">
          <span>{copy.visualContent}</span>
          <span>{copy.visualTime}</span>
        </div>
        <svg className="monetize-signal__wave" viewBox="0 0 560 150" preserveAspectRatio="none" aria-hidden="true">
          <path className="monetize-signal__wave-grid" d="M0 30h560M0 75h560M0 120h560M70 0v150M140 0v150M210 0v150M280 0v150M350 0v150M420 0v150M490 0v150" />
          <path className="monetize-signal__wave-line" d="M0 76 C18 76 18 58 36 58 S55 91 74 91 93 70 111 70 129 78 148 78 164 30 182 30 199 116 218 116 237 70 255 70 274 86 292 86 309 50 327 50 346 104 364 104 382 68 399 68 418 78 436 78 454 39 472 39 490 109 508 109 527 76 546 76 552 76 560 76" />
          <circle className="monetize-signal__wave-dot" cx="327" cy="50" r="4" />
        </svg>
        <div className="monetize-signal__screen-foot">
          <span><i aria-hidden="true" /> {copy.visualAd}</span>
          <span>{copy.visualAdText}</span>
        </div>
      </div>

      <div className="monetize-signal__data">
        <div>
          <span>{copy.visualFormatLabel}</span>
          <strong>{copy.visualFormat}</strong>
        </div>
        <div>
          <span>{copy.visualAudienceLabel}</span>
          <strong><i aria-hidden="true" />{copy.visualAudience}</strong>
        </div>
      </div>
      <div className="monetize-signal__edge" aria-hidden="true" />
    </div>
  )
}

function Hero({ copy }) {
  return (
    <section className="monetize-hero" aria-labelledby="monetize-title">
      <div className="monetize-container monetize-hero__layout">
        <div className="monetize-hero__copy">
          <p className="monetize-kicker"><span aria-hidden="true" />{copy.eyebrow}</p>
          <h1 id="monetize-title">
            {copy.heroTitle}{' '}
            <span>{copy.heroAccent}</span>
          </h1>
          <p className="monetize-hero__description">{copy.heroDescription}</p>
          <div className="monetize-hero__actions">
            <a className="monetize-button monetize-button--primary" href="#cadastro">
              {copy.heroCta}
              <ArrowIcon />
            </a>
            <span className="monetize-hero__note">{copy.heroNote}</span>
          </div>
        </div>
        <SignalVisual copy={copy} />
      </div>
      <div className="monetize-hero__baseline" aria-hidden="true" />
    </section>
  )
}

function Proposal({ copy }) {
  return (
    <section className="monetize-section monetize-proposal" aria-labelledby="proposal-title">
      <div className="monetize-container monetize-proposal__layout">
        <div className="monetize-proposal__intro">
          <p className="monetize-section-note">A proposta</p>
          <h2 id="proposal-title">{copy.proposalTitle}</h2>
        </div>
        <div className="monetize-proposal__body">
          <p>{copy.proposalIntro}</p>
          <ul className="monetize-proposal__bullets">
            {copy.proposalBullets.map((item) => (
              <li key={item}><span aria-hidden="true" />{item}</li>
            ))}
          </ul>
          <p className="monetize-proposal__bridge">{copy.proposalBridge}</p>
          <p>{copy.proposalDescription}</p>
          <div className="monetize-equation" aria-label={copy.proposalClosing}>
            {copy.proposalEquation.map(([label, value]) => (
              <div className="monetize-equation__item" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <p className="monetize-proposal__closing">{copy.proposalClosing}</p>
        </div>
      </div>
    </section>
  )
}

function Process({ copy }) {
  return (
    <section id="como-funciona" className="monetize-section monetize-process" aria-labelledby="process-title">
      <div className="monetize-container monetize-process__layout">
        <div className="monetize-process__intro">
          <p className="monetize-section-note">Como funciona</p>
          <h2 id="process-title">{copy.processTitle}</h2>
          <p>{copy.processDescription}</p>
          <a className="monetize-button monetize-button--dark monetize-process__cta" href="#cadastro">
            {copy.processCta}
            <ArrowIcon />
          </a>
        </div>
        <ol className="monetize-process__list">
          {copy.steps.map(([title, description], index) => (
            <li key={title}>
              <span className="monetize-process__number">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Proof({ copy }) {
  return (
    <section className="monetize-section monetize-proof" aria-labelledby="proof-title">
      <div className="monetize-container monetize-proof__layout">
        <div className="monetize-proof__number">
          <p className="monetize-proof__eyebrow">{copy.proofEyebrow}</p>
          <h2 id="proof-title">{copy.proofNumber}</h2>
          <p className="monetize-proof__unit">{copy.proofUnit}</p>
          <p className="monetize-proof__time">{copy.proofTime}</p>
        </div>
        <div className="monetize-proof__body">
          <p>{copy.proofBody}</p>
          <p>{copy.proofExpansion}</p>
          <div className="monetize-proof__principles">
            {copy.proofPrinciples.map(([lead, ending]) => (
              <div key={lead}>
                <strong>{lead}</strong>
                <span>{ending}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FieldLabel({ htmlFor, label, required = true }) {
  return (
    <label className="monetize-field__label" htmlFor={htmlFor}>
      {label}{required ? <span aria-hidden="true">*</span> : null}
    </label>
  )
}

function ChoiceGroup({ name, options, required = true, value, onChange, labelledBy }) {
  return (
    <div className="monetize-choice" role="radiogroup" aria-labelledby={labelledBy}>
      {options.map((option) => (
        <label className="monetize-choice__item" key={option}>
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === undefined ? undefined : value === option}
            required={required}
            onChange={onChange}
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  )
}

function formatCnpj(value) {
  return String(value)
    .replace(/\D/g, '')
    .slice(0, 14)
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
}

function formatPhone(value) {
  const digits = String(value).replace(/\D/g, '').slice(0, 11)
  if (digits.length > 10) {
    return digits
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d{1,4})$/, '$1-$2')
  }
  return digits
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4})(\d{1,4})$/, '$1-$2')
}

function MonetizeForm({ copy, locale }) {
  const [status, setStatus] = useState('idle')
  const [hasStreaming, setHasStreaming] = useState('')
  const [audienceKnown, setAudienceKnown] = useState('')

  const handleStreamingChange = (event) => {
    const value = event.currentTarget.value
    setHasStreaming(value)
    if (value !== copy.yes) {
      setAudienceKnown('')
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setStatus('submitting')

    const formElement = event.currentTarget
    const formData = new FormData(formElement)

    try {
      await sendForm({
        ...Object.fromEntries(formData.entries()),
        _subject: copy.subject,
        _cc: CONTACT_FORM_CC_EMAIL,
        origem: 'monetize',
      })
      pushDataLayerEvent('ummix_lead_submitted', {
        form_name: 'monetize',
        page_type: 'monetize',
        language: locale === 'pt' ? 'pt-BR' : locale,
      })
      formElement.reset()
      setHasStreaming('')
      setAudienceKnown('')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="monetize-form-shell monetize-form-success" role="status" aria-live="polite">
        <div className="monetize-form-success__icon"><CheckIcon /></div>
        <h3>{copy.successTitle}</h3>
        <p>{copy.successDescription}</p>
        <p className="monetize-form-success__closing">{copy.successClosing}</p>
        <a className="monetize-button monetize-button--dark" href="#top">{copy.backToTop}<ArrowIcon /></a>
      </div>
    )
  }

  return (
    <form className="monetize-form-shell" onSubmit={onSubmit}>
      <fieldset>
        <legend>{copy.sections.vehicle}</legend>
        <div className="monetize-form-grid">
          <div className="monetize-field monetize-field--full">
            <FieldLabel htmlFor="monetize-vehicle-name" label={copy.fields.vehicleName} />
            <input id="monetize-vehicle-name" name="nomeVeiculo" type="text" placeholder={copy.placeholders.vehicleName} autoComplete="organization" required />
          </div>
          <div className="monetize-field monetize-field--full">
            <span className="monetize-field__label" id="monetize-vehicle-type-label">{copy.fields.vehicleType}<span aria-hidden="true">*</span></span>
            <ChoiceGroup name="tipoVeiculo" options={copy.vehicleTypes} required labelledBy="monetize-vehicle-type-label" />
          </div>
          <div className="monetize-field">
            <FieldLabel htmlFor="monetize-legal-name" label={copy.fields.legalName} />
            <input id="monetize-legal-name" name="razaoSocial" type="text" placeholder={copy.placeholders.legalName} autoComplete="organization" required />
          </div>
          <div className="monetize-field">
            <FieldLabel htmlFor="monetize-cnpj" label={copy.fields.cnpj} />
            <input id="monetize-cnpj" name="cnpj" type="text" inputMode="numeric" placeholder={copy.placeholders.cnpj} maxLength="18" autoComplete="off" onInput={(event) => { event.currentTarget.value = formatCnpj(event.currentTarget.value) }} required />
          </div>
          <div className="monetize-field">
            <FieldLabel htmlFor="monetize-city" label={copy.fields.city} />
            <input id="monetize-city" name="cidade" type="text" placeholder={copy.placeholders.city} autoComplete="address-level2" required />
          </div>
          <div className="monetize-field">
            <FieldLabel htmlFor="monetize-state" label={copy.fields.state} />
            <select id="monetize-state" name="estado" defaultValue="" autoComplete="address-level1" required>
              <option value="" disabled>{copy.statePlaceholder}</option>
              {copy.states.map(([value, label]) => <option value={value} key={value}>{label}</option>)}
            </select>
          </div>
          <div className="monetize-field monetize-field--full">
            <FieldLabel htmlFor="monetize-site" label={copy.fields.site} />
            <input id="monetize-site" name="site" type="text" inputMode="url" placeholder={copy.placeholders.site} autoComplete="url" spellCheck="false" required />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>{copy.sections.responsible}</legend>
        <div className="monetize-form-grid">
          <div className="monetize-field">
            <FieldLabel htmlFor="monetize-responsible-name" label={copy.fields.responsibleName} />
            <input id="monetize-responsible-name" name="nomeResponsavel" type="text" placeholder={copy.placeholders.responsibleName} autoComplete="name" required />
          </div>
          <div className="monetize-field">
            <FieldLabel htmlFor="monetize-role" label={copy.fields.role} />
            <input id="monetize-role" name="cargo" type="text" placeholder={copy.placeholders.role} autoComplete="organization-title" required />
          </div>
          <div className="monetize-field">
            <FieldLabel htmlFor="monetize-whatsapp" label={copy.fields.whatsapp} />
            <input id="monetize-whatsapp" name="whatsapp" type="tel" inputMode="tel" placeholder={copy.placeholders.whatsapp} autoComplete="tel" maxLength="15" onInput={(event) => { event.currentTarget.value = formatPhone(event.currentTarget.value) }} required />
          </div>
          <div className="monetize-field">
            <FieldLabel htmlFor="monetize-email" label={copy.fields.email} />
            <input id="monetize-email" name="email" type="email" placeholder={copy.placeholders.email} autoComplete="email" required />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>{copy.sections.streaming}</legend>
        <div className="monetize-form-grid">
          <div className="monetize-field monetize-field--full">
            <span className="monetize-field__label" id="monetize-has-streaming-label">{copy.fields.hasStreaming}<span aria-hidden="true">*</span></span>
            <ChoiceGroup
              name="possuiStreaming"
              options={[copy.yes, copy.no]}
              value={hasStreaming}
              onChange={handleStreamingChange}
              required
              labelledBy="monetize-has-streaming-label"
            />
          </div>
          {hasStreaming === copy.yes ? (
            <>
              <div className="monetize-field monetize-field--full">
                <span className="monetize-field__label" id="monetize-stream-type-label">{copy.fields.streamType}<span aria-hidden="true">*</span></span>
                <ChoiceGroup name="tipoStreaming" options={copy.streamTypes} required labelledBy="monetize-stream-type-label" />
              </div>
              <div className="monetize-field monetize-field--full">
                <FieldLabel htmlFor="monetize-stream-link" label={copy.fields.streamLink} />
                <input id="monetize-stream-link" name="linkStreaming" type="url" placeholder={copy.placeholders.streamLink} required />
              </div>
              <div className="monetize-field monetize-field--full">
                <FieldLabel htmlFor="monetize-provider" label={copy.fields.provider} required={false} />
                <input id="monetize-provider" name="fornecedorStreaming" type="text" placeholder={copy.placeholders.provider} />
              </div>
              <div className="monetize-field monetize-field--full">
                <FieldLabel htmlFor="monetize-monthly-cost" label={copy.fields.monthlyCost} />
                <select id="monetize-monthly-cost" name="custoStreaming" defaultValue="" required>
                  <option value="" disabled>{copy.chooseOption}</option>
                  {copy.costOptions.map((option) => <option value={option} key={option}>{option}</option>)}
                </select>
              </div>
              <div className="monetize-field monetize-field--full">
                <span className="monetize-field__label" id="monetize-audience-known-label">{copy.fields.knowsAudience}<span aria-hidden="true">*</span></span>
                <ChoiceGroup
                  name="conheceAudiencia"
                  options={[copy.yes, copy.no]}
                  value={audienceKnown}
                  onChange={(event) => setAudienceKnown(event.currentTarget.value)}
                  required
                  labelledBy="monetize-audience-known-label"
                />
              </div>
              {audienceKnown === copy.yes ? (
                <div className="monetize-field monetize-field--full monetize-audience-field">
                  <FieldLabel htmlFor="monetize-monthly-audience" label={copy.fields.monthlyAudience} />
                  <input id="monetize-monthly-audience" name="audienciaMensal" type="number" min="0" inputMode="numeric" placeholder={copy.placeholders.monthlyAudience} required />
                  <p>{copy.audienceHint}</p>
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </fieldset>

      <fieldset className="monetize-consent">
        <legend>{copy.sections.consent}</legend>
        <label className="monetize-consent__label">
          <input type="checkbox" name="consentimento" value="autorizado" required />
          <span>{copy.consent}</span>
        </label>
      </fieldset>

      {status === 'error' ? <p className="monetize-form-error" role="alert">{copy.error}</p> : null}
      <button className="monetize-button monetize-button--submit" type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? copy.submitting : copy.submit}
        <ArrowIcon />
      </button>
    </form>
  )
}

function Registration({ copy, locale }) {
  return (
    <section id="cadastro" className="monetize-section monetize-registration" aria-labelledby="registration-title">
      <div className="monetize-container monetize-registration__layout">
        <div className="monetize-registration__intro">
          <p className="monetize-section-note">{copy.formEyebrow}</p>
          <h2 id="registration-title">{copy.formTitle}</h2>
          <p>{copy.formDescription}</p>
          <ol className="monetize-registration__steps">
            {copy.formSteps.map(([title, description], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><strong>{title}</strong><p>{description}</p></div>
              </li>
            ))}
          </ol>
          <p className="monetize-registration__privacy">{copy.privacyNote}</p>
        </div>
        <MonetizeForm copy={copy} locale={locale} />
      </div>
    </section>
  )
}

export default function MonetizePage() {
  const { locale } = useLocale()
  const copy = MONETIZE_COPY[locale]
  const labels = LABELS[locale]

  return (
    <div className="monetize-page" id="top">
      <Header active="/monetize" />
      <a className="skip-link" href="#main-content">{labels.skipToContent}</a>
      <main id="main-content" tabIndex="-1">
        <Hero copy={copy} />
        <Proposal copy={copy} />
        <Process copy={copy} />
        <Proof copy={copy} />
        <Registration copy={copy} locale={locale} />
      </main>
      <Footer />
    </div>
  )
}
