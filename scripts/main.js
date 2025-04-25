
/// 设置地图编辑器地图尺寸范围
MapResizeDialog.minSize = 0;
MapResizeDialog.maxSize = 5000;

// 加载自定义

require("base/SFlib");
log("sflib代码已执行");

require("base/library");
log("library代码已执行");


// 全局变量，用于存储错误消息
if (!global.errorMessages) {
    global.errorMessages = [];
}

//使用try办法获取代码中的错误信息
try {
    require("星球/埃里克卫"); // 加载星球代码
} catch (error) {
    log("星球模块 加载或执行失败：", error);
    log("已跳过星球模块，继续执行下一个 xxx.js");
    global.errorMessages.push(error.message); // 将错误消息存储到全局变量
}
log("星球代码已执行");

//加载UI，显示获取的错误信息
require("UI"); 