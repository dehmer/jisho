
--
--
--
CREATE VIEW kanji_bookmark AS
SELECT kanji.*, tag_key, tag_value
FROM   bookmark
JOIN   kanji
       ON literal = (REGEXP_SPLIT_TO_ARRAY(key, '[:/]'))[2]
WHERE  position('kanji' IN key) <> 0;
