import { auth } from '@/auth.config'
import { Title } from '@/components'

export default async function ProfilePage() {
  const session = await auth()

  return (
    <>
      <Title title='Perfil' />
      <pre>{JSON.stringify(session?.user, null, 2)}</pre>

      <h3>{session?.user.role}</h3>
    </>
  )
}
