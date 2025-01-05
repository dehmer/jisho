NAME = jisho
VERSION = $(shell cat .version)
SCRIPT = $(NAME)--$(VERSION).sql

$(SCRIPT): \
	pg/table_kanji.sql \
	pg/table_kanji_tag.sql \
	pg/table_kanji_meaning.sql \
	pg/table_radical.sql \
	pg/table_radical_variant.sql \
	pg/table_sentence.sql \
	pg/table_translation.sql \
	pg/table_token.sql \
	pg/data_kanji.sql \
	pg/data_kanji_tag.sql \
	pg/kanji_tag_joyjo.sql \
	pg/kanji_tag_jinmeiyo.sql \
	pg/data_jlpt_shirabe.sql \
	pg/data_kanji_meaning.sql \
	pg/data_radical.sql \
	pg/data_radical_variant.sql \
	pg/data_sentence.sql \
	pg/data_translation.sql \
	pg/data_token.sql
	cat $^ > $@

pg/data_kanji.sql pg/data_kanji_tag.sql pg/data_kanji_meaning.sql pg/data_radical.sql pg/data_radical_variant.sql:
	bin/kanjidic2.js

pg/data_jlpt_shirabe.sql:
	bin/jlpt_shirabe.js

pg/data_sentence.sql pg/data_translation.sql:
	bin/sentence.js

pg/data_token.sql:
	bin/mecab.js

.PHONY: clean
clean:
	rm -f pg/data_*.sql
	rm -f ${SCRIPT}
