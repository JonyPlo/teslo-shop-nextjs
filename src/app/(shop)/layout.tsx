import { Footer, SideBar, TopMenu } from '@/components'

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className='flex min-h-screen flex-col'>
      <TopMenu />
      <SideBar />
      <div className='mx-5 grow md:container sm:mx-10 md:mx-auto'>
        {children}
      </div>
      <Footer />
    </main>
  )
}
