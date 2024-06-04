# StreamLabels-Widgets
*forked from [Zalatis/StreamLabels-alternative](https://github.com/Zalatis/StreamLabels-alternative)*

The [Streamlabels](https://streamlabs.com/dashboard#/streamlabels) application creates txt files that can be added into OBS but the Linux build is only for Debian and I couldn't get it working on Fedora so I found a project using the Streamlabels API to create a rotating widget. I re-wrote the script to remove the animations and create a single, static widget that can pull any StreamLabels file without needing the software installed.

# Installation
- Drop the files into any folder
- Modify `line 2 and 5` of `script.js` with your Tokens from https://streamlabs.com/dashboard#/settings/api-setting
- Modify `line 8` with any filename that would normally be loaded by Streamlabels
- You can change the font with `style.css`
- Add `index.html` as browser source on OBS
