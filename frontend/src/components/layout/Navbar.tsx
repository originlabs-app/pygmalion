import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, ChevronDown, Menu, X, Plane } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getDashboardRoute } from '@/utils/navigation';

const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getDashboardLink = () => {
    return currentUser ? getDashboardRoute(currentUser.role) : '/';
  };

  const getProfileLink = () => {
    if (!currentUser) return '/profile';
    return (currentUser.role === 'manager' || currentUser.role === 'airport_manager') 
      ? '/manager/settings' 
      : '/profile';
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      navigate('/');
    }
  };

  const navigationLinks = [
    { href: '/courses', label: 'Formations' },
    { href: '/for-learners', label: 'Pour les Apprenants' },
    { href: '/for-companies', label: 'Pour les Entreprises' },
    { href: '/for-airports', label: 'Pour les Aéroports' },
    { href: '/for-training-organizations', label: 'Organismes de Formation' },
    ...(currentUser ? [{ href: getDashboardLink(), label: 'Tableau de Bord' }] : []),
    ...(currentUser?.role === 'training_org' ? [{ href: '/create-course', label: 'Créer Formation' }] : []),
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-[1800px] mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-blue-600 rounded-xl p-2 group-hover:bg-blue-700 transition-colors">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              PYG<span className="text-blue-600">MALION</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
          </div>



          {/* Auth Buttons / User Menu */}
          <div className="flex items-center gap-4">
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="gap-3 px-4 py-2 h-12 bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium", 
                        currentUser.role === 'admin' ? "bg-red-500" :
                        currentUser.role === 'training_org' ? "bg-green-500" :
                        currentUser.role === 'manager' ? "bg-blue-500" :
                        currentUser.role === 'airport_manager' ? "bg-purple-500" : 
                        "bg-gray-500"
                      )}>
                        {currentUser.firstName?.charAt(0)}{currentUser.lastName?.charAt(0)}
                      </div>
                      <div className="hidden sm:block text-left">
                        <p className="text-sm font-medium text-gray-900 truncate max-w-[120px]">
                          {currentUser.firstName} {currentUser.lastName}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">
                          {currentUser.role.replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-2 bg-white border border-gray-200 shadow-xl rounded-xl">
                  <div className="px-3 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{currentUser.firstName} {currentUser.lastName}</p>
                    <p className="text-xs text-gray-500">{currentUser.email}</p>
                    <p className="text-xs text-blue-600 capitalize font-medium mt-1">
                      {currentUser.role.replace('_', ' ')}
                    </p>
                  </div>
                  <div className="py-2">
                    <DropdownMenuItem asChild>
                      <Link to={getDashboardLink()} className="w-full px-3 py-2 text-sm hover:bg-blue-50 rounded-lg transition-colors">
                        📊 Tableau de Bord
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={getProfileLink()} className="w-full px-3 py-2 text-sm hover:bg-blue-50 rounded-lg transition-colors">
                        👤 Mon Profil
                      </Link>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator className="my-2" />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  >
                    🚪 Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    className="px-6 py-3 h-12 bg-transparent border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-xl transition-all duration-200"
                  >
                    Connexion
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    className="px-6 py-3 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    S'inscrire
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden p-2 h-10 w-10 bg-gray-50 border-gray-200 hover:bg-gray-100 rounded-xl"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4">
            <div className="space-y-4">


              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
