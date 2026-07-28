import { CONTACT_FORM_ENDPOINT } from '../constants/urls'

function isRejectedSubmission(result) {
  const success = result?.success
  const message = String(result?.message ?? '')

  return success === false
    || success === 'false'
    || /activat/i.test(message)
    || /unable to submit/i.test(message)
}

export async function submitForm(payload) {
  const response = await fetch(CONTACT_FORM_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      ...payload,
      _url: window.location.href,
    }),
  })

  let result = null

  try {
    result = await response.json()
  } catch {
    if (response.ok) {
      throw new Error('O serviço de formulários retornou uma resposta inválida.')
    }
  }

  if (!response.ok || isRejectedSubmission(result)) {
    throw new Error(result?.message || 'Não foi possível confirmar o envio do formulário.')
  }

  return result
}
