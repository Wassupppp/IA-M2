import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

type Msg = { role: 'user' | 'model'; parts: { text: string }[] }

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const messages = (body?.messages ?? []) as { role: 'user' | 'assistant'; content: string }[]

        if (!Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json({ error: 'Messages manquants' }, { status: 400 })
        }

        const apiKey = process.env.GEMINI_API_KEY
        if (!apiKey) {
            return NextResponse.json(
                { error: 'Clé API Gemini non configurée' },
                { status: 500 }
            )
        }

        const genAI = new GoogleGenerativeAI(apiKey)
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

        // System instructions
        const systemInstruction = `Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.

Ton ton: professionnel, chaleureux, passionné d'histoire, enthousiaste sans être trop familier.

Tu connais parfaitement nos 3 destinations:

1. **Paris 1889 (Belle Époque)**
   - Inauguration de la Tour Eiffel et Exposition Universelle
   - Ambiance romantique, art impressionniste, Moulin Rouge
   - Forfaits: Découverte 12 500€, Prestige 28 900€, Impérial 59 000€
   - Risque: Faible - Idéal pour couples romantiques et amateurs d'art

2. **Crétacé -65M (Mésozoïque)**
   - Observation de dinosaures (T-Rex, Tricératops, Ptéranodons)
   - Safari préhistorique dans la nature sauvage
   - Forfaits: Découverte 45 000€, Prestige 89 000€, Impérial 199 000€
   - Risque: Élevé - Pour aventuriers expérimentés et passionnés de paléontologie

3. **Florence 1504 (Renaissance)**
   - Rencontre avec Michel-Ange et Léonard de Vinci
   - Art de la Renaissance, culture Médicis
   - Forfaits: Découverte 18 500€, Prestige 42 000€, Impérial 95 000€
   - Risque: Modéré - Pour amateurs d'art et d'histoire

Tu dois:
- Répondre brièvement et clairement (2-3 phrases maximum)
- Recommander une destination selon les goûts du client
- Fournir des informations précises sur les prix et les forfaits
- Rassurer sur la sécurité
- Poser 1 question de suivi pour affiner la recommandation
- Encourager la réservation quand approprié

Reste concis et professionnel.`

        // Convert messages to Gemini format
        const history: Msg[] = messages.slice(0, -1).map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }],
        }))

        const lastMessage = messages[messages.length - 1].content

        // Start chat with history
        const chat = model.startChat({
            history,
            generationConfig: {
                maxOutputTokens: 350,
                temperature: 0.7,
            },
            systemInstruction,
        })

        const result = await chat.sendMessage(lastMessage)
        const response = await result.response
        const reply = response.text().trim() || "Désolé, je n'ai pas pu répondre."

        return NextResponse.json({ reply })
    } catch (e: any) {
        console.error('Gemini API error:', e)
        return NextResponse.json(
            {
                error: 'Erreur serveur',
                details: String(e?.message || e)
            },
            { status: 500 }
        )
    }
}
