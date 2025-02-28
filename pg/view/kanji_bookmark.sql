
--
--
--
CREATE VIEW kanji_bookmark AS
SELECT literal, headword_bookmark.*
FROM   headword_bookmark, fn_kanji(kanji_txt) AS literal;
