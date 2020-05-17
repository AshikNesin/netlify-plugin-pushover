# Netlify Pushover Deploy Plugin
After a successful/error build send  real-time notifications to your Android, iPhone, iPad, and Desktop via [Pushover](http://pushover.net)

## Usage
Add the following lines to your netlify.toml configuration file:

[[plugins]]
package = "netlify-build-plugin-pushover"

Note: The [[plugins]] line is required for each plugin, even if you have other plugins in your netlify.toml file already.


## Reference
- [netlify-build-plugin-speedcurve](https://github.com/tkadlec/netlify-build-plugin-speedcurve)
