function calculateScaledSize(width, height) {
  const aspectRatio = 8000 / 4500 // Pre-calculate for readability
  const scaledSize =
    width / height > aspectRatio
      ? {
          width,
          height: (width / 8000) * 4500,
        }
      : {
          width: height * aspectRatio,
          height,
        }
  return scaledSize
}

export default calculateScaledSize
