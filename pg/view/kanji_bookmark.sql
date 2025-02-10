
--
--
--
CREATE VIEW kanji_bookmark AS
SELECT kanji_txt AS literal,
       deck_key AS tag_key,
       deck_value as tag_value
FROM   deck
WHERE  type = 'kanji';
