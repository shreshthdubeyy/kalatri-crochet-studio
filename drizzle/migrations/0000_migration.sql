CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  customer_name text NOT NULL,
  phone text NOT NULL,
  email text,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  pincode text NOT NULL,
  notes text,
  items jsonb NOT NULL,
  subtotal integer NOT NULL,
  shipping integer NOT NULL,
  total integer NOT NULL,
  status text NOT NULL DEFAULT 'new'
);
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  kind text NOT NULL,
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  city text,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  message text
);
GRANT ALL ON public.inquiries TO service_role;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;