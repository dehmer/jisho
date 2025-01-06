
--
-- 863 人名用漢字 (jinmeiyō)
--
INSERT INTO kanji_tag
SELECT literal, 'class', '人名用漢字'
FROM   kanji
WHERE  grade in (9, 10);
