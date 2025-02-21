
--
--
--
CREATE TABLE kanji (
  literal text UNIQUE PRIMARY KEY,
  radical integer,
  strokes integer,
  grade integer,
  jlpt integer,
  frequency integer,
  onyomi text,
  kunyomi text,
  nanori text
);
