
--
--
--
CREATE OR REPLACE FUNCTION public.fn_kanji (text)
RETURNS SETOF text AS $$
  SELECT (regexp_matches($1, '[\u4e00-\u9faf]', 'g'))[1]::text;
$$ LANGUAGE SQL;
