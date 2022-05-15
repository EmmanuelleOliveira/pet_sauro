--Payment-types
INSERT INTO 
	public.payment_types
	(created_by,created_at, description)
VALUES 
	(
		1, CURRENT_TIMESTAMP, 'Pix'
	)
RETURNING *;

INSERT INTO 
	public.payment_types
	(created_by,created_at, description)
VALUES 
	(
		1, CURRENT_TIMESTAMP, 'Boleto'
	)
RETURNING *;

INSERT INTO 
	public.payment_types
	(created_by,created_at, description)
VALUES 
	(
		1, CURRENT_TIMESTAMP, 'Crédito'
	)
RETURNING *;