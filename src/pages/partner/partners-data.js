import { useEffect, useState } from 'react'

// Lista de Partners aprovados.
// Fonte oficial: planilha "Cadastro de Partner Ummix Ads (respostas)", aba "Site (público)",
// lida pelo endpoint /api/partners.php. Esta lista é só a reserva: aparece se o endpoint
// não responder (por exemplo, no ambiente de desenvolvimento).
export const FALLBACK_PARTNERS = [
  {
    id: 'opis-publicidade',
    name: 'OP!S Publicidade',
    type: 'Agência de Publicidade 360°',
    cities: ['Aparecida de Goiânia', 'Goiânia'],
    logo: '/assets/partners-programa/opis.svg',
    logoBg: 'dark',
    site: 'https://opisagencia.com.br/',
    instagram: 'https://www.instagram.com/opispublicidade/',
    linkedin: 'https://www.linkedin.com/company/opisagencia/',
    email: 'samuel@opispublicidade.com',
    phone: '62981458871',
  },
  {
    id: 'oqi',
    name: 'OQI',
    type: 'Agência de Publicidade 360°',
    cities: ['Anápolis', 'Aparecida de Goiânia', 'Goiânia'],
    logo: '/assets/partners-programa/oqi.png',
    logoBg: 'dark',
    site: 'https://agenciaoqi.com/',
    instagram: 'https://www.instagram.com/agenciaoqi/',
    linkedin: 'https://www.linkedin.com/company/oqi-ag%C3%AAncia-que-cria-impacto-positivo/',
    email: 'contato@agenciaoqi.com',
    phone: '62982182848',
  },
  {
    id: 'nurion',
    name: 'Nurion',
    type: 'Agência Digital',
    cities: ['São Paulo'],
    logo: '/assets/partners-programa/nurion.png',
    logoBg: 'light',
    site: 'https://nurionhubcrm.vercel.app/',
    instagram: 'https://www.instagram.com/nurionhub/',
    linkedin: 'https://www.linkedin.com/company/cris-roiz-consultoria-de-neg-cios-e-log-stica-para-sa-de/',
    email: 'cristhian@nurionhub.com.br',
    phone: '11956673626',
  },
  {
    id: 'bc-assessoria',
    name: 'BC Assessoria',
    type: 'Representante de Mídia',
    cities: ['Anápolis', 'Aparecida de Goiânia', 'Goiânia', 'Rio Verde'],
    logo: '',
    logoBg: 'dark',
    site: '',
    instagram: '',
    linkedin: '',
    email: 'bcostazenha@gmail.com',
    phone: '62992011133',
  },
  {
    id: 'displayou',
    name: 'Displayou',
    type: 'Representante de Mídia',
    cities: ['Anápolis'],
    logo: '/assets/partners-programa/displayou.png',
    logoBg: 'dark',
    site: 'https://www.displayou.com.br/',
    instagram: 'https://www.instagram.com/displayou.midia/',
    linkedin: '',
    email: 'displayoumidia@gmail.com',
    phone: '62992875761',
  },
]

// Sempre em ordem alfabética: nenhum Partner tem posição de destaque sobre outro.
export function sortPartners(list) {
  return [...list].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }))
}

function isValidPartner(item) {
  return item && typeof item.id === 'string' && typeof item.name === 'string' && item.name.trim() !== ''
}

export function usePartners() {
  const [partners, setPartners] = useState(() => sortPartners(FALLBACK_PARTNERS))

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/partners.php', { signal: controller.signal, headers: { Accept: 'application/json' } })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error(String(response.status)))))
      .then((data) => {
        const list = Array.isArray(data?.partners) ? data.partners.filter(isValidPartner) : []
        if (list.length > 0) setPartners(sortPartners(list))
      })
      .catch(() => {
        // Mantém a lista de reserva.
      })
    return () => controller.abort()
  }, [])

  return partners
}

export function partnerInitials(name) {
  const words = name.replace(/[^\p{L}\p{N}\s]/gu, ' ').trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return '?'
  if (words.length === 1 || /^[A-Z0-9]{2,4}$/.test(words[0])) return words[0].slice(0, 4).toUpperCase()
  return words.slice(0, 2).map((word) => word[0]).join('').toUpperCase()
}

export function linkLabel(kind, url) {
  if (kind === 'instagram') {
    const handle = url.replace(/\/+$/, '').split('/').pop()
    return handle ? `@${handle}` : 'Instagram'
  }
  if (kind === 'linkedin') return 'LinkedIn'
  return url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/+$/, '')
}

export function phoneDigits(phone = '') {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10 || digits.length === 11) return `55${digits}`
  return digits
}

export function formatPhone(phone = '') {
  const digits = phone.replace(/\D/g, '').replace(/^55(?=\d{10,11}$)/, '')
  if (digits.length === 11) return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  if (digits.length === 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return phone
}

export function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, 'pt-BR', { sensitivity: 'base' }))
}

export function normalizeText(value = '') {
  return value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
}
