---
layout: post
title:  "Linux Commands"
categories: jekyll
permalink: /blog/:year/:month/:day/:title
author: Alec Roques
---

https://askubuntu.com/questions/339015/what-does-mean-in-a-linux-command Explains "{}" \;
find .-name "*test.txt" -exec rm -rf "{}" \; remove all files in a folder
find . -name  '*.txt' -exec cat {} \;

grep -ER "polls" .

https://www.digitalocean.com/community/tutorials/the-basics-of-using-the-sed-stream-editor-to-manipulate-text-in-linux
sed -i 's/polls/superpolls/g' *.py


find / -type f -name '*org.eclipse*' 2>&1 | grep -v "Permission denied" | grep org.eclipse

find / -type f -name '*org.eclipse*' -delete

sudo find /home/alec/.p2 -name '*org.eclipse*' -exec rm -rf {} \;
