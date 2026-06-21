CREATE TABLE kana (
  literal text PRIMARY KEY,
  code_point text NOT NULL,
  class text NOT NULL,
  sub_class text
);