import webpack from 'webpack'; // Import webpack module

/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    // Optional: Add a trailing slash to all paths `/about` -> `/about/`
    // trailingSlash: true,
    // Optional: Change the output directory `out` -> `dist`
    // distDir: 'dist',
    webpack: (config, {isServer}) => {
        if (!isServer) {
            config.resolve = {
                ...config.resolve,
                fallback: {
                    // fixes proxy-agent dependencies
                    net: false,
                    dns: false,
                    tls: false,
                    assert: false,
                    // fixes next-i18next dependencies
                    path: false,
                    fs: false,
                    // fixes mapbox dependencies
                    events: false,
                    // fixes sentry dependencies
                    process: false
                }
            };
        }
        config.plugins.push(new webpack.NormalModuleReplacementPlugin(/node:/, (resource) => {
            resource.request = resource.request.replace(/^node:/, "");
        }))

        return config
    },
};

export default nextConfig;
