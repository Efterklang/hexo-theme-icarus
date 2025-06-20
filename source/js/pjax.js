(function() {
    // eslint-disable-next-line no-unused-vars
    let pjax;

    function initPjax() {
        try {
            const Pjax = window.Pjax || function() {};
            pjax = new Pjax({
                selectors: [
                    '[data-pjax]',
                    '.pjax-reload',
                    'head title',
                    '.columns',
                    '.navbar-start',
                    '.navbar-end',
                    '.searchbox link',
                    '.searchbox script',
                    '#back-to-top',
                    '#comments link',
                    '#comments script'
                ],
                cacheBust: false
            });
        } catch (e) {
            console.warn('PJAX error: ' + e);
        }
    }

	document.addEventListener('pjax:complete', () => {
		// Plugin [MathJax] reload logic
		if (window.MathJax) {
			try {
				window.MathJax.typesetPromise && window.MathJax.typesetPromise();
			} catch (e) {
				console.error('MathJax reload error:', e);
			}
		}
		// Plugin [Busuanzi] reload logic
		if (window.bszCaller && window.bszTag) {
			window.bszCaller.fetch('//busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback', a => {
				window.bszTag.texts(a);
				window.bszTag.shows();
			});
        }
        mediumZoom('.article img', {
            background: 'rgba(30, 30, 46, 0.5)',
        });
		// TODO pace stop loading animation
	});

    document.addEventListener('DOMContentLoaded', () => initPjax());
}());
