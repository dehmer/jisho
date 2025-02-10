
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
       COALESCE(headword_kanji.idx, 0) * 16 + headword_reading.idx AS idx,
       reading_txt,
       kanji_txt
FROM   headword_reading
JOIN   headword_kanji USING (seq_no)
WHERE  NOT headword_reading.hidden
AND    NOT headword_reading.restricted
AND    NOT headword_reading.kana_only
AND    NOT headword_kanji.hidden
AND    NOT headword_kanji.restricted
AND    NOT headword_kanji.kana_only;
