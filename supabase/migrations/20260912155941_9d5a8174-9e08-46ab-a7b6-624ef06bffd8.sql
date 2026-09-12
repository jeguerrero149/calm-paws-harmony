-- 1. Scope clients/client_dogs/form_submissions policies to authenticated role
DROP POLICY IF EXISTS "Clients are viewable by admins" ON public.clients;
DROP POLICY IF EXISTS "Admins can insert clients" ON public.clients;
DROP POLICY IF EXISTS "Admins can update clients" ON public.clients;
DROP POLICY IF EXISTS "Admins can delete clients" ON public.clients;

CREATE POLICY "Clients are viewable by admins" ON public.clients
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert clients" ON public.clients
FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update clients" ON public.clients
FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete clients" ON public.clients
FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Client dogs are viewable by admins" ON public.client_dogs;
DROP POLICY IF EXISTS "Admins can insert client dogs" ON public.client_dogs;
DROP POLICY IF EXISTS "Admins can update client dogs" ON public.client_dogs;
DROP POLICY IF EXISTS "Admins can delete client dogs" ON public.client_dogs;

CREATE POLICY "Client dogs are viewable by admins" ON public.client_dogs
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert client dogs" ON public.client_dogs
FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update client dogs" ON public.client_dogs
FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete client dogs" ON public.client_dogs
FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can read form submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Admins can update form submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Form submissions are not publicly accessible" ON public.form_submissions;
DROP POLICY IF EXISTS "Anyone can submit form" ON public.form_submissions;

CREATE POLICY "Admins can read form submissions" ON public.form_submissions
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update form submissions" ON public.form_submissions
FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Anyone can submit form" ON public.form_submissions
FOR INSERT TO anon, authenticated WITH CHECK (true);

-- 2. Admin write access for order_items and orders
CREATE POLICY "Admins can insert order items" ON public.order_items
FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update order items" ON public.order_items
FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete order items" ON public.order_items
FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can insert orders" ON public.orders;
CREATE POLICY "Admins can insert orders" ON public.orders
FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Admins can delete orders" ON public.orders;
CREATE POLICY "Admins can delete orders" ON public.orders
FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- 3. Fix mutable search_path on trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- 4. Remove anonymous EXECUTE on the SECURITY DEFINER role-check function
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;