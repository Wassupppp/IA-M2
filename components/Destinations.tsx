'use client'

import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { destinations } from '@/lib/destinations'
import DestinationModal from './DestinationModal'
import type { Destination } from '@/lib/types'

export default function Destinations() {
    const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    return (
        <section id="destinations" ref={ref} className="py-24 px-4 bg-charcoal-950">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                        Nos <span className="text-gradient">Destinations</span>
                    </h2>
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                        Trois époques extraordinaires vous attendent. Choisissez votre voyage dans le temps.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {destinations.map((destination, index) => (
                        <motion.div
                            key={destination.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="group relative overflow-hidden rounded-2xl cursor-pointer"
                            onClick={() => setSelectedDestination(destination)}
                            whileHover={{ y: -10 }}
                        >
                            {/* Image Background */}
                            <div className="aspect-[4/5] bg-gradient-to-br from-charcoal-700 via-charcoal-800 to-charcoal-900 relative overflow-hidden">
                                {/* Destination Image */}
                                <Image
                                    src={destination.image}
                                    alt={destination.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/50 to-transparent z-10" />

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                                    <div className="text-gold-400 text-sm font-semibold mb-2">
                                        {destination.period}
                                    </div>
                                    <h3 className="text-2xl font-serif font-bold mb-2">
                                        {destination.title}
                                    </h3>
                                    <p className="text-gray-300 text-sm mb-4">
                                        {destination.tagline}
                                    </p>

                                    <div className="flex items-center text-gold-400 group-hover:translate-x-2 transition-transform">
                                        <span className="text-sm font-semibold">Découvrir</span>
                                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Hover Effect */}
                                <div className="absolute inset-0 border-2 border-gold-400/0 group-hover:border-gold-400/50 transition-all duration-300 rounded-2xl" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedDestination && (
                <DestinationModal
                    destination={selectedDestination}
                    onClose={() => setSelectedDestination(null)}
                />
            )}
        </section>
    )
}
