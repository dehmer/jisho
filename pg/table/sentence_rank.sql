
--
--
--
CREATE TABLE sentence_rank AS
WITH kanji_per_sentence AS (
  SELECT sentence_id, fn_kanji(value) AS literal
  FROM   sentence
  WHERE  lang = 'jpn'
)
SELECT sentence_id,
       max(kanken_idx) AS kanken_idx,
       max(rank) AS rank
FROM   kanji_per_sentence
JOIN   kanji USING (literal)
GROUP  BY sentence_id;
