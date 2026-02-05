import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'TimeTravel Agency - Voyages Temporels de Luxe',
    description: 'Explorez le passé avec élégance. Agence de voyages temporels premium offrant des expériences uniques à travers l\'histoire.',
    keywords: 'voyage temporel, luxe, histoire, destinations premium',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
            <body>{children}</body>
        </html>
    )
}
