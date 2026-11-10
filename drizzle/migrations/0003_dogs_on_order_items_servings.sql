ALTER TABLE public.order_items ADD COLUMN IF NOT EXISTS dog_id uuid REFERENCES public.client_dogs(id) ON DELETE SET NULL;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS servings integer;
COMMENT ON COLUMN public.products.servings IS 'Daily doses (cucharadas o snacks) per unit; used to estimate consumption';
CREATE INDEX IF NOT EXISTS order_items_dog_id_idx ON public.order_items(dog_id);