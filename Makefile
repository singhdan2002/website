push-pages: src/
	git subtree split --prefix src -b gh-pages 
	git push -f origin gh-pages:gh-pages 
	git branch -D gh-pages
