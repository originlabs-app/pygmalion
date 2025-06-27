/**
 * Layout pour Dashboard Entreprise Manager
 * 
 * Niveau hiérarchique : MANAGER (équipe/service)
 * Utilisé pour les managers d'équipe dans les entreprises
 * Différent du layout Superviseur (niveau entreprise/direction)
 */
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  AlertTriangle,
  DollarSign,
  BarChart3,
  Settings,
  Building,
  Bell,
  Search,
  ChevronDown,
  Menu,
  X,
  Briefcase,
  BookOpen,
  Shield,
  TrendingUp,
  Calendar,
  FileText,
  MessageSquare,
  CreditCard,
  Target,
  Plane,
  Clock
} from 'lucide-react';

interface ManagerLayoutProps {
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

const ManagerLayout: React.FC<ManagerLayoutProps> = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Configuration navigation selon le rôle
  const getNavigationItems = (): NavigationItem[] => {
    const baseItems: NavigationItem[] = [
      {
        id: 'dashboard',
        label: 'Vue d\'ensemble',
        icon: LayoutDashboard,
        href: '/manager-dashboard'
      },
      {
        id: 'team',
        label: 'Mon Équipe',
        icon: Users,
        href: '/manager/team',
        badge: 3,
        subItems: [
          { id: 'team-list', label: 'Liste Équipe', icon: Users, href: '/manager/team' },
          { id: 'team-add', label: 'Ajouter Membre', icon: Users, href: '/manager/team/add' },
          { id: 'team-import', label: 'Import Excel', icon: FileText, href: '/manager/team/import' }
        ]
      },
      {
        id: 'training',
        label: 'Formations',
        icon: GraduationCap,
        href: '/manager/training',
        subItems: [
          { id: 'training-marketplace', label: 'Marketplace', icon: BookOpen, href: '/manager/training' },
          { id: 'training-assign', label: 'Assigner Formation', icon: Target, href: '/manager/assign-training' },
          { id: 'training-requests', label: 'Demandes en Attente', icon: Clock, href: '/manager/pending-requests', badge: 5 },
          { id: 'training-progress', label: 'Suivi Progression', icon: TrendingUp, href: '/manager/training/progress' }
        ]
      },
      {
        id: 'compliance',
        label: 'Conformité',
        icon: Shield,
        href: '/manager/compliance',
        badge: 7,
        subItems: [
          { id: 'compliance-dashboard', label: 'Tableau de Bord', icon: BarChart3, href: '/manager/compliance' },
          { id: 'compliance-alerts', label: 'Alertes', icon: AlertTriangle, href: '/manager/compliance/alerts', badge: 7 },
          { id: 'compliance-calendar', label: 'Échéancier', icon: Calendar, href: '/manager/compliance/calendar' },
          { id: 'compliance-certificates', label: 'Certifications', icon: Shield, href: '/manager/compliance/certificates' }
        ]
      },
      {
        id: 'budget',
        label: 'Budget',
        icon: DollarSign,
        href: '/manager/budget',
        subItems: [
          { id: 'budget-overview', label: 'Vue d\'ensemble', icon: BarChart3, href: '/manager/budget' },
          { id: 'budget-allocation', label: 'Allocation', icon: CreditCard, href: '/manager/budget/allocation' },
          { id: 'budget-reports', label: 'Rapports Financiers', icon: FileText, href: '/manager/budget/reports' }
        ]
      },
      {
        id: 'reports',
        label: 'Rapports',
        icon: BarChart3,
        href: '/manager/reports',
        subItems: [
          { id: 'reports-analytics', label: 'Analytics', icon: TrendingUp, href: '/manager/reports' },
          { id: 'reports-compliance', label: 'Rapport Conformité', icon: Shield, href: '/manager/reports/compliance' },
          { id: 'reports-training', label: 'Bilan Formation', icon: GraduationCap, href: '/manager/reports/training' },
          { id: 'reports-budget', label: 'Analyse ROI', icon: DollarSign, href: '/manager/reports/budget' }
        ]
      },
      {
        id: 'resources',
        label: 'Ressources',
        icon: BookOpen,
        href: '/manager/resources',
        subItems: [
          { id: 'resources-library', label: 'Bibliothèque', icon: BookOpen, href: '/manager/resources' },
          { id: 'resources-templates', label: 'Templates', icon: FileText, href: '/manager/resources/templates' },
          { id: 'resources-communication', label: 'Communication', icon: MessageSquare, href: '/manager/resources/communication' }
        ]
      },
      {
        id: 'settings',
        label: 'Paramètres',
        icon: Settings,
        href: '/manager/settings',
        subItems: [
          { id: 'settings-profile', label: 'Profil Entreprise', icon: Building, href: '/manager/settings' },
          { id: 'settings-team', label: 'Configuration Équipe', icon: Users, href: '/manager/settings/team' },
          { id: 'settings-notifications', label: 'Notifications', icon: Bell, href: '/manager/settings/notifications' },
          { id: 'settings-integrations', label: 'Intégrations', icon: Settings, href: '/manager/settings/integrations' }
        ]
      }
    ];

    // Ajout spécifique pour Airport Manager
    if (currentUser?.role === 'airport_manager') {
      return [
        {
          id: 'airport-dashboard',
          label: 'Vue d\'ensemble Site',
          icon: Plane,
          href: '/airport-manager-dashboard'
        },
        {
          id: 'airport-companies',
          label: 'Entreprises Présentes',
          icon: Building,
          href: '/airport-manager/companies',
          subItems: [
            { id: 'companies-list', label: 'Liste Entreprises', icon: Building, href: '/airport-manager/companies' },
            { id: 'companies-compliance', label: 'Conformité par Entreprise', icon: Shield, href: '/airport-manager/companies/compliance' }
          ]
        },
        ...baseItems.slice(2) // Garde formations, conformité, etc.
      ];
    }

    return baseItems;
  };

