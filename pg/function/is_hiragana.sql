
--
--
--
CREATE OR REPLACE FUNCTION is_hiragana(character)
RETURNS boolean AS
$$
  SELECT $1 ~ '[\x3040-\x309F]'
$$
LANGUAGE sql
IMMUTABLE STRICT;
