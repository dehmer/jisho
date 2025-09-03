
--
--
--
CREATE VIEW kanji_onyomi AS
SELECT literal,
       regexp_split_to_table(onyomi, ', ') reading
FROM   kanji;
