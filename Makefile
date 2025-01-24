NAME = jisho
VERSION = $(shell cat .version)
SCRIPT = $(NAME)--$(VERSION).sql

$(SCRIPT): \
	pg/table/bookmark.sql \
	pg/table/entity.sql \
	pg/table/kanji.sql \
	pg/table/kanji_tag.sql \
	pg/table/kanji_meaning.sql \
	pg/table/radical.sql \
	pg/table/radical_variant.sql \
	pg/table/sentence.sql \
	pg/table/translation.sql \
	pg/table/token.sql \
	pg/table/headword.sql \
	pg/table/headword_tag.sql \
	pg/table/meaning.sql \
	pg/table/meaning_tag.sql \
	pg/function/fn_kanji.sql \
	pg/function/fn_literal.sql \
	pg/function/fn_seq_no.sql \
	pg/data/kanji.sql \
	pg/data/kanji_tag.sql \
	pg/kanji/tag_joyjo.sql \
	pg/kanji/tag_jinmeiyo.sql \
	pg/view/headword_common.sql \
	pg/view/headword_kanji.sql \
	pg/view/headword_reading.sql \
	pg/data/jlpt_shirabe.sql \
	pg/data/kanji_meaning.sql \
	pg/data/radical.sql \
	pg/data/radical_variant.sql \
	pg/data/sentence.sql \
	pg/data/translation.sql \
	pg/data/token.sql \
	pg/data/headword.sql \
	pg/data/headword_tag.sql \
	pg/data/meaning.sql \
	pg/data/meaning_tag.sql
	cat $^ > $@

pg/data/kanji.sql \
pg/data/kanji_tag.sql \
pg/data/kanji_meaning.sql \
pg/data/radical.sql \
pg/data/radical_variant.sql:
	bin/kanjidic2.js

pg/data/headword.sql \
pg/data/headword_tag.sql \
pg/data/meaning.sql \
pg/data/meaning_tag.sql:
	bin/JMdict.js

pg/data/jlpt_shirabe.sql:
	bin/jlpt_shirabe.js

pg/data/sentence.sql pg/data/translation.sql:
	bin/sentence.js

pg/data/token.sql:
	bin/mecab.js

.PHONY: clean
clean:
	rm -f pg/data/*.sql
	rm -f ${SCRIPT}
