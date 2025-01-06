sed '/xml:lang="rus"/d' JMdict | \
  sed '/xml:lang="spa"/d' | \
  sed '/xml:lang="dut"/d' | \
  sed '/xml:lang="fre"/d' | \
  sed '/xml:lang="slv"/d' | \
  sed '/xml:lang="swe"/d' | \
  sed '/xml:lang="ger"/d' | \
  sed '/xml:lang="hun"/d' > JMdict-eng
