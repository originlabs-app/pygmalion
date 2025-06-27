# Schéma de Base de Données – MVP MBAVIATION (Supabase)

> ⚠️ **Note :** Le schéma présenté ci-dessous constitue une première version pour le MVP. Il pourra évoluer au gré des besoins fonctionnels, des optimisations de performance ou des contraintes règlementaires.

## 1. Tables Principales

### 1.1 Utilisateurs & Profils
```sql
-- Extension des users Supabase auth
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role user_role NOT NULL,
  organization TEXT,
  phone TEXT,
  kyc_status verification_status DEFAULT 'pending',
  kyc_verified_at TIMESTAMPTZ,
  affiliated_to UUID[], -- IDs des organisations/aéroports
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### 1.2 Organisations de formation
```sql
CREATE TABLE public.training_organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_name TEXT NOT NULL,
  siret TEXT UNIQUE,
  description TEXT,
  website TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  contact_name TEXT,
  logo_url TEXT,
  verification_status verification_status DEFAULT 'pending',
  verified_at TIMESTAMPTZ,
  qualiopi_certified BOOLEAN DEFAULT false,
  qualiopi_number TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### 1.3 Entreprises clientes
```sql
CREATE TABLE public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  siret TEXT UNIQUE,
  contact_email TEXT,
  contact_phone TEXT,
  manager_id UUID REFERENCES auth.users(id),
  airport_id UUID REFERENCES public.airports(id),
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### 1.4 Aéroports
```sql
CREATE TABLE public.airports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  iata_code TEXT UNIQUE,
  icao_code TEXT UNIQUE,
  city TEXT,
  country TEXT DEFAULT 'France',
  manager_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## 2. Formations & Sessions
```sql
-- Formations
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  provider_id UUID REFERENCES public.training_organizations(id),
  description TEXT,
  category aviation_category NOT NULL,
  objectives TEXT,
  requirements TEXT,
  target_audience TEXT,
  program TEXT,
  qualiopi_indicators TEXT[],
  course_type course_modality NOT NULL,
  image_url TEXT,
  status course_status DEFAULT 'draft',
  duration_hours INTEGER,
  certification_type TEXT,
  certification_validity_months INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Sessions
CREATE TABLE public.sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  location TEXT, -- Physique ou "En ligne"
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  available_seats INTEGER NOT NULL DEFAULT 0,
  max_seats INTEGER NOT NULL DEFAULT 0,
  lms_course_id TEXT, -- ID dans le LMS intégré
  virtual_meeting_url TEXT,
  virtual_meeting_password TEXT,
  session_type session_type DEFAULT 'regular',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

## 3. Inscriptions & Progression
```sql
-- Inscriptions
CREATE TABLE public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id),
  session_id UUID REFERENCES public.sessions(id),
  status enrollment_status DEFAULT 'pending',
  payment_status payment_status DEFAULT 'pending',
  enrollment_date TIMESTAMPTZ DEFAULT now(),
  completion_date TIMESTAMPTZ,
  score DECIMAL(5,2),
  assigned_by UUID REFERENCES auth.users(id),
  company_id UUID REFERENCES public.companies(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Progression
CREATE TABLE public.enrollment_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID REFERENCES public.enrollments(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  completion_date TIMESTAMPTZ,
  time_spent_minutes INTEGER DEFAULT 0,
  score DECIMAL(5,2),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(enrollment_id, module_id)
);
```

## 4. Certificats & Conformité
```sql
-- Certificats
CREATE TABLE public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id),
  enrollment_id UUID REFERENCES public.enrollments(id),
  certificate_number TEXT UNIQUE NOT NULL,
  course_name TEXT NOT NULL,
  category aviation_category NOT NULL,
  issue_date DATE NOT NULL,
  expiry_date DATE,
  status certificate_status DEFAULT 'valid',
  token_id TEXT UNIQUE,
  blockchain_hash TEXT,
  pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Alertes conformité
CREATE TABLE public.compliance_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  certificate_id UUID REFERENCES public.certificates(id),
  alert_type alert_type NOT NULL,
  message TEXT NOT NULL,
  severity alert_severity DEFAULT 'medium',
  status alert_status DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now(),
  resolved_at TIMESTAMPTZ
);
```

## 5. Relations Many-to-Many
```sql
CREATE TABLE public.user_company_affiliations (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'employee',
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, company_id)
);

CREATE TABLE public.course_prerequisites (
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  prerequisite_course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  PRIMARY KEY (course_id, prerequisite_course_id)
);
```

## 6. Row Level Security (RLS)
```sql
-- Activation RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Exemples de politiques
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Anyone can view published courses" ON public.courses
  FOR SELECT USING (status = 'published');
```

*Les politiques complètes sont listées dans le SQL source ci-dessus.*

## 7. Triggers & Fonctions
```sql
-- Mise à jour automatique du champ updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Exemple de trigger
CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## 8. Types Enum Personnalisés
```sql
CREATE TYPE user_role AS ENUM ('student', 'training-org', 'manager', 'airport-manager', 'admin');
CREATE TYPE verification_status AS ENUM ('pending', 'verified', 'rejected', 'expired');
-- … autres enums …
```

---

Ce document sert de référence initiale ; tout changement important devra être :
1. Versionné (migration SQL dans le dépôt) ;
2. Documenté (changelog + impact applicatif) ;
3. Validé (revue de code + tests d'intégration). 