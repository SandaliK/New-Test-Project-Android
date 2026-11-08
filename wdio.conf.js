const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const generateAllure = require('allure-commandline');
const allure = require('@wdio/allure-reporter').default;
const config = require('./config/config.json');

exports.config = {
    runner: 'local',

    // Appium server started manually with `appium`
    hostname: config.appium.hostname,
    port: config.appium.port,
    path: config.appium.path,

    specs: ['./test/test-specs/**/*.js'],
    exclude: [],
    maxInstances: 1,

    capabilities: [{
        'wdio:maxInstances': 1,
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': config.device.name,
        'appium:appPackage': config.app.package,
        'appium:appActivity': config.app.activity,
        'appium:newCommandTimeout': 240
    }],

    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    // Start each run with a clean report
    onPrepare() {
        fs.rmSync('allure-results', { recursive: true, force: true });
        fs.rmSync('allure-report', { recursive: true, force: true });
    },

    async beforeTest() {
        await driver.startRecordingScreen();
    },

    // Always stop the recording; attach the screenshot and video only when the test failed
    async afterTest(test, context, { passed }) {
        try {
            const video = await driver.stopRecordingScreen();
            if (!passed) {
                const screenshot = await driver.takeScreenshot();
                allure.addAttachment('Screenshot', Buffer.from(screenshot, 'base64'), 'image/png');
                allure.addAttachment('Video', Buffer.from(video, 'base64'), 'video/mp4');
            }
        } catch (error) {
            console.warn(`Could not capture failure evidence: ${error.message}`);
        }
    },

    // Build the Allure report as one HTML file and open it in the browser (skipped when CI is set).
    // A single file needs no server, so no terminal window stays open.
    async onComplete() {
        await new Promise(resolve => {
            generateAllure(['generate', 'allure-results', '--clean', '--single-file', '-o', 'allure-report'])
                .on('exit', resolve);
        });
        if (!process.env.CI) {
            const [command, ...args] = {
                win32: ['cmd', '/c', 'start', ''],
                darwin: ['open'],
                linux: ['xdg-open']
            }[process.platform];
            spawn(command, [...args, path.resolve('allure-report', 'index.html')], {
                detached: true,
                stdio: 'ignore',
                windowsHide: true
            }).unref();
        }
    }
};
