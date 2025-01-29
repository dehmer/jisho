
--
-- Create bookmarks from kanji/vocabulary decks.
--
CREATE TABLE bookmark AS
SELECT 'headword:' || seq_no || '/' || idx AS key,
       deck_key AS tag_key,
       deck_value AS tag_value
FROM   deck
JOIN   headword ON headword.headword_txt = reading_txt
WHERE  deck.type = 'vocabulary'
AND    kanji_txt IS NULL
UNION
SELECT 'headword:' || seq_no || '/' || idx AS key,
       deck_key AS tag_key,
       deck_value AS tag_value
FROM   deck
JOIN   headword ON headword.headword_txt = kanji_txt
WHERE  deck.type = 'vocabulary'
AND    kanji_txt IS NOT NULL
UNION
SELECT 'kanji:' || kanji_txt AS key,
       deck_key AS tag_key,
       deck_value AS tag_value
FROM   deck
WHERE  type = 'kanji';
