
--
-- Kanji components for bookmarked (kanji) headwords.
--
CREATE VIEW kanji_by_component AS
WITH kanji AS (
	SELECT DISTINCT
	         kanji_txt,
	         fn_kanji(kanji_txt) AS literal
	FROM   headword_bookmark
	ORDER BY 1, 2
), parts AS (
	SELECT DISTINCT
           radical,
           kanji.literal,
           value AS meaning
	FROM   kanji
	JOIN   krad USING (literal)
	JOIN   headword_kanji ON headword_kanji.kanji_txt = radical
	JOIN   kanji_meaning ON kanji_meaning.literal = headword_kanji.kanji_txt
	WHERE  krad.literal <> krad.radical
	AND    LANGUAGE = 'en'
	ORDER  BY 1, 2
)
SELECT radical, array_to_string(array_agg(literal), ', '), meaning
FROM   parts
GROUP  BY radical, meaning;
