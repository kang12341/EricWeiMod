const UIname = "埃里克卫星";
const UIname1 = "星球模块";

//本文件用于加载UI在游戏中显示，main中try{……}包裹的模块错误信息

function createStableDialog() {
    try {
        // 1. 创建基础对话框
        var dialog = new BaseDialog(UIname);
        dialog.cont.margin(12);
        
        // 2. 使用表格布局（最稳定）
        var mainTable = new Table();
        mainTable.defaults().pad(8);
        
        // 3. 添加标题（简化版）
        var title = new Label(UIname1 + " 状态报告");
        title.setColor(Color.yellow);
        mainTable.add(title).center().row();
        
        // 4. 添加分隔线
        mainTable.image()
            .color(Color.gray)
            .height(2)
            .growX()
            .padBottom(8)
            .row();
        
        // 5. 消息内容（稳定实现）
        var messages = [
 "[green] UI系统初始化完成！任务奖励UI界面一个",
           "⚠ 本界面用于显示错误信息\n:"        
             ];
       

        // 检查是否有错误消息
        if (global.errorMessages && global.errorMessages.length > 0) {
            messages.push("[red]===== 错误记录 =====");
            global.errorMessages.forEach(msg => {
                messages.push("[red]✖ " + msg);
            });
        } else {
            messages.push("[green]无错误记录！");
        }
        
        // 添加消息到表格
        messages.forEach(function(msg) {
            var label = new Label(msg);
            if (msg.includes("⚠")) label.setColor(Color.yellow);
            else if (msg.includes("[red]")) label.setColor(Color.red);
            else if (msg.includes("[green]")) label.setColor(Color.green);
            mainTable.add(label).left().row();
        });
        
        // 6. 创建滚动面板（必须先于动画）
        var scroll = new ScrollPane(mainTable);
        var contentContainer = new Table();
        contentContainer.add(scroll).size(400, 200);
        
        // 7. 添加到对话框（必须在动画前完成）
        dialog.cont.add(contentContainer);
        
        // 8. 动画配置（必须在所有组件添加后）
        contentContainer.actions(
            Actions.sequence(
                Actions.alpha(0),
                Actions.fadeIn(1.5)
            )
        );
        
        // 9. 按钮配置
        var buttonTable = new Table();
        buttonTable.defaults().pad(4);
        
        buttonTable.button("关闭", function() {
            dialog.hide();
        }).size(160, 50);
        
buttonTable.button("复制", function() {
      let copyText = global.errorMessages.join("\n");
      Core.app.setClipboardText(copyText);


 var fuzhixiaoxi=(global.errorMessages&&global.errorMessages.length)?"已复制":"无错误消息";//&&逻辑运算符“与”，（？"内容"："内容"）三元运算符
        
// 在对话框内直接显示临时标签（避免闪退）
      let tempLabel = new Label(fuzhixiaoxi);
      tempLabel.setColor(Color.green);
      dialog.cont.add(tempLabel).row();
      
      // 2秒后移除提示
      Timer.schedule(() => {
          tempLabel.remove();
      }, 2);
                   
      
  }).size(160, 50);
  
  
        dialog.buttons.add(buttonTable);
        dialog.buttons.marginBottom(300);  // 向上移动20像素
        dialog.buttons.row();  // 确保布局生效
        
        return dialog;
        
    } catch(err) {
        Log.err("[UI崩溃] 类型:", typeof err, 
               "\n消息:", err.message || "(无)", 
               "\n堆栈:", err.stack || "(无)");
        return null;
    }
}

// 安全显示流程
function showDialogSafely() {
    Core.app.post(function() {
        try {
            var dialog = createStableDialog();
            if(dialog) {
                dialog.show();
                Log.info("对话框显示成功");
            }
        } catch(e) {
            Log.err("最终显示失败:", e);
        }
    });
}

// 初始化入口
Events.on(EventType.ClientLoadEvent, function() {
    Timer.schedule(showDialogSafely, 0.2);
});
