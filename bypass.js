// This script is purely for educational use. Any consequences or damages arising from the usage of it in an illegal 
// or unethical way are purely the fault of the end-user, and in no way is the developer responsible for it.

const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const ua = require('fake-useragent');

class PreLaunch {
    constructor() {
        this.userAgentList = [
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
            "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
            "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36"
        ];
    }

    async generateUserAgent() {
        try {
            return ua['google chrome']();
        } catch (error) {
            return this.userAgentList[Math.floor(Math.random() * this.userAgentList.length)];
        }
    }

    async replaceUserAgent(driver) {
        const userAgent = await driver.executeScript('return navigator.userAgent');
        const modifiedUserAgent = userAgent.replace('Headless', '');
        await driver.executeCdpCommand('Network.setUserAgentOverride', { userAgent: modifiedUserAgent });
        return driver;
    }

    async driverNavigator(driver) {
        const isWebdriverPresent = await driver.executeScript('return navigator.webdriver');
        
        if (isWebdriverPresent) {
            await driver.executeCdpCommand('Page.addScriptToEvaluateOnNewDocument', {
                source: `
                    Object.defineProperty(window, 'navigator', {
                        value: new Proxy(navigator, {
                            has: (target, key) => (key === 'webdriver' ? false : key in target),
                            get: (target, key) =>
                                key === 'webdriver'
                                ? undefined
                                : typeof target[key] === 'function'
                                ? target[key].bind(target)
                                : target[key]
                        })
                    });
                `,
            });
        }

        return driver;
    }
}
