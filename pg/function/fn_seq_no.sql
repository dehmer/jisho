
--
--
--
CREATE OR REPLACE FUNCTION public.fn_seq_no(bookmark)
RETURNS int AS $$
  SELECT CASE position('headword' IN $1.key)
           WHEN 0 THEN null
           ELSE split_part($1.key, ':', 2)::int
         END;
$$ LANGUAGE SQL;
