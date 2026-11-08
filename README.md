# Android Automation Project with WebDriverIO + Appium

This project automates Android mobile app testing using WebDriverIO and Appium with the UiAutomator2 driver.

## Tools used

- Node.js 22+ - required by the current WebDriverIO package versions
- Java JDK 17 - required by Android tools and Appium
- Android SDK - provides adb, emulator, platform tools
- Appium - starts the mobile automation server
- Appium UiAutomator2 driver - Android automation driver
- WebDriverIO - test runner and automation framework
- Allure - test reporting
- VS Code + AI-assisted workflow - used for project structure generation and iterative test prompting

## Why these tools

### Node.js
WebDriverIO is built on top of Node.js. It provides the test runner, Mocha framework, and runtime dependencies used to execute automation scripts.

### Java JDK
Appium and Android tooling depend on Java. The Android SDK and emulator tools require a compatible JDK to work correctly.

### Android SDK
The SDK provides Android command-line tools such as adb and emulator. These are required to detect devices and install apps.

### Appium
Appium exposes the Android device to the automation framework and allows WebDriverIO to interact with app elements.

### UiAutomator2
UiAutomator2 is the Android automation driver used by Appium for modern Android devices and emulators.

### WebDriverIO
WebDriverIO handles the automation logic, test execution, waits, assertions, and reporting integration.

### Allure
Allure is used to generate a readable HTML report and capture screenshots/video attachments on failed tests.

## Prerequisites

Before running the tests, install:

- Node.js 22 or newer
- JDK 17
- Android Studio with Android SDK
- Appium
- UiAutomator2 driver
- Android emulator or real device
- Git

> Important: the current WebDriverIO dependency set is not compatible with Node 18. The project was validated to fail under Node 18 with an invalid regular expression runtime error, so Node 22+ is recommended.

## Environment setup

### 1) Install Node.js
Download and install Node.js 22 LTS or newer.

Check versions:

```bash
node -v
npm -v
```

### 2) Install Java JDK
Install JDK 17 and set JAVA_HOME.

Windows PowerShell:

```powershell
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
$env:Path += ";$env:JAVA_HOME\bin"
```

Verify:

```bash
java -version
```

### 3) Install Android SDK
Install Android Studio and Android SDK.

Set environment variables:

```powershell
$env:ANDROID_HOME = "C:\Users\<YourUser>\AppData\Local\Android\Sdk"
$env:ANDROID_SDK_ROOT = "C:\Users\<YourUser>\AppData\Local\Android\Sdk"
$env:Path += ";$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\emulator;$env:ANDROID_HOME\cmdline-tools\latest\bin"
```

Check tools:

```bash
adb version
emulator -version
```

### 4) Install Appium

```bash
npm install -g appium
```

Verify:

```bash
appium --version
```

### 5) Install Android driver

```bash
appium driver install uiautomator2
```

### 6) Start Android emulator
Create or start an Android emulator in Android Studio, or use a real device connected via USB.

Check devices:

```bash
adb devices
```

The project is configured to use a device named `emulator-5554` in the config file.

### 7) Start Appium server

```bash
appium
```

Appium is expected to run on:

- Host: `127.0.0.1`
- Port: `4723`
- Path: `/`

## APK placement

The project keeps the APK in the local `apps` folder for local automation use.

```text
apps/
```

Example:

```text
apps/
  myapp.apk
```

The APK is intentionally not tracked in Git because GitHub rejects files larger than 100 MB. The repository ignores APKs via `.gitignore`.

This means:

- put the APK locally in the `apps` folder
- do not commit `.apk` files to Git
- keep only a placeholder file like `.gitkeep` in the repo if needed

## Project structure

```text
.
├── .env.example               # Example environment variables
├── .gitignore                 # Ignores local-only files and APKs
├── apps/
│   └── .gitkeep               # Keeps the folder in Git without committing an APK
├── config/
│   ├── config.json            # Device and Appium configuration
│   └── credentials.js
├── resources/
│   ├── test-data/
│   │   ├── messages.json
│   │   └── users.json
│   └── ui-locators/
│       ├── common.locators.js
│       ├── forms.locators.js
│       └── login.locators.js
├── test/
│   ├── pages/
│   │   ├── base.page.js
│   │   ├── forms.page.js
│   │   └── login.page.js
│   ├── test-specs/
│   │   ├── forms.spec.js
│   │   ├── login.spec.js
│   │   └── signup.spec.js
│   └── utils/
│       └── step.js
├── allure-report/             # Generated HTML report output
├── allure-results/            # Raw Allure result files
├── package.json               # NPM script definitions
├── package-lock.json
├── wdio.conf.js               # WebDriverIO + Appium configuration
└── README.md
```

## Install dependencies

```bash
npm install
```

## Run the tests

Start the Appium server first:

```bash
appium
```

Then run the suite:

```bash
npm test
```

## Allure report

Generate the report:

```bash
npm run report:generate
```

Open the report:

```bash
npm run report:open
```

## GitHub upload note

This project intentionally ignores APK files because GitHub has a 100 MB file-size limit for normal Git pushes. A mobile APK is often larger than that and would be rejected by the remote.

Recommended repository pattern:

- keep the APK locally in `apps/`
- track only `apps/.gitkeep` in Git
- ignore `*.apk` in `.gitignore`

## AI-assisted workflow

This project was developed with an AI-assisted workflow using Claude Code and iterative prompt-based generation. The process included:

1. Providing the project structure
2. Describing the intended test scenarios
3. Generating the base automation files
4. Reviewing the generated selectors and flows
5. Updating the implementation to match the app behavior

This approach accelerates setup while keeping human validation in the loop.

## Notes

- The project expects an Android emulator or device to be running before `npm test` is executed.
- The app package and activity are configured in `config/config.json`.
- The APK should be dropped into the local `apps` directory before execution.
