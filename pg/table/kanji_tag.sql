
--
--
--
CREATE TABLE kanji_tag (
  literal text REFERENCES kanji,
  key text NOT NULL,
  value text NOT NULL
);
