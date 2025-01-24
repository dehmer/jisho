
--
--
--
CREATE OR REPLACE FUNCTION public.fn_literal(bookmark)
RETURNS text AS $$
  SELECT CASE position('kanji' IN $1.key)
           WHEN 0 THEN null
           ELSE split_part($1.key, ':', 2)::text
         END;
$$ LANGUAGE SQL;
