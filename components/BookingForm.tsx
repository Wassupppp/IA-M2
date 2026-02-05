'use client'

import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { destinations } from '@/lib/destinations'

export default function BookingForm() {
    const [formData, setFormData] = useState({
        destination: '',
        startDate: '',
        endDate: '',
        guestName: '',
        email: '',
    })
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.destination) newErrors.destination = 'Veuillez choisir une destination'
        if (!formData.startDate) newErrors.startDate = 'Date de départ requise'
        if (!formData.endDate) newErrors.endDate = 'Date de retour requise'
        if (!formData.guestName) newErrors.guestName = 'Nom requis'
        if (!formData.email) newErrors.email = 'Email requis'
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalide'

        if (formData.startDate && formData.endDate && formData.startDate >= formData.endDate) {
            newErrors.endDate = 'La date de retour doit être après la date de départ'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm()) {
            setIsSubmitted(true)
            // Reset form after 5 seconds
            setTimeout(() => {
                setIsSubmitted(false)
                setFormData({
                    destination: '',
                    startDate: '',
                    endDate: '',
                    guestName: '',
                    email: '',
                })
            }, 5000)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors[name]
                return newErrors
            })
        }
    }

    return (
        <section id="booking" ref={ref} className="py-24 px-4 bg-charcoal-900">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                        Réserver Votre <span className="text-gradient">Voyage</span>
                    </h2>
                    <p className="text-lg text-gray-300">
                        Prêt à explorer le temps ? Remplissez le formulaire ci-dessous.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="glass rounded-3xl p-8"
                >
                    {isSubmitted ? (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-center py-12"
                        >
                            <div className="text-6xl mb-4">✅</div>
                            <h3 className="text-2xl font-bold text-gold-400 mb-4">
                                Réservation Reçue !
                            </h3>
                            <p className="text-gray-300">
                                Merci {formData.guestName} ! Nous vous contacterons sous 24h à {formData.email} pour confirmer votre voyage vers {destinations.find(d => d.id === formData.destination)?.title}.
                            </p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Destination */}
                            <div>
                                <label htmlFor="destination" className="block text-sm font-semibold text-gold-400 mb-2">
                                    Destination *
                                </label>
                                <select
                                    id="destination"
                                    name="destination"
                                    value={formData.destination}
                                    onChange={handleChange}
                                    className={`w-full bg-charcoal-800 border ${errors.destination ? 'border-red-400' : 'border-charcoal-700'
                                        } rounded-lg px-4 py-3 focus:outline-none focus:border-gold-400 transition-colors`}
                                >
                                    <option value="">Choisissez une destination</option>
                                    {destinations.map(dest => (
                                        <option key={dest.id} value={dest.id}>
                                            {dest.title} - {dest.period}
                                        </option>
                                    ))}
                                </select>
                                {errors.destination && (
                                    <p className="text-red-400 text-sm mt-1">{errors.destination}</p>
                                )}
                            </div>

                            {/* Dates */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="startDate" className="block text-sm font-semibold text-gold-400 mb-2">
                                        Date de départ *
                                    </label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        className={`w-full bg-charcoal-800 border ${errors.startDate ? 'border-red-400' : 'border-charcoal-700'
                                            } rounded-lg px-4 py-3 focus:outline-none focus:border-gold-400 transition-colors`}
                                    />
                                    {errors.startDate && (
                                        <p className="text-red-400 text-sm mt-1">{errors.startDate}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="endDate" className="block text-sm font-semibold text-gold-400 mb-2">
                                        Date de retour *
                                    </label>
                                    <input
                                        type="date"
                                        id="endDate"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleChange}
                                        className={`w-full bg-charcoal-800 border ${errors.endDate ? 'border-red-400' : 'border-charcoal-700'
                                            } rounded-lg px-4 py-3 focus:outline-none focus:border-gold-400 transition-colors`}
                                    />
                                    {errors.endDate && (
                                        <p className="text-red-400 text-sm mt-1">{errors.endDate}</p>
                                    )}
                                </div>
                            </div>

                            {/* Guest Info */}
                            <div>
                                <label htmlFor="guestName" className="block text-sm font-semibold text-gold-400 mb-2">
                                    Nom complet *
                                </label>
                                <input
                                    type="text"
                                    id="guestName"
                                    name="guestName"
                                    value={formData.guestName}
                                    onChange={handleChange}
                                    placeholder="Jean Dupont"
                                    className={`w-full bg-charcoal-800 border ${errors.guestName ? 'border-red-400' : 'border-charcoal-700'
                                        } rounded-lg px-4 py-3 focus:outline-none focus:border-gold-400 transition-colors`}
                                />
                                {errors.guestName && (
                                    <p className="text-red-400 text-sm mt-1">{errors.guestName}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gold-400 mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="jean.dupont@email.com"
                                    className={`w-full bg-charcoal-800 border ${errors.email ? 'border-red-400' : 'border-charcoal-700'
                                        } rounded-lg px-4 py-3 focus:outline-none focus:border-gold-400 transition-colors`}
                                />
                                {errors.email && (
                                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full gold-gradient text-charcoal-950 font-bold px-8 py-4 rounded-full text-lg shadow-xl hover:shadow-gold-500/50 transition-all hover:scale-105"
                            >
                                Envoyer la demande
                            </button>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    )
}
