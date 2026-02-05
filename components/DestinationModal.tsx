'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import type { Destination } from '@/lib/types'

interface DestinationModalProps {
    destination: Destination
    onClose: () => void
}

export default function DestinationModal({ destination, onClose }: DestinationModalProps) {
    useEffect(() => {
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [onClose])

    const scrollToBooking = () => {
        onClose()
        setTimeout(() => {
            const element = document.getElementById('booking')
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        }, 300)
    }

    const getRiskColor = (level: string) => {
        switch (level) {
            case 'Faible': return 'text-green-400'
            case 'Modéré': return 'text-yellow-400'
            case 'Élevé': return 'text-red-400'
            default: return 'text-gray-400'
        }
    }

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                />

                {/* Modal Content */}
                <div className="relative min-h-screen flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative bg-charcoal-900 rounded-3xl max-w-4xl w-full shadow-2xl border border-charcoal-700"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass hover:bg-gold-400/20 transition-colors flex items-center justify-center"
                            aria-label="Fermer"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Header with Image */}
                        <div className="relative h-64 rounded-t-3xl overflow-hidden bg-gradient-to-br from-charcoal-700 via-charcoal-800 to-charcoal-900">
                            <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-30">
                                {destination.id === 'paris-1889' && '🗼'}
                                {destination.id === 'cretaceous' && '🦖'}
                                {destination.id === 'florence-1504' && '🎨'}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 to-transparent" />
                            <div className="absolute bottom-6 left-6">
                                <div className="text-gold-400 text-sm font-semibold mb-2">{destination.period}</div>
                                <h2 className="text-4xl font-serif font-bold">{destination.title}</h2>
                                <p className="text-gray-300 mt-2">{destination.tagline}</p>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 max-h-[60vh] overflow-y-auto">
                            {/* Description */}
                            <p className="text-gray-300 leading-relaxed mb-8">
                                {destination.description}
                            </p>

                            {/* Highlights */}
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-gold-400 mb-4">Incontournables</h3>
                                <ul className="grid sm:grid-cols-2 gap-3">
                                    {destination.highlights.map((highlight, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="text-gold-400 mr-2">✦</span>
                                            <span className="text-gray-300">{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Best For */}
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-gold-400 mb-4">Conseillé pour</h3>
                                <div className="flex flex-wrap gap-2">
                                    {destination.bestFor.map((item, index) => (
                                        <span key={index} className="glass px-4 py-2 rounded-full text-sm text-gray-300">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Safety */}
                            <div className="grid sm:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <h3 className="text-xl font-bold text-gold-400 mb-4">Sécurité</h3>
                                    <div className="mb-3">
                                        <span className="text-gray-400">Niveau de risque: </span>
                                        <span className={`font-bold ${getRiskColor(destination.riskLevel)}`}>
                                            {destination.riskLevel}
                                        </span>
                                    </div>
                                    <ul className="space-y-2">
                                        {destination.safetyNotes.map((note, index) => (
                                            <li key={index} className="flex items-start text-sm text-gray-400">
                                                <span className="text-green-400 mr-2">✓</span>
                                                {note}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-gold-400 mb-4">À éviter</h3>
                                    <ul className="space-y-2">
                                        {destination.toAvoid.map((item, index) => (
                                            <li key={index} className="flex items-start text-sm text-gray-400">
                                                <span className="text-red-400 mr-2">✗</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Duration */}
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-gold-400 mb-2">Durée recommandée</h3>
                                <p className="text-gray-300">{destination.recommendedDuration}</p>
                            </div>

                            {/* Packages */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-gold-400 mb-6">Nos Forfaits</h3>
                                <div className="grid sm:grid-cols-3 gap-4">
                                    {destination.packages.map((pkg, index) => (
                                        <div
                                            key={index}
                                            className={`glass rounded-2xl p-6 ${index === 1 ? 'ring-2 ring-gold-400' : ''
                                                }`}
                                        >
                                            {index === 1 && (
                                                <div className="text-gold-400 text-xs font-bold mb-2">POPULAIRE</div>
                                            )}
                                            <h4 className="text-lg font-bold mb-2">{pkg.name}</h4>
                                            <div className="text-2xl font-bold text-gold-400 mb-4">{pkg.price}</div>
                                            <ul className="space-y-2">
                                                {pkg.features.map((feature, fIndex) => (
                                                    <li key={fIndex} className="text-sm text-gray-400 flex items-start">
                                                        <span className="text-gold-400 mr-2 flex-shrink-0">•</span>
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="text-center">
                                <button
                                    onClick={scrollToBooking}
                                    className="gold-gradient text-charcoal-950 font-bold px-8 py-4 rounded-full text-lg shadow-xl hover:shadow-gold-500/50 transition-all hover:scale-105"
                                >
                                    Réserver cette destination
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </AnimatePresence>
    )
}
