import type { typeList } from '@/data/typeList'

export interface IAccount {
  mark: { text: string }[]
  type: (typeof typeList)[number]
  login: string
  password: string
}
