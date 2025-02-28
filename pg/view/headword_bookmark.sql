
--
--
--
CREATE VIEW headword_bookmark AS
SELECT    seq_no, idx, reading_txt, kanji_txt
FROM      deck
JOIN      headword USING (reading_txt, kanji_txt)
WHERE     type = 'vocabulary'
UNION
SELECT    seq_no, idx, reading_txt, NULL AS kanji_txt
FROM      deck
JOIN      headword USING (reading_txt)
LEFT JOIN headword_kana_only USING (seq_no, idx)
          -- Either no kanji to match or word usually written kana-only:
WHERE     (deck.kanji_txt IS NULL OR headword_kana_only IS NOT NULL)
AND       type = 'vocabulary';
