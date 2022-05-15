--Construção dos registros de pets

--Carnívoros
INSERT INTO 
	public.pets
	(created_by, created_at, "name", weight, height, price, category_id, url_image, description,quantity)
VALUES 
	(
		1,CURRENT_TIMESTAMP,'Tiranossauro Rex', 9800.000, 
		4.00,9900.00, 1, '../assets/images/trex.png','Fortes, robustos e com estrutura invejável. É um pet excelente para ser o guardião da família.',60
	)
RETURNING *;

INSERT INTO 
	public.pets
	(created_by, created_at, "name", weight, height, price, category_id, url_image, description,quantity)
VALUES 
	(
		1,CURRENT_TIMESTAMP,'Alossauro', 2300.000, 
		2.30,7300.00, 1, '../assets/images/alossauro.png','Essa magnífica espécie une energia e agilidade a uma grande capacidade de aprendizado.',35
	)
RETURNING *;

INSERT INTO 
	public.pets
	(created_by, created_at, "name", weight, height, price, category_id, url_image, description,quantity)
VALUES 
	(
		1,CURRENT_TIMESTAMP,'Velociraptor', 12.000, 
		2.00,8000.00, 1, '../assets/images/velociraptor.png','Muito inteligente e muitas vezes é tido como incansável.',35
	)
RETURNING *;

INSERT INTO 
	public.pets
	(created_by, created_at, "name", weight, height, price, category_id, url_image, description,quantity)
VALUES 
	(
		1,CURRENT_TIMESTAMP,'Albertossauro', 4000.000, 
		3.60,5799.00, 1, '../assets/images/albertossauro.png','É independente, mas quer participar das atividades da família sempre que pode.',20
	)
RETURNING *;

INSERT INTO 
	public.pets
	(created_by, created_at, "name", weight, height, price, category_id, url_image, description,quantity)
VALUES 
	(
		1,CURRENT_TIMESTAMP,'Compsognato', 3.500, 
		1.30,3199.00, 1, '../assets/images/compsognato.png','Muito dócil. Ele se dá muito bem com as crianças de sua família.',60
	)
RETURNING *;

INSERT INTO 
	public.pets
	(created_by, created_at, "name", weight, height, price, category_id, url_image, description,quantity)
VALUES 
	(
		1,CURRENT_TIMESTAMP,'Baryonyx', 1900.000, 
		2.50,6399.00, 1, '../assets/images/baryonyx.png','Para os amantes de uma das espécies mais engraçadinhas do mundo.',15
	)
RETURNING *;

INSERT INTO 
	public.pets
	(created_by, created_at, "name", weight, height, price, category_id, url_image, description,quantity)
VALUES 
	(
		1,CURRENT_TIMESTAMP,'Pteranodonte', 25.000, 
		5.00,7999.99, 1, '../assets/images/pteranodonte.png','Ave doméstica que encantam a todos. Com sua personalidade, faz sucesso entre os tutores.',40
	)
RETURNING *;

INSERT INTO 
	public.pets
	(created_by, created_at, "name", weight, height, price, category_id, url_image, description,quantity)
VALUES 
	(
		1,CURRENT_TIMESTAMP,'Ligabueino', 00.450, 
		0.79,2699.99, 1, '../assets/images/ligabueino.png','Com personalidades marcantes,  você vai amar seu novo pet, sem falar que alegram a casa.',70
	)
RETURNING *;

INSERT INTO 
	public.pets
	(created_by, created_at, "name", weight, height, price, category_id, url_image, description,quantity)
VALUES 
	(
		1,CURRENT_TIMESTAMP,'Platecarpo', 1000.000, 
		4.00,11999.99, 1, '../assets/images/platecarpo.png','Com seu jeito brincalhão, vai ser ótimo para a piscina da sua casa.',35
	)
RETURNING *;

INSERT INTO 
	public.pets
	(created_by, created_at, "name", weight, height, price, category_id, url_image, description,quantity)
VALUES 
	(
		1,CURRENT_TIMESTAMP,'Indoraptor', 1001.000, 
		3.10,15999.99, 1, '../assets/images/indoraptor.png','Espécie que traz uma beleza natural ao ambiente. Você irá amar seu novo companheiro.',10
	)
RETURNING *;

--Herbívoros

INSERT INTO 
	public.pets
	(created_by, created_at, "name", weight, height, price, category_id, url_image, description,quantity)
VALUES 
	(
		1,CURRENT_TIMESTAMP,'Braquiossauro', 64000.000, 
		20.00,21999.99, 2, '../assets/images/braquiossauro.png','É uma espécie muito apegada ao seu dono e possui uma grande capacidade de aprendizado.',25
	)
RETURNING *;

INSERT INTO 
	public.pets
	(created_by, created_at, "name", weight, height, price, category_id, url_image, description,quantity)
VALUES 
	(
		1,CURRENT_TIMESTAMP,'Diplodoco', 16000.000, 
		5.00,13499.99, 2, '../assets/images/diplodoco.png','Apaixonem-se. São dóceis e muito espertos.',75
	)
RETURNING *;

INSERT INTO 
	public.pets
	(created_by, created_at, "name", weight, height, price, category_id, url_image, description,quantity)
VALUES 
	(
		1,CURRENT_TIMESTAMP,'Tricerátops', 13000.000, 
		3.00,10499.99, 2, '../assets/images/triceratops.png','Ele é independente e se dá muito bem com as crianças de sua família.',30
	)
