CREATE TABLE public.sales (
	"id" serial NOT NULL,
	"created_by" integer,
	"created_at" timestamp with time zone,
	"update_by" integer,
	"update_at" timestamp with time zone,
	"delete_by" integer,
	"delete_at" timestamp with time zone,
	"value" DECIMAL(10,2) NOT NULL,
	"client_id" integer NOT NULL,
	CONSTRAINT "sales_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE public.users (
	"id" serial NOT NULL,
	"created_by" integer NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"update_by" integer,
	"update_at" timestamp with time zone,
	"delete_by" integer,
	"delete_at" timestamp with time zone,
	"username" varchar(100) NOT NULL UNIQUE,
	"password" varchar(20) NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE public.itens (
	"id" serial NOT NULL,
	"created_by" integer,
	"created_at" timestamp with time zone,
	"update_by" integer,
	"update_at" timestamp with time zone,
	"delete_by" integer,
	"delete_at" timestamp with time zone,
	"price" DECIMAL(10,2) NOT NULL,
	"quantity" integer NOT NULL,
	"sale_id" integer NOT NULL,
	"pet_id" integer NOT NULL,
	CONSTRAINT "itens_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE public.debts (
	"id" serial NOT NULL,
	"created_by" integer,
	"created_at" timestamp with time zone,
	"update_by" integer,
	"update_at" timestamp with time zone,
	"delete_by" integer,
	"delete_at" timestamp with time zone,
	"value" DECIMAL(10,2) NOT NULL,
	"status" BOOLEAN NOT NULL DEFAULT 'false',
	"due_date" DATE NOT NULL,
	"sale_id" integer NOT NULL,
	"payment_type_id" integer NOT NULL,
	CONSTRAINT "debts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE public.clients (
	"id" serial NOT NULL,
	"created_by" integer,
	"created_at" timestamp with time zone,
	"update_by" integer,
	"update_at" timestamp with time zone,
	"delete_by" integer,
	"delete_at" timestamp with time zone,
	"name" varchar(150) NOT NULL,
	"email" varchar(150) NOT NULL UNIQUE,
	"cpf" varchar(11) NOT NULL UNIQUE,
	"password" varchar(20) NOT NULL,
	CONSTRAINT "clients_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE public.pets (
	"id" serial NOT NULL,
	"created_by" integer,
	"created_at" timestamp with time zone,
	"update_by" integer,
	"update_at" timestamp with time zone,
	"delete_by" integer,
	"delete_at" timestamp with time zone,
	"name" varchar(100) NOT NULL UNIQUE,
	"weight" DECIMAL(8,3) NOT NULL,
	"height" DECIMAL(4,2) NOT NULL,
	"price" DECIMAL(10,2) NOT NULL,
	"category_id" integer NOT NULL,
	"url_image" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"price_promo" DECIMAL(10,2),
	"promo_verify" BOOLEAN NOT NULL DEFAULT 'false',
	"quantity" integer NOT NULL,
	CONSTRAINT "pets_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE public.payment_types (
	"id" serial NOT NULL,
	"created_by" integer,
	"created_at" timestamp with time zone,
	"update_by" integer,
	"update_at" timestamp with time zone,
	"delete_by" integer,
	"delete_at" timestamp with time zone,
	"description" varchar(50) NOT NULL UNIQUE,
	CONSTRAINT "payment_types_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE public.categories (
	"id" serial NOT NULL,
	"created_by" integer,
	"created_at" timestamp with time zone,
	"update_by" integer,
	"update_at" timestamp with time zone,
	"delete_by" integer,
	"delete_at" timestamp with time zone,
	"description" varchar(100) NOT NULL,
	CONSTRAINT "categories_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "sales" ADD CONSTRAINT "sales_fk0" FOREIGN KEY ("created_by") REFERENCES "users"("id");
ALTER TABLE "sales" ADD CONSTRAINT "sales_fk1" FOREIGN KEY ("update_by") REFERENCES "users"("id");
ALTER TABLE "sales" ADD CONSTRAINT "sales_fk2" FOREIGN KEY ("delete_by") REFERENCES "users"("id");
ALTER TABLE "sales" ADD CONSTRAINT "sales_fk3" FOREIGN KEY ("client_id") REFERENCES "clients"("id");

ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("created_by") REFERENCES "users"("id");
ALTER TABLE "users" ADD CONSTRAINT "users_fk1" FOREIGN KEY ("update_by") REFERENCES "users"("id");
ALTER TABLE "users" ADD CONSTRAINT "users_fk2" FOREIGN KEY ("delete_by") REFERENCES "users"("id");

ALTER TABLE "itens" ADD CONSTRAINT "itens_fk0" FOREIGN KEY ("created_by") REFERENCES "users"("id");
ALTER TABLE "itens" ADD CONSTRAINT "itens_fk1" FOREIGN KEY ("update_by") REFERENCES "users"("id");
ALTER TABLE "itens" ADD CONSTRAINT "itens_fk2" FOREIGN KEY ("delete_by") REFERENCES "users"("id");
ALTER TABLE "itens" ADD CONSTRAINT "itens_fk3" FOREIGN KEY ("sale_id") REFERENCES "sales"("id");
ALTER TABLE "itens" ADD CONSTRAINT "itens_fk4" FOREIGN KEY ("pet_id") REFERENCES "pets"("id");

ALTER TABLE "debts" ADD CONSTRAINT "debts_fk0" FOREIGN KEY ("created_by") REFERENCES "users"("id");
ALTER TABLE "debts" ADD CONSTRAINT "debts_fk1" FOREIGN KEY ("update_by") REFERENCES "users"("id");
ALTER TABLE "debts" ADD CONSTRAINT "debts_fk2" FOREIGN KEY ("delete_by") REFERENCES "users"("id");
ALTER TABLE "debts" ADD CONSTRAINT "debts_fk3" FOREIGN KEY ("sale_id") REFERENCES "sales"("id");
ALTER TABLE "debts" ADD CONSTRAINT "debts_fk4" FOREIGN KEY ("payment_type_id") REFERENCES "payment_types"("id");

ALTER TABLE "clients" ADD CONSTRAINT "clients_fk0" FOREIGN KEY ("created_by") REFERENCES "users"("id");
ALTER TABLE "clients" ADD CONSTRAINT "clients_fk1" FOREIGN KEY ("update_by") REFERENCES "users"("id");
ALTER TABLE "clients" ADD CONSTRAINT "clients_fk2" FOREIGN KEY ("delete_by") REFERENCES "users"("id");

ALTER TABLE "pets" ADD CONSTRAINT "pets_fk0" FOREIGN KEY ("created_by") REFERENCES "users"("id");
ALTER TABLE "pets" ADD CONSTRAINT "pets_fk1" FOREIGN KEY ("update_by") REFERENCES "users"("id");
ALTER TABLE "pets" ADD CONSTRAINT "pets_fk2" FOREIGN KEY ("delete_by") REFERENCES "users"("id");
ALTER TABLE "pets" ADD CONSTRAINT "pets_fk3" FOREIGN KEY ("category_id") REFERENCES "categories"("id");

ALTER TABLE "payment_types" ADD CONSTRAINT "payment_types_fk0" FOREIGN KEY ("created_by") REFERENCES "users"("id");
ALTER TABLE "payment_types" ADD CONSTRAINT "payment_types_fk1" FOREIGN KEY ("update_by") REFERENCES "users"("id");
ALTER TABLE "payment_types" ADD CONSTRAINT "payment_types_fk2" FOREIGN KEY ("delete_by") REFERENCES "users"("id");

ALTER TABLE "categories" ADD CONSTRAINT "categories_fk0" FOREIGN KEY ("created_by") REFERENCES "users"("id");
ALTER TABLE "categories" ADD CONSTRAINT "categories_fk1" FOREIGN KEY ("update_by") REFERENCES "users"("id");
ALTER TABLE "categories" ADD CONSTRAINT "categories_fk2" FOREIGN KEY ("delete_by") REFERENCES "users"("id");








