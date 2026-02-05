export default function Footer() {
    return (
        <footer className="bg-charcoal-950 border-t border-charcoal-800 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-serif font-bold text-gradient mb-4">
                            TimeTravel Agency
                        </h3>
                        <p className="text-gray-400">
                            Votre passerelle vers les moments les plus extraordinaires de l'histoire.
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-bold text-gold-400 mb-4">Contact</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>📧 contact@timetravel-agency.com</li>
                            <li>📞 +33 (0)1 23 45 67 89</li>
                            <li>📍 Paris, France</li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-lg font-bold text-gold-400 mb-4">Suivez-nous</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                                Facebook
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                                Instagram
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                                Twitter
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-charcoal-800 pt-8 text-center text-gray-500 text-sm">
                    <p>© 2026 TimeTravel Agency. Tous droits réservés.</p>
                    <p className="mt-2">Projet pédagogique - Voyage temporel fictif</p>
                </div>
            </div>
        </footer>
    )
}
