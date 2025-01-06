
--
--
--
CREATE TABLE kanji (
  literal text UNIQUE PRIMARY KEY,
  rank integer NOT NULL,
  radical integer,
  strokes integer,
  grade integer,
  jlpt integer,
  frequency integer,
  onyomi text,
  kunyomi text,
  nanori text
);
