'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ChatMessage } from '@/lib/types'

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false)
            }
        }
        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [isOpen])

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return

        const userMessage: ChatMessage = {
            role: 'user',
            content: input.trim(),
        }

        setMessages(prev => [...prev, userMessage])
        setInput('')
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMessage].slice(-12),
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Erreur réseau')
            }

            const data = await response.json()

            const assistantMessage: ChatMessage = {
                role: 'assistant',
                content: data.reply,
            }

            setMessages(prev => [...prev, assistantMessage])
        } catch (err: any) {
            setError(err.message || 'Une erreur est survenue')
            console.error('Chat error:', err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    return (
        <>
            {/* Floating Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-6 right-6 z-40 w-16 h-16 gold-gradient rounded-full shadow-2xl flex items-center justify-center text-charcoal-950"
                aria-label="Chat"
            >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    )}
                </svg>
            </motion.button>

            {/* Chat Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] glass rounded-3xl shadow-2xl flex flex-col border border-charcoal-700"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-charcoal-700 flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-gold-400">Concierge IA</h3>
                                <p className="text-xs text-gray-400">TimeTravel Agency</p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 rounded-full hover:bg-charcoal-700 transition-colors flex items-center justify-center"
                                aria-label="Fermer"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.length === 0 && (
                                <div className="text-center text-gray-500 mt-8">
                                    <div className="text-4xl mb-4">⏳</div>
                                    <p>Posez-moi vos questions sur les voyages temporels...</p>
                                </div>
                            )}

                            {messages.map((msg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${msg.role === 'user'
                                                ? 'gold-gradient text-charcoal-950'
                                                : 'bg-charcoal-800 text-gray-100'
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-charcoal-800 rounded-2xl px-4 py-2">
                                        <div className="flex space-x-2">
                                            <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
                                            <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse delay-75" />
                                            <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse delay-150" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="text-center text-red-400 text-sm bg-red-950/30 rounded-lg p-3">
                                    {error}
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-charcoal-700">
                            <div className="flex space-x-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Votre message..."
                                    className="flex-1 bg-charcoal-800 border border-charcoal-700 rounded-full px-4 py-2 focus:outline-none focus:border-gold-400 transition-colors"
                                    disabled={isLoading}
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={!input.trim() || isLoading}
                                    className="w-10 h-10 gold-gradient rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
                                    aria-label="Envoyer"
                                >
                                    <svg className="w-5 h-5 text-charcoal-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
