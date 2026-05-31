export function scaleQrMargin(userMargin: number, targetSize: number) {
  return Math.round(userMargin * (targetSize / 300));
}
