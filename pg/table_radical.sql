
--
-- Principal radical, where radical is a kanji in its own right.
-- Stroke counts may differ between radical/kanji role.
-- Variants are managed elsewhere.
--
CREATE TABLE radical (
  index int NOT NULL UNIQUE PRIMARY KEY,
  literal text REFERENCES kanji,
  strokes int NOT NULL,
  names text NOT NULL
);
