
--
--
--
CREATE TABLE headword (
  sequence int NOT NULL,
  type text NOT NULL,
  value text NOT NULL,
  -- reading restricted to one or more kanji.
  restriction text
);
