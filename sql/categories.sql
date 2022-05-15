--Categories insert
INSERT INTO 
	public.categories
	(created_by, created_at, description)
VALUES 
	(
		1,CURRENT_TIMESTAMP, 'Carnívoro'
	)
RETURNING *;

INSERT INTO 
	public.categories
	(created_by, created_at, description)
VALUES 
	(
		1,CURRENT_TIMESTAMP, 'Herbívoro'
	)
RETURNING *;

INSERT INTO 
	public.categories
	(created_by, created_at, description)
VALUES 
	(
		1,CURRENT_TIMESTAMP, 'Onívoro'
	)
RETURNING *;