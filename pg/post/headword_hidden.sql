
--
--
--
ALTER TABLE headword ADD COLUMN hidden bool NOT NULL DEFAULT false;

--
-- Hide outdated or otherwise unusual kana/kanji headwords.
--
WITH hidden AS (
  SELECT seq_no, idx
  FROM   headword
  JOIN   headword_tag USING (seq_no, idx)
  WHERE  key = 'inf'
  AND    value IN (
           'sk', -- search-only kana form
           'sK', -- search-only kanji form
           'rK', -- rarely-used kanji form
           'ok', -- out-dated or obsolete kana usage
           'oK', -- word containing out-dated kanji or kanji usage
           'ik', -- word containing irregular kana usage
           'iK'  -- word containing irregular kanji usage
         )
)
UPDATE headword
SET    hidden = true
WHERE  (seq_no, idx) IN (SELECT * FROM hidden);
