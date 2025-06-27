
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Users, 
  Building, 
  FileText, 
  BarChart2, 
  Settings, 
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface AdminSidebarProps {
  className?: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ className }) => {
  const { logout } = useAuth();
  
  const navItems = [
    { 
      icon: <BarChart2 className="h-5 w-5" />, 
      label: "Tableau de Bord", 
      path: "/admin-dashboard" 
    },
    { 
      icon: <Users className="h-5 w-5" />, 
      label: "Utilisateurs", 
      path: "/admin/users" 
    },
    { 
      icon: <Building className="h-5 w-5" />, 
      label: "Organisations", 
      path: "/admin/organizations" 
    },
    { 
      icon: <FileText className="h-5 w-5" />, 
      label: "Formations", 
      path: "/admin/courses" 
    },
    { 
      icon: <ShieldCheck className="h-5 w-5" />, 
      label: "Inscriptions", 
      path: "/admin/enrollments" 
    },
    { 
      icon: <Settings className="h-5 w-5" />, 
      label: "Paramètres", 
      path: "/admin/settings" 
    },
  ];

  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return cn(
      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all",
      isActive 
        ? "bg-primary text-primary-foreground" 
        : "hover:bg-muted"
    );
  };

  return (
    <div className={cn("border rounded-lg p-4", className)}>
      <div className="mb-4">
        <h2 className="font-semibold text-lg px-3">Administration</h2>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={getLinkClass}
            end={item.path === "/admin-dashboard"}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
        
        <button 
          onClick={logout}
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all text-red-500 hover:bg-red-50 w-full text-left mt-6"
        >
          <LogOut className="h-5 w-5" />
          <span>Déconnexion</span>
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;
