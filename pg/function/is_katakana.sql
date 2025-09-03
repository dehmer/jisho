
--
--
--
CREATE OR REPLACE FUNCTION is_katakana(character)
RETURNS boolean AS
$$
  SELECT $1 ~ '[\x30A0-\x30FF]'
$$
LANGUAGE sql
IMMUTABLE STRICT;
