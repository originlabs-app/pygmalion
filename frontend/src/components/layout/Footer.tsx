import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
        <div className="max-w-[1800px] mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {/* Branding Section */}
          <div className="lg:col-span-1 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="bg-blue-600 rounded-xl p-2 group-hover:bg-blue-700 transition-colors">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">
                PYG<span className="text-blue-400">MALION</span>
              </span>
            </Link>
            <p className="text-gray-300 leading-relaxed max-w-sm">
              La plateforme de référence pour la formation aéronautique. 
              Excellence, conformité et innovation au service des professionnels.
            </p>
            <div className="flex gap-4">
              <Link to="#" className="text-gray-400 hover:text-blue-400 transition-colors p-2 hover:bg-gray-800 rounded-lg">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-blue-400 transition-colors p-2 hover:bg-gray-800 rounded-lg">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-blue-400 transition-colors p-2 hover:bg-gray-800 rounded-lg">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-blue-400 transition-colors p-2 hover:bg-gray-800 rounded-lg">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          
          {/* Platform Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Plateforme</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/courses" className="text-gray-300 hover:text-white transition-colors">
                  Formations
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/certificates" className="text-gray-300 hover:text-white transition-colors">
                  Certificats
                </Link>
              </li>
            </ul>
          </div>
          
          {/* For Organizations */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Organisations</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/become-partner" className="text-gray-300 hover:text-white transition-colors">
                  Devenir Partenaire
                </Link>
              </li>
              <li>
                <Link to="/enterprise" className="text-gray-300 hover:text-white transition-colors">
                  Solutions Entreprise
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                  Tableau de Bord
                </Link>
              </li>
              <li>
                <Link to="/compliance" className="text-gray-300 hover:text-white transition-colors">
                  Conformité
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal & Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Légal & Support</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-300 hover:text-white transition-colors">
                  Centre d'aide
                </Link>
              </li>
              <li>
                <Link to="/security" className="text-gray-300 hover:text-white transition-colors">
                  Sécurité
                </Link>
              </li>
              <li>
                <Link to="/style-design" className="text-gray-300 hover:text-white transition-colors">
                  Style & Design
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex flex-col lg:flex-row items-center gap-6 text-sm text-gray-400">
              <p>© {new Date().getFullYear()} PYGMALION. Tous droits réservés.</p>
              <div className="flex items-center gap-4">
                <span>🇫🇷 Français</span>
                <span>|</span>
                <span>Conforme RGPD</span>
                <span>|</span>
                <span>Certifié Qualiopi</span>
              </div>
            </div>
            
            <div className="text-sm text-gray-400">
              <span>Plateforme sécurisée • Support 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
