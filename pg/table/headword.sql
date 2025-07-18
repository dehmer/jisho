
--
--
--
CREATE TABLE headword AS
SELECT seq_no,
       COALESCE(kanji_idx, 0) * 16 + reading_idx AS idx,
       reading_txt,
       kanji_txt
FROM   restricted_kanji_reading
UNION
SELECT seq_no,
       idx,
       reading_txt,
       NULL AS kanji_txt
FROM   headword_reading
WHERE  kana_only
UNION
SELECT seq_no,
       -- Combine reading/kanji index into single value:
       COALESCE(headword_kanji.idx, 0) * 16 + headword_reading.idx AS idx,
       reading_txt,
       kanji_txt
FROM   headword_reading
JOIN   headword_kanji USING (seq_no)
WHERE  NOT headword_reading.hidden
AND    NOT headword_reading.restricted
AND    NOT headword_reading.kana_only
AND    NOT headword_kanji.hidden
AND    NOT headword_kanji.kana_only;

--
-- Add max. kanken index and max. calculated kanji rank.
--

ALTER TABLE headword ADD COLUMN kanken_idx int;
ALTER TABLE headword ADD COLUMN rank int;

WITH kanjis AS (
  SELECT seq_no, idx, fn_kanji(kanji_txt) AS literal
  FROM   headword
), kanken AS (
  SELECT seq_no, idx,
         max(kanken_idx) AS kanken_idx,
         max(rank) AS rank
  FROM   kanjis
  JOIN   kanji USING (literal)
  GROUP  BY seq_no, idx
)
UPDATE headword
SET    kanken_idx = kanken.kanken_idx,
       rank = kanken.rank
FROM   kanken
WHERE  (kanken.seq_no, kanken.idx) = (headword.seq_no, headword.idx);
