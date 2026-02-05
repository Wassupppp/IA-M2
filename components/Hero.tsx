'use client'

import { motion } from 'framer-motion'

export default function Hero() {
    const scrollToDestinations = () => {
        const element = document.getElementById('destinations')
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/80 via-charcoal-950/50 to-charcoal-950 z-10" />
                {/* Placeholder for video */}
                <div className="w-full h-full bg-gradient-to-br from-charcoal-800 via-charcoal-900 to-black">
                    {/* You can add a video element here: */}
                    {/* <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src="/hero.mp4" type="video/mp4" />
          </video> */}
                </div>
            </div>

            {/* Content */}
            <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 text-balance">
                        Voyagez à Travers{' '}
                        <span className="text-gradient">le Temps</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto text-balance">
                        Une agence de voyage temporel de luxe vous invite à explorer les moments les plus fascinants de l'histoire avec élégance et sécurité.
                    </p>

                    <motion.button
                        onClick={scrollToDestinations}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="gold-gradient text-charcoal-950 font-bold px-8 py-4 rounded-full text-lg shadow-2xl hover:shadow-gold-500/50 transition-shadow"
                    >
                        Explorer les Destinations
                    </motion.button>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <div className="w-6 h-10 border-2 border-gold-400 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-gold-400 rounded-full mt-2 animate-pulse" />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
