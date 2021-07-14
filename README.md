# Carbon Trigger Browser Extension

[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/justintungonline/carbon-trigger-extension/tree/start)

Huge props to Adebola who build a useful [extension](https://github.com/onedebos/covtension) for Chrome and Edge to track COVID country by country via API calls. He wrote an excellent [article](https://blog.adebola.dev/how-to-build-a-chrome-extension-that-makes-api-calls/) about it.

I have taken this code and edited it to work with tmrow's API to track electricity usage, so that you can have a reminder right in your browser about how heavy your region's electricity usage is, and to make judgement calls on your activities based on this information.

![extension screenshot](extension-screenshot.png)

## Students! If you're building this during a workshop, start on the _start_ branch!

## Getting Started

To get a local copy of this extension up and running follow these steps.

-   git clone the repo

```
git clone https://github.com/jlooper/carbontrigger && cd carbontrigger
```

-   Install all the required packages with

```
npm install
```

-   Build from webpack

```
npm run build
```

To install on Edge, use the 'three dot' menu on the top right corner of the browser to find the Extensions panel. From there, select 'Load Unpacked' to load a new extension. Open the 'dist' folder at the prompt and the extension will load. To use it, you will need an API key for CO2 Signal's API ([get one here via email](https://www.co2signal.com/) - enter your email in the box on this page) and the [code for your region](http://api.electricitymap.org/v3/zones) corresponding to the [Electricity Map](https://www.electricitymap.org/map) (in Boston, for example, I use 'US-NEISO'). 

![installing](install-on-edge.png)

Once the API key and region is input into the extension interface, the colored dot in the browser extension bar should change to reflect your region's energy usage and give you a pointer on what energy-heavy activities would be appropriate for you to perform. The concept behind this 'dot' system was given to me by the [Energy Lollipop extension](https://energylollipop.com/) for California emissions.

