
--
--
--
CREATE VIEW headword_bookmark AS
SELECT seq_no,
       idx,
       reading_txt,
       kanji_txt,
       deck_key AS tag_key,
       deck_value AS tag_value
FROM   deck
JOIN   headword USING (reading_txt, kanji_txt)
WHERE  type = 'vocabulary'
UNION
SELECT seq_no,
       idx,
       reading_txt,
       NULL AS kanji_txt,
       deck_key AS tag_key,
       deck_value AS tag_value
FROM   deck
JOIN   headword USING (reading_txt)
WHERE  deck.kanji_txt IS NULL
AND    type = 'vocabulary';
