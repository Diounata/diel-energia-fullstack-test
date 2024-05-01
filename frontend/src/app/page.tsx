import { Calendar } from '@/components/calendar'

export default function Home() {
  return (
    <main className="flex items-center justify-center">
      <div className="w-full h-full p-10">
        <Calendar />
      </div>
    </main>
  )
}
