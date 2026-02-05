'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function About() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    const features = [
        {
            icon: '✨',
            title: 'Luxe Intemporel',
            description: 'Des voyages premium conçus pour une clientèle exigeante'
        },
        {
            icon: '🛡️',
            title: 'Sécurité Maximale',
            description: 'Protocoles de sécurité temporelle certifiés et équipes expertes'
        },
        {
            icon: '🎓',
            title: 'Experts Historiens',
            description: 'Guides passionnés et érudits pour une immersion totale'
        },
    ]

    return (
        <section id="about" ref={ref} className="py-24 px-4 bg-charcoal-900">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                        À Propos de <span className="text-gradient">l'Agence</span>
                    </h2>
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto text-balance">
                        TimeTravel Agency est la première agence de voyages temporels de luxe au monde.
                        Depuis notre fondation, nous avons permis à des milliers de clients privilégiés
                        de vivre des expériences uniques à travers les époques, dans un confort et une
                        sécurité absolus.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="glass rounded-2xl p-8 hover:border-gold-400/50 transition-all duration-300"
                        >
                            <div className="text-5xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-2 text-gold-400">{feature.title}</h3>
                            <p className="text-gray-400">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
