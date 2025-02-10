
--
-- Kanji with restricted readings.
-- Consider only headword pairs which are usually NOT written kana-only
-- and don't contain obscure or outdated kanji or kana usage.
--
CREATE VIEW restricted_kanji_reading AS
  WITH restrictions AS (
    SELECT seq_no, idx AS reading_idx, reading_txt,
           unnest(string_to_array(restriction, ',')) AS kanji_txt
    FROM   headword_reading
    WHERE  restriction IS NOT NULL
    AND    NOT hidden
    AND    NOT kana_only
  )
  SELECT seq_no,
         reading_idx, headword_kanji.idx AS kanji_idx,
         reading_txt, kanji_txt
  FROM   restrictions
  JOIN   headword_kanji USING (seq_no, kanji_txt)
  WHERE  NOT headword_kanji.hidden;
