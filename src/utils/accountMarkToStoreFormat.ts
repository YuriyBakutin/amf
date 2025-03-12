export const accountMarkToStoreFormat = (mark: string) => {
  return mark
    .replace(/[ \t]/g, '')
    .split(';')
    .map((item) => ({ text: item }))
}
