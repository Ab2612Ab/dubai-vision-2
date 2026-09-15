import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const consultationSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(7).max(40),
  intent: z.enum(['buy', 'rent', 'sell', 'invest']),
  message: z.string().trim().min(10).max(3000),
  context: z.string().trim().max(300).optional().default(''),
  website: z.string().max(0).optional().default(''),
})

function json(data: unknown, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      'Cache-Control': 'no-store',
    },
  })
}

export const Route = createFileRoute('/api/consultation')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const origin = request.headers.get('origin')
          if (origin && origin !== new URL(request.url).origin) {
            return json({ error: 'Invalid request origin.' }, 403)
          }

          const body = await request.json()
          const parsed = consultationSchema.safeParse(body)
          if (!parsed.success) {
            return json({ error: 'Please check the form fields and try again.' }, 400)
          }

          // Honeypot: silently accept bots without sending mail.
          if (parsed.data.website) return json({ ok: true })

          const apiKey = process.env.RESEND_API_KEY
          const to = process.env.CONTACT_TO_EMAIL
          const from = process.env.CONTACT_FROM_EMAIL

          if (!apiKey || !to || !from) {
            console.error('Consultation email configuration is incomplete.')
            return json({ error: 'The consultation service is temporarily unavailable.' }, 503)
          }

          const { name, email, phone, intent, message, context } = parsed.data
          const safeContext = context || 'No property or area context provided.'
          const emailText = [
            'New TheRealtorDubai consultation request',
            '',
            `Name: ${name}`,
            `Email: ${email}`,
            `Phone: ${phone}`,
            `Intent: ${intent}`,
            `Context: ${safeContext}`,
            '',
            'Message:',
            message,
          ].join('\\n')

          const resend = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from,
              to: [to],
              reply_to: email,
              subject: `New ${intent} consultation request — ${name}`,
              text: emailText,
            }),
          })

          if (!resend.ok) {
            const errorText = await resend.text()
            console.error('Resend rejected consultation email:', errorText)
            return json({ error: 'We could not send your request. Please try again.' }, 502)
          }

          return json({ ok: true, message: 'Your consultation request has been sent.' })
        } catch (error) {
          console.error('Consultation submission failed:', error)
          return json({ error: 'We could not process your request. Please try again.' }, 500)
        }
      },
    },
  },
})
