export const accountMarkToStoreFormat = (mark: string) => {
  return mark
    .replace(/[ \t\r\n]/g, '')
    .split(';')
    .map((item) => ({ text: item }))
}
