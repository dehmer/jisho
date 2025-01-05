
--
-- 2,136 常用漢字 (jōyō)
--
INSERT INTO kanji_tag
SELECT literal, 'class', '常用漢字'
FROM   kanji
WHERE  grade in (1, 2, 3, 4, 5, 6, 8);
