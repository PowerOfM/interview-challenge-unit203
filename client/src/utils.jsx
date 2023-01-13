export function formatPrice(value) {
  if (value === 0) return 'Free'
  return '$' + value.toFixed(2)
}