
--
--
--
CREATE VIEW vocabulary_by_kanji AS
WITH literals AS (
  SELECT DISTINCT fn_kanji(kanji_txt) AS literal
  FROM   headword_bookmark
),
words AS (
  SELECT literal,
         array_to_string(array_agg(DISTINCT kanji_txt), '、') AS words
  FROM   kanji, headword_bookmark
  WHERE  kanji_txt ~~ (('%' || literal) || '%')
  GROUP  BY literal
)
SELECT literal, words
FROM   words
JOIN   kanji USING (literal);
