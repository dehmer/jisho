
--
--
--
CREATE VIEW tag_v5 AS
SELECT DISTINCT key, value, description
FROM   meaning_tag
JOIN   entity USING (key, value)
WHERE  key = 'pos'
AND    value ~ 'v5.*';
