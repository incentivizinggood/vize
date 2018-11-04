#!/bin/bash

pipetty flow --show-all-errors |
	tee /dev/tty |
	ansi2html > flow.html &&
	sed -i 's/<head>/<head>\n<meta charset="UTF-8">/g' flow.html
flow stop