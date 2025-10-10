'use client'

import { FormEvent, useMemo, useState } from 'react'

const PRICE_FORMATTER = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const SHIPPING_OPTIONS = [
  {
    id: 'digital',
    label: 'Digital delivery',
    description: 'Receive the album instantly via email.',
    price: 0,
  },
  {
    id: 'express',
    label: 'Express vinyl shipping',
    description: 'Limited edition vinyl shipped worldwide in 3-5 days.',
    price: 18,
  },
] as const

const CHECKOUT_STEPS = [
  {
    title: '1. Review your order',
    description:
      'Confirm the track list, collectable artwork, and production notes included in your bundle.',
  },
  {
    title: '2. Share contact details',
    description: 'Let us know where to send the download link and release updates.',
  },
  {
    title: '3. Complete payment',
    description: 'Stripe securely handles your card details and confirmation email.',
  },
] as const

const PRODUCT = {
  title: 'El Niño Maravilla – Collector Bundle',
  description:
    'A Stripe powered checkout that bundles the deluxe digital album, studio commentary, and a numbered vinyl pressing.',
  price: 48,
  whatsIncluded: [
    'Deluxe digital album in WAV & MP3 formats',
    'Producer commentary and behind-the-scenes booklet',
    'Numbered vinyl pressing with signed art print',
  ],
} as const

type CheckoutStatus = 'idle' | 'processing' | 'success'

type CheckoutFormState = {
  email: string
  fullName: string
  cardNumber: string
  expiry: string
  cvc: string
  shippingOption: (typeof SHIPPING_OPTIONS)[number]['id']
  saveCard: boolean
  note: string
}

const DEFAULT_FORM_STATE: CheckoutFormState = {
  email: '',
  fullName: '',
  cardNumber: '',
  expiry: '',
  cvc: '',
  shippingOption: SHIPPING_OPTIONS[0].id,
  saveCard: true,
  note: '',
}

type TextFieldProps = {
  label: string
  name: keyof CheckoutFormState
  value: string
  placeholder: string
  onChange: (value: string) => void
  type?: 'text' | 'email'
}

const TextField = ({ label, name, value, placeholder, onChange, type = 'text' }: TextFieldProps) => (
  <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
    {label}
    <input
      aria-label={label}
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-base font-normal text-slate-900 shadow-inner transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
      name={name}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      type={type}
      value={value}
    />
  </label>
)

const formatPrice = (price: number) => PRICE_FORMATTER.format(price)

