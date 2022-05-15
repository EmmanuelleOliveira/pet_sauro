--users 
SELECT 
	* 
FROM 
	public.users

INSERT INTO 
	public.users 
	(created_by, created_at, username, "password") 
VALUES 
	(1,CURRENT_TIMESTAMP,'Admin','Admin123')
RETURNING *;

UPDATE 
	public.users 
SET 
	update_by=1, update_at=CURRENT_TIMESTAMP, username='Manu' 
WHERE id=1
RETURNING *;

--clients 
SELECT 
	* 
FROM 
	public.clients

INSERT INTO 
	public.clients 
	(created_at, "name", email, cpf, "password")
VALUES 
	(
		CURRENT_TIMESTAMP,'Maria Silva',
		'maria@gmail.com','09584651525',
		'Maria123'
	)
RETURNING *;
	
UPDATE 
	public.clients
SET 
	update_by=1, update_at=CURRENT_TIMESTAMP, "password"='anderson456'
WHERE id=1
RETURNING *;

--pets
SELECT 
	* 
FROM 
	public.pets

INSERT INTO 
	public.pets
	(created_by, created_at, "name", weight, height, price, category_id, url_image, description,quantity)
VALUES 
	(
		1,CURRENT_TIMESTAMP,'Tiranossauro rex', 500, 
		6.1,5000.50, 1, 'https://static.wikia.nocookie.net/jurassicpark/images/3/34/T-Rex_3.png/revision/latest?cb=20141230024946','Feroz com animais, mas amigável com humanos',10
	)
RETURNING *;
	
UPDATE 
	public.pets
SET 
	update_by=1, update_at=CURRENT_TIMESTAMP, price=10000.90 
WHERE id=1
RETURNING *; 

--categories
SELECT 
	* 
FROM 
	public.categories

INSERT INTO 
	public.categories
	(created_by, created_at, description)
VALUES 
	(
		1,CURRENT_TIMESTAMP, 'carnívoro'
	)
RETURNING *;
	
UPDATE 
	public.categories
SET 
	update_by=1, update_at=CURRENT_TIMESTAMP, description='Carnívoro' 
WHERE id=1
RETURNING *; 

--sales
SELECT 
	* 
FROM 
	public.sales

INSERT INTO 
	public.sales
	("value", client_id)
VALUES 
	(
		20000, 1
	)
RETURNING *;
	
UPDATE 
	public.sales
SET 
	update_at=CURRENT_TIMESTAMP, created_at=CURRENT_TIMESTAMP
WHERE id=1
RETURNING *;

--payment_types
SELECT 
	* 
FROM 
	public.payment_types

INSERT INTO 
	public.payment_types
	(created_by,created_at, description)
VALUES 
	(
		1, CURRENT_TIMESTAMP, 'Pix'
	)
RETURNING *;
	
UPDATE 
	public.payment_types
SET 
	update_at=CURRENT_TIMESTAMP, description='Débito'
WHERE id=1
RETURNING *;

--itens
SELECT 
	* 
FROM 
	public.itens

INSERT INTO 
	public.itens
	(created_by,created_at, price, quantity, sale_id, pet_id)
VALUES 
	(
		1, CURRENT_TIMESTAMP, 10000.90, 1, 1,3
	)
RETURNING *;
	
UPDATE 
	public.itens
SET 
	update_at=CURRENT_TIMESTAMP, quantity=2
WHERE id=1
RETURNING *;

--debts
SELECT 
	* 
FROM 
	public.debts

INSERT INTO 
	public.debts
	(created_at, "value", due_date, sale_id,payment_type_id)
VALUES 
	(
		CURRENT_TIMESTAMP, 10000.90, '2022-05-10',1, 1
	)
RETURNING *;
	
UPDATE 
	public.debts
SET 
	update_at=CURRENT_TIMESTAMP, status=true
WHERE id=1
RETURNING *;

