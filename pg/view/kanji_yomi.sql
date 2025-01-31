
--
--
--
CREATE VIEW kanji_yomi AS
WITH yomi AS (
  SELECT  literal COLLATE "ja-JP-x-icu",
          strokes,
          unnest(
            array_cat(
              string_to_array(onyomi, ', '),
              string_to_array(kunyomi, ', ')
           )
         ) COLLATE "ja-JP-x-icu" AS yomi
  FROM   kanji
)
SELECT literal,
       yomi,
       strokes,
       regexp_replace(yomi, '[.-]', '', 'g')
         COLLATE "ja-JP-x-icu"
         AS "order"
FROM   yomi;
