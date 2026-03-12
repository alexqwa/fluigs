const UPPER_WORDS = ['kg', 'un', 'cx', 'pct', 'vd', 'bdj', '1kg']

export function formatProductName(name: string) {
  const words = name.toLowerCase().replace(/\s+/g, ' ').trim().split(' ')

  return words
    .map((word, index) => {
      const isLast = index === words.length - 1

      if (UPPER_WORDS.includes(word) || (isLast && word.length === 2)) {
        return word.toUpperCase()
      }

      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}
