Output demo/convert-md-to-pdf.gif

Require convert-md-to-pdf

Set Shell "bash"
Set Framerate 60
Set FontSize 12
Set Width 800
Set Height 400
Set Padding 20
Set Margin 5
Set MarginFill "#212830"
Set BorderRadius 10

Hide
Type 'cd /tmp/convert-md-to-pdf-demo && clear' Enter
Show

Type "convert-md-to-pdf --list-themes" Sleep 200ms Enter
Wait Sleep 1500ms

Enter Enter Type "# convert Markdown to a styled PDF using the nord theme" Sleep 200ms Enter Enter
Wait Sleep 800ms

Type "convert-md-to-pdf sample.md -t nord" Sleep 500ms Enter
Wait Sleep 1500ms

Type "ls *.pdf" Sleep 200ms Enter
Wait Sleep 1500ms

Sleep 3s
