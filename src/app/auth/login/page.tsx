import { titleFont } from '@/config/fonts'
import { LoginForm } from './ui/LoginForm'
import { Suspense } from 'react'

export default function LoginPage() {
  return (
    <div className='flex min-h-screen flex-col pt-32 sm:pt-52'>
      <h1 className={`${titleFont.className} mb-5 text-4xl`}>Login</h1>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  )
}