const StripeCheckoutDemo = () => {
  const [status, setStatus] = useState<CheckoutStatus>('idle')
  const [formState, setFormState] = useState<CheckoutFormState>(DEFAULT_FORM_STATE)

  const selectedShipping = useMemo(
    () => SHIPPING_OPTIONS.find((option) => option.id === formState.shippingOption) ?? SHIPPING_OPTIONS[0],
    [formState.shippingOption],
  )

  const total = useMemo(() => PRODUCT.price + selectedShipping.price, [selectedShipping.price])

  const handleInputChange = (field: keyof CheckoutFormState) => (value: string | boolean) => {
    setFormState((previous) => ({
      ...previous,
      [field]: value,
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (status === 'processing') {
      return
    }

    setStatus('processing')

    window.setTimeout(() => {
      setStatus('success')
    }, 900)
  }

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <span className="rounded-full bg-slate-900/90 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white">
          Stripe demo
        </span>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Experience the checkout flow</h1>
        <p className="max-w-2xl text-base text-slate-600 sm:text-lg">
          This standalone page recreates a Stripe-powered checkout for the El Niño Maravilla collector bundle.
          Explore the order details, share your information, and simulate a payment confirmation without
          touching a live card.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <section className="space-y-6">
          <article className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-slate-900">{PRODUCT.title}</h2>
              <p className="text-sm text-slate-600 sm:text-base">{PRODUCT.description}</p>
            </div>

            <dl className="grid gap-3 text-sm text-slate-700">
              <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                <dt className="font-medium">Bundle price</dt>
                <dd className="font-semibold text-slate-900">{formatPrice(PRODUCT.price)}</dd>
              </div>
              {PRODUCT.whatsIncluded.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-transparent px-3 py-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-slate-400" aria-hidden />
                  <p className="text-slate-600">{item}</p>
                </div>
              ))}
            </dl>

            <div className="grid gap-3 rounded-2xl bg-slate-50 p-4">
              {CHECKOUT_STEPS.map((step) => (
                <div key={step.title} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">{step.description}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Try the checkout</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField
                  label="Email"
                  name="email"
                  onChange={handleInputChange('email')}
                  placeholder="you@example.com"
                  type="email"
                  value={formState.email}
                />
                <TextField
                  label="Full name"
                  name="fullName"
                  onChange={handleInputChange('fullName')}
                  placeholder="Ada Lovelace"
                  value={formState.fullName}
                />
              </div>

              <fieldset className="space-y-3">
                <legend className="text-sm font-semibold text-slate-700">Delivery</legend>
                {SHIPPING_OPTIONS.map((option) => (
                  <label
                    key={option.id}
                    className={`flex cursor-pointer flex-col gap-1 rounded-2xl border p-4 transition focus-within:ring-2 focus-within:ring-slate-200 ${
                      option.id === formState.shippingOption
                        ? 'border-slate-900 bg-slate-900/5'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          checked={option.id === formState.shippingOption}
                          className="h-4 w-4 border-slate-300 text-slate-900 focus:ring-slate-400"
                          name="shippingOption"
                          onChange={() => handleInputChange('shippingOption')(option.id)}
                          type="radio"
                          value={option.id}
                        />
                        <p className="text-sm font-medium text-slate-800">{option.label}</p>
                      </div>
                      <span className="text-sm font-semibold text-slate-900">{formatPrice(option.price)}</span>
                    </div>
                    <p className="pl-7 text-sm text-slate-500">{option.description}</p>
                  </label>
                ))}
              </fieldset>

              <div className="grid gap-4">
                <TextField
                  label="Card number"
                  name="cardNumber"
                  onChange={handleInputChange('cardNumber')}
                  placeholder="4242 4242 4242 4242"
                  value={formState.cardNumber}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField
                    label="Expiry"
                    name="expiry"
                    onChange={handleInputChange('expiry')}
                    placeholder="12 / 28"
                    value={formState.expiry}
                  />
                  <TextField
                    label="CVC"
                    name="cvc"
                    onChange={handleInputChange('cvc')}
                    placeholder="123"
                    value={formState.cvc}
                  />
                </div>
              </div>

              <label className="flex items-start gap-3 text-sm text-slate-600">
                <input
                  checked={formState.saveCard}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400"
                  name="saveCard"
                  onChange={(event) => handleInputChange('saveCard')(event.target.checked)}
                  type="checkbox"
                />
                <span>Securely store this card for future tour drops and limited releases.</span>
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Add a note (optional)
                <textarea
                  aria-label="Add a note"
                  className="min-h-[96px] w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-base font-normal text-slate-900 shadow-inner transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  name="note"
                  onChange={(event) => handleInputChange('note')(event.target.value)}
                  placeholder="Share a dedication or shipping instructions."
                  value={formState.note}
                />
              </label>

              <button
                className="w-full rounded-xl bg-slate-900 px-5 py-3 text-base font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                disabled={status === 'processing'}
                type="submit"
              >
                {status === 'processing' ? 'Processing payment…' : `Pay ${formatPrice(total)}`}
              </button>

              {status === 'success' && (
                <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  Payment simulated! In a live integration Stripe would now display the success screen and send
                  a receipt to {formState.email || 'your inbox'}.
                </p>
              )}
            </form>
          </article>
        </section>

        <aside className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Order summary</h2>
          <dl className="space-y-4 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <dt>Collector bundle</dt>
              <dd className="font-semibold text-slate-900">{formatPrice(PRODUCT.price)}</dd>
            </div>
            <div className="flex items-start justify-between">
              <dt className="flex flex-col">
                Delivery
                <span className="text-xs font-normal text-slate-500">{selectedShipping.label}</span>
              </dt>
              <dd className="font-semibold text-slate-900">{formatPrice(selectedShipping.price)}</dd>
            </div>
            <div className="h-px bg-slate-200" aria-hidden />
            <div className="flex items-center justify-between text-base font-semibold text-slate-900">
              <dt>Total due today</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">
            <p className="font-semibold text-slate-800">How this demo works</p>
            <p className="mt-2">
              Use sandbox card details (like <code className="rounded bg-white px-1 py-0.5">4242 4242 4242 4242</code>) to
              walk through the exact flow a fan experiences. No payment is captured in this environment.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default StripeCheckoutDemo
