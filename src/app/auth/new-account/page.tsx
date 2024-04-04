import { titleFont } from '@/config/fonts'
import { RegisterForm } from './ui/RegisterForm'

export default function RegisterPage() {
  return (
    <div className='flex min-h-screen flex-col justify-center'>
      <h1 className={`${titleFont.className} mb-5 text-4xl`}>Register</h1>
      <RegisterForm />
    </div>
  )
}
