UPDATE public.products SET title='Fil-Chill Polvo x 120 g', handle='fil-chill-polvo-120g', price=69900, servings=30, tags='{polvo,120g,natural}', description='Polvo natural para la calma de tu perro: valeriana, pasiflora, manzanilla, cúrcuma y pimienta. 120 g = 30 cucharadas. Dosis diaria: 2-5 kg 1 cucharada, 6-10 kg 2, 11-20 kg 3, +20 kg 4.' WHERE id='b7af2b7d-0505-4f39-a420-e014353e62b6';
UPDATE public.products SET title='Fil-Chill Polvo x 360 g', handle='fil-chill-polvo-360g', price=139900, servings=90, tags='{polvo,360g,natural}', description='Polvo natural para la calma de tu perro: valeriana, pasiflora, manzanilla, cúrcuma y pimienta. 360 g = 90 cucharadas. Dosis diaria: 2-5 kg 1 cucharada, 6-10 kg 2, 11-20 kg 3, +20 kg 4.' WHERE id='c805774e-3509-4c5b-8933-8a1281a6e009';
UPDATE public.product_variants SET price=139900 WHERE id='458fdfbd-6454-4463-a025-03f0c7379e53';
INSERT INTO public.products(id,title,handle,price,servings,tags,category,description) VALUES
('a1000000-0000-4000-8000-000000000030','Fil-Chill Snack x 30 unidades','fil-chill-snack-30',69900,30,'{snack,30un,natural}','Suplementos','Snacks blandos en cubitos para la calma de tu perro: valeriana, pasiflora, manzanilla, zanahoria, aceite de coco y cúrcuma. Cada snack pesa aprox. 5 g. Dosis diaria: 2-5 kg 1 snack, 6-10 kg 2, 11-20 kg 3, +20 kg 4.'),
('a1000000-0000-4000-8000-000000000090','Fil-Chill Snack x 90 unidades','fil-chill-snack-90',139900,90,'{snack,90un,natural}','Suplementos','Snacks blandos en cubitos para la calma de tu perro: valeriana, pasiflora, manzanilla, zanahoria, aceite de coco y cúrcuma. Cada snack pesa aprox. 5 g. Dosis diaria: 2-5 kg 1 snack, 6-10 kg 2, 11-20 kg 3, +20 kg 4.');
INSERT INTO public.product_variants(product_id,title,price) VALUES ('a1000000-0000-4000-8000-000000000030','Default Title',69900),('a1000000-0000-4000-8000-000000000090','Default Title',139900);
DELETE FROM public.product_images WHERE product_id IN ('b7af2b7d-0505-4f39-a420-e014353e62b6','c805774e-3509-4c5b-8933-8a1281a6e009');
INSERT INTO public.product_images(product_id,url,alt_text,position) VALUES
('b7af2b7d-0505-4f39-a420-e014353e62b6','/__l5e/assets-v1/822d3006-b0d0-4d96-a630-178cd8e03d83/polvo-120-frente.jpg','Fil-Chill Polvo 120 g - frente',0),
('b7af2b7d-0505-4f39-a420-e014353e62b6','/__l5e/assets-v1/0ef80d61-7aa7-4f91-b1aa-2153abca53f3/polvo-120-respaldo.jpg','Fil-Chill Polvo 120 g - respaldo',1),
('b7af2b7d-0505-4f39-a420-e014353e62b6','/__l5e/assets-v1/acff8566-4ce0-4972-bef4-a93a05eefb2b/polvo-120-arriba.jpg','Fil-Chill Polvo 120 g - tapa',2),
('c805774e-3509-4c5b-8933-8a1281a6e009','/__l5e/assets-v1/12d60429-bb2d-452a-ad1f-f64011d17da5/polvo-360-frente.jpg','Fil-Chill Polvo 360 g - frente',0),
('c805774e-3509-4c5b-8933-8a1281a6e009','/__l5e/assets-v1/3af9ca3d-e891-4e9e-8af6-f20f6ae0e1db/polvo-360-respaldo.jpg','Fil-Chill Polvo 360 g - respaldo',1),
('c805774e-3509-4c5b-8933-8a1281a6e009','/__l5e/assets-v1/f8f38379-317e-4558-ab0b-b032c94b3968/polvo-360-arriba.jpg','Fil-Chill Polvo 360 g - tapa',2),
('a1000000-0000-4000-8000-000000000030','/__l5e/assets-v1/d8315bb0-8d1d-40e5-9244-45588d19098f/snack-30-frente.jpg','Fil-Chill Snack 30 unidades - frente',0),
('a1000000-0000-4000-8000-000000000030','/__l5e/assets-v1/95cc0fd6-8308-401b-a1db-5b6dad1e576e/snack-30-respaldo.jpg','Fil-Chill Snack 30 unidades - respaldo',1),
('a1000000-0000-4000-8000-000000000030','/__l5e/assets-v1/35a7fbf5-1837-4a10-8bec-bea7b4ab395d/snack-30-arriba.jpg','Fil-Chill Snack 30 unidades - tapa',2),
('a1000000-0000-4000-8000-000000000090','/__l5e/assets-v1/1956752c-ac33-42e3-bcbd-cc0bb1398974/snack-90-frente.jpg','Fil-Chill Snack 90 unidades - frente',0),
('a1000000-0000-4000-8000-000000000090','/__l5e/assets-v1/37d97cdd-46ce-42b6-a41d-1524e699debe/snack-90-respaldo.jpg','Fil-Chill Snack 90 unidades - respaldo',1),
('a1000000-0000-4000-8000-000000000090','/__l5e/assets-v1/bc923a47-fc89-4d64-9c31-cc10e0bc66e6/snack-90-arriba.jpg','Fil-Chill Snack 90 unidades - tapa',2);