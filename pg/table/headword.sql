
--
--
--
CREATE TABLE headword (
  seq_no int NOT NULL,
  type text NOT NULL,
  headword_txt text NOT NULL,
  -- reading restricted to one or more kanji.
  restriction text
);
