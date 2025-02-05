
--
--
--
CREATE VIEW vocabulary_by_kanji AS
WITH vocabulary_kanji AS (
   SELECT DISTINCT fn_kanji(headword_bookmark.headword_txt) AS literal
     FROM headword_bookmark
    WHERE headword_bookmark.type = 'kanji'::text
        ), words AS (
         SELECT vocabulary_kanji.literal,
            array_to_string(array_agg(DISTINCT headword_bookmark.headword_txt), '、'::text) AS words
           FROM vocabulary_kanji,
            headword_bookmark
          WHERE headword_bookmark.headword_txt ~~ (('%'::text || vocabulary_kanji.literal) || '%'::text)
          GROUP BY vocabulary_kanji.literal
        )
 SELECT words.literal,
    words.words
   FROM words
     JOIN kanji USING (literal)
  ORDER BY kanji.rank;