import{_ as a,r,o as s,c,a as e,b as o,d as n,e as i}from"./app-1bbcc8ed.js";const d={},h=e("h1",{id:"ios、android-真机网页调试",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#ios、android-真机网页调试","aria-hidden":"true"},"#"),o(" IOS、Android 真机网页调试")],-1),_=e("p",null,"在开发移动端网页产品时，我们经常会遇到一些问题，比如在某台手机上出现了 bug，但是在其他手机上却没有，Chrome 开发者工具的模拟器也无法复现，这时候我们就需要在真机上调试了。",-1),p=e("p",null,"真机调试网页之所以麻烦，根本原因就是移动端的浏览器没有提供类似于 Chrome 开发者工具的调试工具。",-1),u=e("h2",{id:"spy-debugger",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#spy-debugger","aria-hidden":"true"},"#"),o(" spy-debugger")],-1),m={href:"https://github.com/wuchangming/spy-debugger",target:"_blank",rel:"noopener noreferrer"},g=i('<p>特性：</p><ul><li>无需 USB 连接设备，只需电脑和手机处于同一局域网下，不会侵入到业务代码；</li><li>监控网络请求、支持 HTTPS；</li><li>支持在电脑上直接调试真机网页元素（效果类似 Chrome devtools 的 Elements 面板）；</li><li>在电脑上监控手机上的 console.log 日志，可以在电脑上直接查看，同时支持电脑在 console 中执行代码；</li><li>可以配合其他代理工具一起使用。</li></ul><p>详见官方仓库的 README.md。</p><h2 id="vconsole" tabindex="-1"><a class="header-anchor" href="#vconsole" aria-hidden="true">#</a> vConsole</h2><p>腾讯开源的，轻量级、可扩展的移动网页前端开发工具，也是微信小程序官方的调试工具。</p>',5),b={href:"https://github.com/Tencent/vConsole",target:"_blank",rel:"noopener noreferrer"},f=i('<p>特性：</p><ul><li>日志(Logs)：支持 console.log|info|error|...，使你能够查看和分析前端日志；</li><li>网络(Network)：监测 XMLHttpRequest、Fetch 和 sendBeacon 等网络请求；</li><li>节点(Element)：可查看 HTML 节点树，便于分析 DOM 结构；</li><li>存储(Storage)：支持查看和管理 Cookies、LocalStorage 和 SessionStorage，帮助你处理前端数据存储；</li><li>手动执行 JS 命令行：能够在工具中执行 JavaScript 命令，方便测试和调试；</li><li>自定义插件：支持自定义插件，扩展工具的功能，满足个性化需求；</li><li>需要将插件引入到项目中。</li></ul><p>详见官方仓库的 README.md。</p><h2 id="评论区" tabindex="-1"><a class="header-anchor" href="#评论区" aria-hidden="true">#</a> 评论区</h2>',4);function x(S,v){const t=r("ExternalLinkIcon"),l=r("CommentService");return s(),c("div",null,[h,_,p,u,e("p",null,[e("a",m,[o("Github"),n(t)])]),g,e("p",null,[e("a",b,[o("Github"),n(t)])]),f,n(l)])}const E=a(d,[["render",x],["__file","index.html.vue"]]);export{E as default};