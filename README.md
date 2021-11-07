<h1 align="center">Cloudflare Website Performance Viewer</h1>
<p align="center">
  <img src="https://img.shields.io/github/languages/top/arunesh90/cf-performance-viewer.svg" />
  <img src="https://img.shields.io/github/license/arunesh90/cf-performance-viewer.svg" />
</p>

> Fun small project I made to learn more about Cloudflare Workers, Cloudflare Pages and Azure App Functions. I also used this project to participate in [Cloudflare's Developer Summer Challenge](https://blog.cloudflare.com/developer-summer-challenge/).

[Example report](https://perf-viewer.snoozing.dev/?report=4cfb44f1-272d-4b5a-8792-2f5cfd23e105)
![image](https://user-images.githubusercontent.com/5787588/139612162-1854b67f-763b-4145-9215-d993e8d1424e.png)


## Things used for this project
* Terraform for setting up Azure infrastructure
* Azure App Functions to deploy a Lighthouse instance that the Cloudflare Worker can make use of
* Cloudflare Workers for the main backend that's used by the frontend and sends calls between Fauna and Azure
* Cloudflare's KV Store to store results and reports and to also have the ability to see previous reports 
* Cloudflare Pages for storing and hosting the static frontend

## Author

👤 **Arunesh**

* Twitter: [@arunesh90](https://twitter.com/arunesh90)
* Github: [@arunesh90](https://github.com/arunesh90)
* Discord: Peps#9999

## Show your support

Give a ⭐️ if this project helped you!
