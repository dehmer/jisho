
--
-- headword usually written in kana alone.
--
CREATE VIEW headword_uk AS
SELECT DISTINCT seq_no
FROM   meaning_tag
WHERE  key = 'misc'
AND    value = 'uk';
