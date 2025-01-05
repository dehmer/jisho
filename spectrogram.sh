say -v "Kyoko (Enhanced)" "$1" -o $1.aif
sox $1.aif -n spectrogram -o $1.png
open $1.png
