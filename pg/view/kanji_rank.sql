
--
-- 1. kanken    - 1 through 12    (4-bit), fallback 15
-- 2. frequency - 1 through 2500 (12-bit), fallback 4095
-- 3. radical   - 1 through 214   (8-bit)
-- 4. strokes   - 1 through 34    (6-bit)
--
CREATE VIEW kanji_rank AS
SELECT    literal,
          (
            ((COALESCE(kanken.index, 15))::bit(30) << (12 + 8 + 6))
          | ((COALESCE(frequency, 4095))::bit(30) << (8 + 6))
          | (radical::bit(30) << (6))
          | (strokes::bit(30))
          )::int AS rank
FROM      kanji
LEFT JOIN kanken USING (literal);
