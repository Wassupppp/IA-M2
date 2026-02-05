export interface Destination {
    id: string
    title: string
    period: string
    tagline: string
    image: string
    description: string
    highlights: string[]
    bestFor: string[]
    safetyNotes: string[]
    riskLevel: 'Faible' | 'Modéré' | 'Élevé'
    toAvoid: string[]
    recommendedDuration: string
    packages: Package[]
}

export interface Package {
    name: string
    price: string
    features: string[]
}

export interface ChatMessage {
    role: 'user' | 'assistant'
    content: string
}

export interface BookingFormData {
    destination: string
    startDate: string
    endDate: string
    guestName: string
    email: string
}
