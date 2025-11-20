(function () {
	// eslint-disable-next-line no-unused-vars
	let pjax;

	function initPjax() {
		try {
			const Pjax = window.Pjax || function () { };
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
		// Fix column layout after pjax loaded
		document.body.className = document.body.className.replace(/is-\d-column/g, '');
		const left = document.querySelector('.column-left');
		const right = document.querySelector('.column-right');
		let count = 1;
		if (left && right) {
			count = 3;
		} else if (left || right) {
			count = 2;
		}
		document.body.classList.add('is-' + count + '-column');

		if (typeof Icarus_column_resize === 'function') {
			Icarus_column_resize();
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
