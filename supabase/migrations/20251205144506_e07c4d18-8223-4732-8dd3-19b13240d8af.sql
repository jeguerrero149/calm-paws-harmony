-- Create clients table
CREATE TABLE public.clients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  address TEXT,
  city TEXT,
  department TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create client_dogs table
CREATE TABLE public.client_dogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  breed TEXT,
  weight NUMERIC,
  birth_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add client_id to orders table
ALTER TABLE public.orders ADD COLUMN client_id UUID REFERENCES public.clients(id);

-- Enable RLS
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_dogs ENABLE ROW LEVEL SECURITY;

-- RLS policies for clients
CREATE POLICY "Clients are viewable by admins" 
ON public.clients FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert clients" 
ON public.clients FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update clients" 
ON public.clients FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete clients" 
ON public.clients FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS policies for client_dogs
CREATE POLICY "Client dogs are viewable by admins" 
ON public.client_dogs FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert client dogs" 
ON public.client_dogs FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update client dogs" 
ON public.client_dogs FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete client dogs" 
ON public.client_dogs FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Update trigger for clients
CREATE TRIGGER update_clients_updated_at
BEFORE UPDATE ON public.clients
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();