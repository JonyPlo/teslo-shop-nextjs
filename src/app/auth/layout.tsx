export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className='flex justify-center'>
      <div className='w-full px-10 sm:w-[350px]'>{children}</div>
    </main>
  )
}
