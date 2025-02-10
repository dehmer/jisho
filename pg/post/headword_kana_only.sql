
--
--
--
ALTER TABLE headword_reading ADD COLUMN kana_only bool NOT NULL DEFAULT false;
ALTER TABLE headword_kanji   ADD COLUMN kana_only bool NOT NULL DEFAULT false;
UPDATE headword_reading SET kana_only = true WHERE (seq_no, idx) IN (SELECT * FROM headword_kana_only);
UPDATE headword_kanji   SET kana_only = true WHERE (seq_no, idx) IN (SELECT * FROM headword_kana_only);
