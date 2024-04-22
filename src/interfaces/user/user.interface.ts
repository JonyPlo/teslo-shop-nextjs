export interface User {
  id: string
  name: string
  email: string
  emailVerify?: Date | null
  password: string
  role: string
  image?: string | null
}
