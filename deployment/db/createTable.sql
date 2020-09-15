CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.nutrition_type (
  id SERIAL PRIMARY KEY,
  name varchar(20) NOT NULL,
  nutrition_type_id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v1(),
  created_at TIMESTAMP(6) WITHOUT TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP(6) WITHOUT TIME ZONE DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.eating_window (
  id SERIAL PRIMARY KEY,
  name varchar(20) NOT NULL,
  eating_window_id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v1(),
  created_at TIMESTAMP(6) WITHOUT TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP(6) WITHOUT TIME ZONE DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.food_type (
  id SERIAL PRIMARY KEY,
  name varchar(20) NOT NULL,
  food_type_id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v1(),
  created_at TIMESTAMP(6) WITHOUT TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP(6) WITHOUT TIME ZONE DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.food (
  id SERIAL PRIMARY KEY,
  name_en varchar(50) NOT NULL,
  name_si varchar(50),
  serving_unit varchar(20),
  serving_size smallint,
  calories smallint,
  protein smallint,
  fat smallint,
  carb smallint,
  nutrition_type_id UUID NOT NULL REFERENCES public.nutrition_type(nutrition_type_id),
  food_type UUID NOT NULL REFERENCES public.food_type(food_type_id),
  cost smallint,
  eating_window UUID ARRAY,
  is_budget boolean,
  food_id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v1(),
  created_at TIMESTAMP(6) WITHOUT TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP(6) WITHOUT TIME ZONE DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.meal_plan (
  id SERIAL PRIMARY KEY,
  name varchar(50),
  calories smallint,
  protein smallint,
  fat smallint,
  carb smallint,
  cost smallint,
  image_url varchar(255),
  with_supplement boolean,
  meal_plan_id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v1(),
  created_at TIMESTAMP(6) WITHOUT TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP(6) WITHOUT TIME ZONE DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.meal_food (
  id SERIAL PRIMARY KEY,
  calories smallint,
  serving smallint,
  meal_plan_id UUID NOT NULL REFERENCES public.meal_plan(meal_plan_id),
  food_id UUID NOT NULL REFERENCES public.food(food_id),
  eating_window_id UUID NOT NULL REFERENCES public.eating_window(eating_window_id),
  meal_food_id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v1(),
  created_at TIMESTAMP(6) WITHOUT TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP(6) WITHOUT TIME ZONE DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.user (
  id SERIAL PRIMARY KEY,
  name varchar(20) NOT NULL,
  phone_number varchar(15),
  language varchar(20),
  gender varchar(7),
  age smallint,
  weight decimal(6,3),
  height decimal(6,3),
  goal varchar(20),
  activity varchar(50),
  diet_type varchar(36),
  msidn varchar(50),
  user_id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v1(),
  created_at TIMESTAMP(6) WITHOUT TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP(6) WITHOUT TIME ZONE DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.user_meal (
  id SERIAL PRIMARY KEY,
  meal_plan_id UUID NOT NULL REFERENCES public.meal_plan(meal_plan_id),
  user_id UUID NOT NULL REFERENCES public.user(user_id),
  created_at TIMESTAMP(6) WITHOUT TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP(6) WITHOUT TIME ZONE DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.article(
  id SERIAL PRIMARY KEY,
  title_en TEXT,
  title_si TEXT,
  image_url varchar(250),
  started_text_en varchar(100),
  started_text_si varchar(100),
  body_en TEXT,
  body_si TEXT,
  read_time smallint,
  status varchar(20),
  date TIMESTAMP,
  article_id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v1(),
  created_at TIMESTAMP(6) WITHOUT TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP(6) WITHOUT TIME ZONE DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.article_category (
  id SERIAL PRIMARY KEY,
  name varchar(100) NOT NULL,
  article_category_id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v1(),
  created_at TIMESTAMP(6) WITHOUT TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP(6) WITHOUT TIME ZONE DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.article_categories (
  id SERIAL PRIMARY KEY,
  article_id UUID NOT NULL REFERENCES public.article(article_id),
  article_category_id UUID NOT NULL REFERENCES public.article_category(article_category_id),
  created_at TIMESTAMP(6) WITHOUT TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP(6) WITHOUT TIME ZONE DEFAULT now() NOT NULL
);



-- Change Database Name --
CREATE USER lambda_user WITH PASSWORD '0xdsdjk-sdsds-5sfs5a';
GRANT CONNECT ON DATABASE trackmydiet TO lambda_user;
GRANT USAGE ON SCHEMA public TO lambda_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO lambda_user;
GRANT INSERT ON ALL TABLES IN SCHEMA public TO lambda_user;
GRANT UPDATE ON ALL TABLES IN SCHEMA public TO lambda_user;
GRANT DELETE ON public.article,public.food TO lambda_user;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO lambda_user;

