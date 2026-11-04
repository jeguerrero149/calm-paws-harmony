ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS customer_document text,
  ADD COLUMN IF NOT EXISTS customer_city text,
  ADD COLUMN IF NOT EXISTS customer_department text,
  ADD COLUMN IF NOT EXISTS source text NOT NULL DEFAULT 'admin';

CREATE OR REPLACE FUNCTION public.create_checkout_order(
  _name text, _phone text, _email text, _document text,
  _address text, _city text, _department text, _notes text,
  _items jsonb
) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  _order_id uuid;
  _total numeric := 0;
  _item jsonb;
  _price numeric;
  _qty int;
BEGIN
  IF coalesce(length(trim(_name)),0) < 3 OR length(_name) > 100 THEN RAISE EXCEPTION 'Nombre inválido'; END IF;
  IF _phone !~ '^\+?[0-9 ]{7,15}$' THEN RAISE EXCEPTION 'Celular inválido'; END IF;
  IF _document !~ '^[0-9]{5,12}$' THEN RAISE EXCEPTION 'Documento inválido'; END IF;
  IF _email IS NOT NULL AND _email <> '' AND (_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' OR length(_email) > 255) THEN RAISE EXCEPTION 'Email inválido'; END IF;
  IF coalesce(length(trim(_address)),0) < 5 OR length(_address) > 200 THEN RAISE EXCEPTION 'Dirección inválida'; END IF;
  IF coalesce(length(trim(_city)),0) < 2 OR length(_city) > 80 THEN RAISE EXCEPTION 'Ciudad inválida'; END IF;
  IF coalesce(length(trim(_department)),0) < 2 OR length(_department) > 80 THEN RAISE EXCEPTION 'Departamento inválido'; END IF;
  IF _notes IS NOT NULL AND length(_notes) > 500 THEN RAISE EXCEPTION 'Notas muy largas'; END IF;
  IF jsonb_typeof(_items) <> 'array' OR jsonb_array_length(_items) = 0 OR jsonb_array_length(_items) > 20 THEN RAISE EXCEPTION 'Carrito inválido'; END IF;

  INSERT INTO public.orders (customer_name, customer_phone, customer_email, customer_document,
    customer_address, customer_city, customer_department, notes, status, source, total)
  VALUES (trim(_name), trim(_phone), nullif(trim(_email),''), _document, trim(_address), trim(_city),
    trim(_department), nullif(trim(_notes),''), 'pending', 'web', 0)
  RETURNING id INTO _order_id;

  FOR _item IN SELECT * FROM jsonb_array_elements(_items) LOOP
    _qty := (_item->>'quantity')::int;
    IF _qty IS NULL OR _qty < 1 OR _qty > 50 THEN RAISE EXCEPTION 'Cantidad inválida'; END IF;
    SELECT price INTO _price FROM public.products WHERE id = (_item->>'product_id')::uuid AND available IS NOT FALSE;
    IF _price IS NULL THEN RAISE EXCEPTION 'Producto no disponible'; END IF;
    INSERT INTO public.order_items (order_id, product_id, quantity, price) VALUES (_order_id, (_item->>'product_id')::uuid, _qty, _price);
    _total := _total + _price * _qty;
  END LOOP;

  UPDATE public.orders SET total = _total WHERE id = _order_id;
  RETURN _order_id;
END $$;

REVOKE ALL ON FUNCTION public.create_checkout_order(text,text,text,text,text,text,text,text,jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.create_checkout_order(text,text,text,text,text,text,text,text,jsonb) TO anon, authenticated;