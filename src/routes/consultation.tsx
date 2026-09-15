import { createFileRoute, Link, useSearch } from '@tanstack/react-router'
import { useState } from 'react'

import { DemoLayout } from '@/components/DemoChrome'
import { brand } from '@/lib/trd-data'

export const Route = createFileRoute('/consultation')({
  head: () => ({
    meta: [
      { title: `Consultation — ${brand.shortName}` },
      { name: 'description', content: 'Request a consultation with TheRealtorDubai.' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: ConsultationPage,
})

function ConsultationPage() {
  const search = useSearch({ from: '/consultation' }) as { context?: string; intent?: string }
  const defaultIntent = ['buy', 'rent', 'sell', 'invest'].includes(search.intent || '') ? search.intent! : 'buy'
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setError('')

    const form = new FormData(event.currentTarget)
    const payload = Object.fromEntries(form.entries())

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Unable to send your request.')
      setStatus('success')
      event.currentTarget.reset()
    } catch (submissionError) {
      setStatus('error')
      setError(submissionError instanceof Error ? submissionError.message : 'Unable to send your request.')
    }
  }

  return (
    <DemoLayout>
      <section className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
        <p className="eyebrow text-brass-deep">Consultation</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Talk to a Dubai property advisor
        </h1>
        <p className="mt-5 max-w-2xl text-muted-foreground">
          Tell us what you are looking for and an advisor can follow up with you directly.
        </p>

        {status === 'success' ? (
          <div className="mt-10 rounded-sm border border-border bg-card p-8">
            <h2 className="text-2xl font-semibold">Request sent</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Thank you. Your consultation request has been sent to {brand.shortName}.
            </p>
            <Link to="/" className="mt-6 inline-block text-sm underline underline-offset-4">
              Return home
            </Link>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-10 space-y-6 rounded-sm border border-border bg-card p-6 sm:p-8">
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <input type="hidden" name="context" value={search.context || ''} />

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="text-sm font-medium">Name<input required name="name" maxLength={100} className="mt-2 w-full rounded-sm border border-input bg-background px-3 py-3 font-normal" /></label>
              <label className="text-sm font-medium">Email<input required type="email" name="email" maxLength={200} className="mt-2 w-full rounded-sm border border-input bg-background px-3 py-3 font-normal" /></label>
              <label className="text-sm font-medium">Phone<input required name="phone" maxLength={40} className="mt-2 w-full rounded-sm border border-input bg-background px-3 py-3 font-normal" /></label>
              <label className="text-sm font-medium">I want to
                <select name="intent" defaultValue={defaultIntent} className="mt-2 w-full rounded-sm border border-input bg-background px-3 py-3 font-normal">
                  <option value="buy">Buy</option><option value="rent">Rent</option><option value="sell">Sell</option><option value="invest">Invest</option>
                </select>
              </label>
            </div>

            <label className="block text-sm font-medium">How can we help?
              <textarea required name="message" minLength={10} maxLength={3000} rows={6} placeholder="Tell us about the property, area, budget or timeline you have in mind." className="mt-2 w-full rounded-sm border border-input bg-background px-3 py-3 font-normal" />
            </label>

            {status === 'error' && <p role="alert" className="text-sm text-red-700">{error}</p>}

            <button disabled={status === 'sending'} type="submit" className="w-full rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground disabled:opacity-60">
              {status === 'sending' ? 'Sending…' : 'Send consultation request'}
            </button>
            <p className="text-xs text-muted-foreground">Your request is sent securely through the website server. We do not publish your details.</p>
          </form>
        )}
      </section>
    </DemoLayout>
  )
}
