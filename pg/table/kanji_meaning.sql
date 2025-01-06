
--
--
--
CREATE TABLE kanji_meaning (
  literal text REFERENCES kanji,
  language text NOT NULL,
  value text NOT NULL
);