RETURNING *;

INSERT INTO 
	public.pets
	(created_by, created_at, "name", weight, height, price, category_id, url_image, description,quantity)
VALUES 
	(
		1,CURRENT_TIMESTAMP,'Parassaurolofo', 5000.000, 
		4.00,6299.99, 2, '../assets/images/parassaurolofo.png','Está a procura de um melhor amigo? Acabou de encontrar.',40
	)
RETURNING *;

INSERT INTO 
	public.pets
	(created_by, created_at, "name", weight, height, price, category_id, url_image, description,quantity)
VALUES 
	(
		1,CURRENT_TIMESTAMP,'Shunossauro', 3000.000, 
		9.50,5999.99, 2, '../assets/images/shunossauro.png','Ele irá fazer os momentos da sua vida mais felizes.',25
	)
RETURNING *;

INSERT INTO 
	public.pets
	(created_by, created_at, "name", weight, height, price, category_id, url_image, description,quantity)
VALUES 
	(
		1,CURRENT_TIMESTAMP,'Brontossauro', 17000.000, 
		22.00,25999.99, 2, '../assets/images/brontossauro.png','Amigo inseparável, são muito ativos e facilmente adestrável.',75
	)
RETURNING *;

INSERT INTO 
	public.pets
	(created_by, created_at, "name", weight, height, price, category_id, url_image, description,quantity)
VALUES 
	(
		1,CURRENT_TIMESTAMP,'Coritossauro', 4000.000, 
		4.00,9999.99, 2, '../assets/images/coritossauro.png','Carinhoso, elegante, fiel e respeita a familia. ',45
	)
RETURNING *;

INSERT INTO 
	public.pets
	(created_by, created_at, "name", weight, height, price, category_id, url_image, description,quantity)
VALUES 
	(
		1,CURRENT_TIMESTAMP,'Saltassauro', 6000.000, 
		4.00,4599.99, 2, '../assets/images/saltassauro.png','Muito meigo e carinhoso. Sua familia irá amar.',50
	)
RETURNING *;

INSERT INTO 
	public.pets
	(created_by, created_at, "name", weight, height, price, category_id, url_image, description,quantity)
VALUES 
	(
		1,CURRENT_TIMESTAMP,'Ouranossauro', 4400.000, 
		3.00,8399.99, 2, '../assets/images/ouranossauro.png','Com uma beleza natural, você irá amar seu novo companheiro.',70
	)
RETURNING *;

-- Onívoros

INSERT INTO 
	public.pets
	(created_by, created_at, "name", weight, height, price, category_id, url_image, description,quantity)
VALUES 
	(
		1,CURRENT_TIMESTAMP,'Chirostenotes', 100.000, 
		2.60,999.99, 3, '../assets/images/chirostenotes.png','É muito inteligente, carinhoso e muitas vezes é considerado como incansável.',85
	)
RETURNING *;

INSERT INTO 
	public.pets
	(created_by, created_at, "name", weight, height, price, category_id, url_image, description,quantity)
VALUES 
	(
		1,CURRENT_TIMESTAMP,'Nanossauro', 10.000, 
		2.00,3999.99, 3, '../assets/images/nanossauro.png','Possui personalidade marcante,  sem falar que alegram a casa. Você irá se apaixonar.',45
	)
RETURNING *;

INSERT INTO 
	public.pets
	(created_by, created_at, "name", weight, height, price, category_id, url_image, description,quantity)
VALUES 
	(
		1,CURRENT_TIMESTAMP,'Lesotossauro', 3.500, 
		2.00,899.99, 3, '../assets/images/lesotossauro.png','Você está perto de fazer os momentos mais felizes da sua vida com essa gracinha.',85
	)
RETURNING *;

INSERT INTO 
	public.pets
	(created_by, created_at, "name", weight, height, price, category_id, url_image, description,quantity)
VALUES 
	(
		1,CURRENT_TIMESTAMP,'Paquicefálossauro', 450.000, 
		4.50,1399.99, 3, '../assets/images/paquicefalossauro.png','Espécie magnífica  que reune agilidade a uma grande capacidade de aprendizado.',30
	)
RETURNING *;

INSERT INTO 
	public.pets
	(created_by, created_at, "name", weight, height, price, category_id, url_image, description,quantity)
VALUES 
	(
		1,CURRENT_TIMESTAMP,'Galimimo', 440.000, 
		2.00,1699.99, 3, '../assets/images/galimimo.png','Alegre, brincalhão, esperto e muito inteligente. É simplesmente apaixonante.',90
	)
RETURNING *;

INSERT INTO 
	public.pets
	(created_by, created_at, "name", weight, height, price, category_id, url_image, description,quantity)
VALUES 
	(
		1,CURRENT_TIMESTAMP,'Anzu', 290.000, 
		1.50,2199.99, 3, '../assets/images/anzu.png','Com grande capacidade de aprendizado, será seu amigo inseparável.',65
	)
RETURNING *;

INSERT INTO 
	public.pets
	(created_by, created_at, "name", weight, height, price, category_id, url_image, description,quantity)
VALUES 
	(
		1,CURRENT_TIMESTAMP,'Oviraptor', 35.000, 
		2.00,899.99, 3, '../assets/images/oviraptor.png','Dócil e muito amigável. Ideal para quem mora em apartamento.',75
	)
RETURNING *;