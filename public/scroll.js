switch (document.body.id) {
	case 'scroll1':
		document.addEventListener('wheel', function(e) {
			if (e.deltaY > 0) {
				fetch('/scroll2.html').then(function(res) {
					res.text().then(function(html) {
						document.open();
						document.write(html);
						document.close();
					});
				});
			}
		});
		break;
	case 'scroll2':
		document.addEventListener('wheel', function(e) {
			if (e.deltaY < 0) {
				fetch('/scroll1.html').then(function(res) {
					res.text().then(function(html) {
						document.open();
						document.write(html);
						document.close();
					});
				});
			} else {
				fetch('/scroll3.html').then(function(res) {
					res.text().then(function(html) {
						document.open();
						document.write(html);
						document.close();
					});
				});
			}
		});
		break;
	case 'scroll3':
		document.addEventListener('wheel', function(e) {
			if (e.deltaY < 0) {
				fetch('/scroll2.html').then(function(res) {
					res.text().then(function(html) {
						document.open();
						document.write(html);
						document.close();
					});
				});
			}
		});
		break;
}