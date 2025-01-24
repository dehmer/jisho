
--
--
--
CREATE TABLE sentence_rank AS
WITH kanji_per_sentence AS (
  SELECT id, fn_kanji(value) AS literal
  FROM   sentence
  WHERE  lang = 'jpn'
)
SELECT id, max(rank) AS rank
FROM   kanji_per_sentence
JOIN   kanji USING (literal)
GROUP  BY id;
