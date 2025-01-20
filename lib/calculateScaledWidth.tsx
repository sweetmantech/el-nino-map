function calculateScaledWidth(width, height) {
  const aspectRatio = 8000 / 4500 // Pre-calculate for readability
  const scaledWidth = width / height > aspectRatio ? width : height * aspectRatio
  return scaledWidth
}

export default calculateScaledWidth
