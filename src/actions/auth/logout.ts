'use server'

import { signOut } from '@/auth.config'

export const logout = async () => {
  // En este 'action' llamamos al metodo 'logout()' que viene del archivo de configuracion 'auth.config.ts' para que nextauth se encargue de deslogear al usuario
  await signOut()
}
