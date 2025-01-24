
--
--
--
CREATE VIEW headword_kanji AS
SELECT seq_no, headword_txt AS kanji_txt, restriction
FROM   headword
WHERE type = 'kanji';
