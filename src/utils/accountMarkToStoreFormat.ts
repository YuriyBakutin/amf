export const accountMarkToStoreFormat = (mark: string) => {
  return mark.split(';').map((item) => ({ text: item }))
}
