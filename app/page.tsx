import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Destinations from '@/components/Destinations'
import BookingForm from '@/components/BookingForm'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'

export default function Home() {
    return (
        <main className="min-h-screen">
            <Header />
            <Hero />
            <About />
            <Destinations />
            <BookingForm />
            <Footer />
            <ChatWidget />
        </main>
    )
}
