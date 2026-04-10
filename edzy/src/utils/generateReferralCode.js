export function generateReferralCode(name) {
  const cleaned = name.replace(/\s+/g, '').toUpperCase().slice(0, 5)
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `${cleaned}${rand}`
}