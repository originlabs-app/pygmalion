/**
 * Layout pour Dashboard Étudiant
 * 
 * Niveau hiérarchique : STUDENT (apprenant)
 * Utilisé pour les apprenants individuels
 * Focus sur l'apprentissage et la progression
 */
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  LayoutDashboard,
  BookOpen,
  Search,
  Award,
  TrendingUp,
  User,
  Settings,
  Bell,
  ChevronDown,
  Menu,
  X,
  Plane,
  Clock,
  Star,
  Target,
  Trophy,
  FileText,
  Download,
  PlayCircle
} from 'lucide-react';

interface StudentLayoutProps {
  children: React.ReactNode;
}

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: number;
  subItems?: NavigationItem[];
}

const StudentLayout: React.FC<StudentLayoutProps> = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Configuration navigation étudiante
  const navigationItems: NavigationItem[] = [
    {
      id: 'dashboard',
      label: 'Tableau de Bord',
      icon: LayoutDashboard,
      href: '/student-dashboard'
    },
    {
      id: 'formations',
      label: 'Mes Formations',
      icon: BookOpen,
      href: '/student/formations',
      badge: 3,
      subItems: [
        { id: 'formations-active', label: 'En Cours', icon: PlayCircle, href: '/student/formations/active', badge: 2 },
        { id: 'formations-upcoming', label: 'À Venir', icon: Clock, href: '/student/formations/upcoming', badge: 1 },
        { id: 'formations-completed', label: 'Terminées', icon: Award, href: '/student/formations/completed' }
      ]
    },
    {
      id: 'marketplace',
      label: 'Découvrir',
      icon: Search,
      href: '/courses'
    },
    {
      id: 'certificates',
      label: 'Mes Certificats',
      icon: Award,
      href: '/student/certificates'
    },
    {
      id: 'progress',
      label: 'Ma Progression',
      icon: TrendingUp,
      href: '/student/progress'
    },
    {
      id: 'profile',
      label: 'Mon Profil',
      icon: User,
      href: '/student/profile'
    }
  ];

  // Fonction pour déterminer quel dropdown devrait être ouvert basé sur l'URL actuelle
  const getActiveDropdownFromPath = (pathname: string): string | null => {
    if (pathname.startsWith('/student/formations')) return 'formations';
    return null;
  };

  // Maintenir le dropdown ouvert basé sur la page actuelle
  useEffect(() => {
    const shouldBeOpen = getActiveDropdownFromPath(location.pathname);
    if (shouldBeOpen && activeDropdown !== shouldBeOpen) {
      setActiveDropdown(shouldBeOpen);
    }
  }, [location.pathname]);

  const isActivePath = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const toggleDropdown = (itemId: string) => {
    setActiveDropdown(activeDropdown === itemId ? null : itemId);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-white border-r border-gray-200 shadow-lg flex flex-col`}>
        
        {/* Header Sidebar */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center gap-2">
                <div className="bg-blue-600 rounded-lg p-1.5 hover:bg-blue-700 transition-colors">
                  <Plane className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">
                  PYG<span className="text-blue-600">MALION</span>
                </span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2"
            >
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => (
            <div key={item.id}>
              <div
                className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                  isActivePath(item.href)
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => {
                  if (item.subItems) {
                    toggleDropdown(item.id);
                  } else {
                    navigate(item.href);
                  }
                }}
              >
                <div className="flex items-center gap-3 flex-1">
                  <item.icon className={`h-5 w-5 ${isActivePath(item.href) ? 'text-blue-600' : 'text-gray-500'}`} />
                  {sidebarOpen && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </div>
                
                {sidebarOpen && (
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <Badge variant="destructive" className="h-5 min-w-5 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    {item.subItems && (
                      <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === item.id ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                )}
              </div>

              {/* Sub-items */}
              {item.subItems && sidebarOpen && activeDropdown === item.id && (
                <div className="ml-6 mt-2 space-y-1">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.id}
                      to={subItem.href}
                      className={`flex items-center gap-3 p-2 rounded-lg text-sm transition-colors ${
                        isActivePath(subItem.href)
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <subItem.icon className="h-4 w-4" />
                      <span>{subItem.label}</span>
                      {subItem.badge && (
                        <Badge variant="destructive" className="h-4 min-w-4 text-xs ml-auto">
                          {subItem.badge}
                        </Badge>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          {sidebarOpen ? (
            <div className="space-y-3">
              {/* User Info */}
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                    {currentUser?.firstName?.[0]}{currentUser?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {currentUser?.firstName} {currentUser?.lastName}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    Apprenant
                  </div>
                </div>
              </div>

              {/* Progression Globale */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-gray-900">Progression</div>
                  <div className="text-sm font-bold text-blue-600">78%</div>
                </div>
                <Progress value={78} className="h-2 mb-2" />
                <div className="text-xs text-gray-600">3 formations sur 4 complétées</div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3">
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div>
                    <div className="text-lg font-bold text-green-600">5</div>
                    <div className="text-xs text-gray-600">Certificats</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600">24h</div>
                    <div className="text-xs text-gray-600">Ce mois</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                  <Link to="/student/profile">
                    <Settings className="h-4 w-4 mr-2" />
                    Mon Profil
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  Déconnexion
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-100 text-blue-600 text-xs font-semibold">
                  {currentUser?.firstName?.[0]}{currentUser?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="p-1">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              
              {/* Breadcrumb & Page Title */}
              <div className="flex items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Mon Espace Formation
                  </h1>
                  <p className="text-sm text-gray-600">
                    Bienvenue {currentUser?.firstName} ! Continuez votre parcours d'apprentissage.
                  </p>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="hidden md:flex" asChild>
                  <Link to="/student/certificates">
                    <Download className="h-4 w-4 mr-2" />
                    Certificats
                  </Link>
                </Button>
                
                <Button size="sm" asChild>
                  <Link to="/courses">
                    <Search className="h-4 w-4 mr-2" />
                    Découvrir
                  </Link>
                </Button>

                {/* Notifications */}
                <Button variant="ghost" size="sm" className="p-2">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default StudentLayout; 