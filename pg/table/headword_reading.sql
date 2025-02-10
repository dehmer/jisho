
--
--
--
CREATE TABLE headword_reading (
  seq_no int NOT NULL,
  idx int NOT NULL,
  reading_txt text NOT NULL,
  -- reading restricted to one or more kanji.
  restriction text
);
