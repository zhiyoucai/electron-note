# 利用Remote模块学习多进程通信

## 1. Electron应用架构

Electron是基于Chromium的，同样也就继承了Chromium的多进程结构，Electron的进程分为主进程和渲染进程。

下面这个图是Chromium的进程模型，贴出来便于理解Electron的多进程以及多进程间的通信：

![Chromium架构图](https://wx1.sinaimg.cn/mw690/5fec9ab7ly1gcazqs7fmfj20jg0i1myp.jpg)

可以看出来Chromium架构有一个主进程，这个主进程我们可以理解成我们能看到的窗口，另外有Render进程，可以理解成各个选项卡。

Main进程和Render进程之间通过ipc进行通信，有专门的模块负责处理IPC。因此在Electron的官方文档中首先提及的进程间通信方式就是IPC通信。

在package.json中会规定main进程加载的js文件。当我们启动主进程之后，主进程就会加载这个js文件，如果我们不在js中声明要加载的页面，就会在系统托盘中出现一个Electron的图标，这就代表主进程启动了。

有主进程就有渲染进程，根据官方文档的介绍，每一个新建的web页面都会运行在一个渲染进程中。这也就是说在创建web页面的时候，也就创建了一个渲染进程。主进程会管理所有被创建出来的web页面和他们对应的渲染进程，而渲染进程之间则是独立存在的。

## 2. 利用remote创建dialog

官方介绍了两种方式去进行进程间通信，可以使用ipcRender和ipcMain模块，也可以使用remote。

remote是一种通过RPC方式通信的办法。一些模块，比如说dialog，渲染进程中实际上是没有办法使用的，这时利用remote就可以了，这一点类似Java的RMI。

渲染进程是没有办法加载dialog模块的，但是有时候需要渲染进程去做这些事情。比如我们加载了一个页面，这个页面上所有的按钮的事件函数都被写在渲染进程的js中，按钮的功能是打开对话框。

这就要求我们的渲染进程能够打开dialog模块了。

比如渲染进程要加载的js文件中，我们可以这样写：

```javascript
const remote = require('electron').remote
const dialog = remote.dialog

function show_alert() {
    dialog.showErrorBox('告警', '测试告警')
}
```

至于ipc通信，到现在为止还没有完全掌握，以后再说。