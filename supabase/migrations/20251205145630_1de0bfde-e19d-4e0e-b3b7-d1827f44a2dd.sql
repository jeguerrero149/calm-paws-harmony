-- Create storage bucket for payment receipts
INSERT INTO storage.buckets (id, name, public)
VALUES ('payment-receipts', 'payment-receipts', true);

-- Create storage policies for payment receipts
CREATE POLICY "Admins can upload payment receipts"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'payment-receipts' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update payment receipts"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'payment-receipts' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete payment receipts"
ON storage.objects
FOR DELETE
USING (bucket_id = 'payment-receipts' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Payment receipts are viewable by admins"
ON storage.objects
FOR SELECT
USING (bucket_id = 'payment-receipts' AND has_role(auth.uid(), 'admin'));

-- Add receipt_url column to orders table
ALTER TABLE public.orders
ADD COLUMN receipt_url TEXT;