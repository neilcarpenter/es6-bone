class ImageLoader {

	static load(src) {

		const dfd = $.Deferred();
		const img = new Image();
		img.onload = () => {
			dfd.resolve(img);
		}
		img.src = src;

		return dfd;

	}

	static loadSet(set) {

		const loaders = []
		set.forEach( (item) => {
			loaders.push(ImageLoader.load(item).promise());
		});

		$.when.apply(null, loaders);

	}

}

export default ImageLoader;
