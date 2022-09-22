const getKarmaConfig = require('balena-config-karma');
const packageJSON = require('./package.json');

module.exports = (config) => {
	const karmaConfig = getKarmaConfig(packageJSON);
	karmaConfig.logLevel = config.LOG_INFO;
	// polyfill required for balena-settings-client
	karmaConfig.webpack.resolve.fallback = {
		crypto: require.resolve('crypto-browserify'),
		dns: false,
		fs: false,
		net: false,
		os: require.resolve('os-browserify'),
		path: false,
		stream: require.resolve('stream-browserify'),
		util: require.resolve('util'),
	};
	karmaConfig.webpack.plugins = [
		new getKarmaConfig.webpack.ProvidePlugin({
			// Polyfills or mocks for various node stuff
			process: 'process/browser',
			Buffer: ['buffer', 'Buffer'],
		}),
	];
	karmaConfig.webpack.experiments = {
		asyncWebAssembly: true,
	};

	config.set(karmaConfig);
};