  const navigationItems = getNavigationItems();

  // Fonction pour déterminer quel dropdown devrait être ouvert basé sur l'URL actuelle
  const getActiveDropdownFromPath = (pathname: string): string | null => {
    if (pathname.startsWith('/manager/team')) return 'team';
    if (pathname.startsWith('/manager/training') || pathname.startsWith('/manager/pending-requests') || pathname.startsWith('/manager/assign-training')) return 'training';
    if (pathname.startsWith('/manager/compliance')) return 'compliance';
    if (pathname.startsWith('/manager/budget')) return 'budget';
    if (pathname.startsWith('/manager/reports')) return 'reports';
    if (pathname.startsWith('/manager/resources')) return 'resources';
    if (pathname.startsWith('/manager/settings')) return 'settings';
    if (pathname.startsWith('/airport-manager/companies')) return 'airport-companies';
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
                      to={subItem.id === 'training-marketplace' ? '/courses' : subItem.href}
                      {...(subItem.id === 'training-marketplace' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
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
                     {currentUser?.role === 'manager' ? 'Manager d\'Équipe Entreprise' : 
                      currentUser?.role === 'airport_manager' ? 'Manager Aéroport' : 
                      'Superviseur Entreprise'}
                   </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3">
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div>
                    <div className="text-lg font-bold text-blue-600">12</div>
                    <div className="text-xs text-gray-600">Équipe</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">94%</div>
                    <div className="text-xs text-gray-600">Conformité</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                  <Link to="/manager/settings">
                    <Settings className="h-4 w-4 mr-2" />
                    Mon Profil Personnel
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
                    {currentUser?.role === 'airport_manager' ? 'Dashboard Aéroport Manager' : 'Dashboard Entreprise Manager'}
                  </h1>
                  <p className="text-sm text-gray-600">
                    Bienvenue {currentUser?.firstName} ! Gérez votre équipe et suivez la conformité en temps réel.
                  </p>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-3">
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="search"
                    placeholder="Rechercher..."
                    className="pl-10 pr-4 py-2 bg-gray-50 border-0 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 outline-none w-64"
                  />
                </div>

                {/* Notifications */}
                <Button variant="outline" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center">
                    7
                  </Badge>
                </Button>

                {/* Quick Action */}
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700" asChild>
                  <Link to="/manager/assign-training">
                    <Target className="h-4 w-4 mr-2" />
                    Assigner Formation
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ManagerLayout; 