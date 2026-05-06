
--
-- Collation for natural sort.
-- Treat digits numerically and ignore punctuation.
--
-- Example:

/*
    SELECT *
    FROM   kanji_tag
    WHERE  key = 'reference:kanken' -- or 'reference:moro'
    ORDER  BY value COLLATE "und-u-ka-shifted-kn-x-icu";
*/

CREATE COLLATION "und-u-ka-shifted-kn-x-icu" (
  provider = icu,
  deterministic = false,
  locale = 'und-u-ka-shifted-kn'
);
