module.exports = {
	transformer: {
		getTransformOptions: async () => ({
			transform: {
				experimentalImportSupport: false,
				inlineRequires: false,
			},
		}),
	},
	resolver: {
		assetExts: ["bin", "txt", "jpg", "ttf", "png"],
		sourceExts: ["js", "json", "ts", "tsx", "jsx"],
	},
};
