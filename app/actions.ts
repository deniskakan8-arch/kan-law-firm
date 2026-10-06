'use server'

export type ContactState = { status: 'idle' | 'success' | 'error'; fields?: Partial<Record<'name' | 'phone' | 'message', true>> }

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const name = String(formData.get('name') ?? '').trim()
  const phone = String(formData.get('phone') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()
  const consent = formData.get('consent') === 'on'

  const fields: ContactState['fields'] = {}
  if (name.length < 2 || name.length > 80) fields.name = true
  if (!/^\+?[\d\s()-]{10,20}$/.test(phone)) fields.phone = true
  if (message.length > 2000) fields.message = true

  if (Object.keys(fields).length || !consent) return { status: 'error', fields }
  
  const text = `
Новая заявка с сайта:
Имя: ${name}
Телефон: ${phone}
Сообщение: ${message || 'Не указано'}
`
  
  try {
    const response = await fetch(`https://api.telegram.org/bot8924834874:AAG6CL0NNWCqJkrItGhdqk73nu7cGPjs5bA/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: '131755470',
        text: text,
      }),
    })
    
    if (!response.ok) {
      console.error('Telegram API error:', await response.text())
      return { status: 'error' }
    }
  } catch (error) {
    console.error('Fetch error:', error)
    return { status: 'error' }
  }

  return { status: 'success' }
}
