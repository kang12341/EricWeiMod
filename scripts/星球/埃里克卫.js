//定义新星球
const SFlib = require("base/SFlib");

const 埃里克卫 = new Planet("埃里克卫", Planets.erekir, 1, 2.5);//erekir埃里克尔环绕对象，1是放大系数，2.5星球区块大小
埃里克卫.meshLoader = prov(() => new MultiMesh(
	new HexMesh(埃里克卫, 6)//网格密度
));

埃里克卫.cloudMeshLoader = prov(() => new MultiMesh(
	new HexSkyMesh(埃里克卫, 2, 0.15, 0.14, 6, Color.valueOf("F4A46080"), 2, 0.42, 1, 0.43),
	new HexSkyMesh(埃里克卫, 3, 0.6, 0.15, 6, Color.valueOf("F4A460FF"), 2, 0.42, 1.2, 0.45)
));//星球云层，大气层颜色



//星球属性

埃里克卫.generator = new 
ErekirPlanetGenerator();//Erekir,埃里克尔地形生成


埃里克卫.visible = 埃里克卫.accessible = 埃里克卫.alwaysUnlocked =  true;//始终可见访问
埃里克卫.clearSectorOnLose = false;//战败清空区当前区域
埃里克卫.tidalLock = false;//是否启用潮汐锁定


埃里克卫.defaultAttributes.set(Attribute.heat, 0.8);//星球热量
埃里克卫.defaultEnv = Env.scorching | Env.terrestrial; //默认环境 灼热+类地行星
埃里克卫.updateLighting = false;  // 禁用动态光照更新
埃里克卫.lightSrcTo = 0.5;  // 光源终点强度
埃里克卫.lightDstFrom = 0.2;  // 光照起始距离

埃里克卫.allowLaunchToNumbered = false; //是否发射到编号区域。
埃里克卫.defaultCore = Blocks.coreBastion; //默认核心建筑

埃里克卫.localizedName = "埃里克卫";
埃里克卫.prebuildBase = true;//开局是否预建基地
埃里克卫.bloom = false;//是否启用光晕效果
埃里克卫.startSector = 64;//起始区块编号
埃里克卫.orbitRadius = 5;//环绕对象半径
埃里克卫.orbitTime = 180 * 60;
埃里克卫.rotateTime = 90 * 60;
埃里克卫.atmosphereRadIn = 0.02;
埃里克卫.atmosphereRadOut = 0.3;
埃里克卫.atmosphereColor = 埃里克卫.lightColor = Color.valueOf("D2690090");//大气颜色光效
埃里克卫.hiddenItems.addAll(Items.serpuloItems).removeAll(Items.erekirItems);//隐藏s物品，保留e物品
埃里克卫.iconColor = Color.valueOf("E28654FF");//星球图标颜色
exports.埃里克卫 = 埃里克卫;

//——————————————
//指定一个星球与一个物品实例，创建科技树根节点
function createRootNode() {
    // 获取星球实例，这里需要星球已经通过某种方式注册并可以访问
    var myPlanet = 埃里克卫

    // 创建根节点
    var rootNode = TechTree.nodeRoot(
    "埃里克卫",
    CoreBlock("埃里克卫核心"), 
    true, 
    function(){ });

    // 将根节点与星球关联
    rootNode.planet = myPlanet;

    // 将根节点添加到科技树中
    TechTree.all.add(rootNode);
}

// 调用函数创建根节点
createRootNode();


//分割线——————————————————————

//战役区块定义

const 着陆地区 = new SectorPreset("着陆地区", 埃里克卫, 64);//名称，所属，区域编号
着陆地区.description = "我们选择了一个敌人偏远的区块进行突降，探索这个地区！";
着陆地区.difficulty = 2;//难度
着陆地区.alwaysUnlocked = true;//始终解锁
着陆地区.addStartingItems = true;//起始物资
着陆地区.captureWave = 0;//无需防守波次
着陆地区.localizedName = "着陆地区-64";
exports.着陆地区 = 着陆地区;//导出
SFlib.addToResearch(着陆地区, {
	parent: "埃里克卫核心",//父节点
	objectives: Seq.with(
	new Objectives.SectorComplete(SectorPresets.lake))//解锁条件，是否进攻过lake
});


const 芳溪山谷 = new SectorPreset("芳溪山谷", 埃里克卫, 15);
芳溪山谷.description = "我们侦测到这个山谷隐藏有芳油溪流，但这里的敌人防御十分坚固，利用这里的资源生产高级单位夺下这个地区！";
芳溪山谷.difficulty = 4;
芳溪山谷.alwaysUnlocked = false;
芳溪山谷.addStartingItems = true;
芳溪山谷.captureWave = 0;
芳溪山谷.localizedName = "芳溪山谷-15";
exports.芳溪山谷 = 芳溪山谷;
SFlib.addToResearch(芳溪山谷, {
	parent: "着陆地区",//是否可被解锁（显示）条件父节点
	objectives: Seq.with(
	new Objectives.SectorComplete(着陆地区))
});//解锁前置条件，检查是否占领（）。


const 完22区 = new SectorPreset("完22区", 埃里克卫, 22);
完22区.description = "这个地区的敌人依托岩浆建立基地，陆军单位进攻十分困难，生产空中单位进攻，需注意敌人空中单位！";
完22区.difficulty = 4;
完22区.alwaysUnlocked = false;
完22区.addStartingItems = true;
完22区.captureWave = 0;
完22区.localizedName = "岩熔地区-22";
exports.完22区 = 完22区;
SFlib.addToResearch(完22区, {
	parent: "芳溪山谷",
	objectives: Seq.with(
	new Objectives.SectorComplete(芳溪山谷))
});

const 完73区 = new SectorPreset("完73区", 埃里克卫, 73);
完73区.description = "大量的岩浆使得陆地单位几乎失去作用！使用质驱运输资源，小心空袭！";
完73区.difficulty = 4;
完73区.alwaysUnlocked = false;
完73区.addStartingItems = true;
完73区.captureWave = 0;
完73区.localizedName = "熔浆半岛-73";
exports.完73区 = 完73区;
SFlib.addToResearch(完73区, {
	parent: "完22区",
	objectives: Seq.with(
	new Objectives.SectorComplete(完22区))
});

const 完54区 = new SectorPreset("完54区", 埃里克卫, 54);
完54区.description = "我们从敌人基地探测到多种单位生产工厂，建造防线抵御敌人多兵种协同进攻";
完54区.difficulty = 4;
完54区.alwaysUnlocked = false;
完54区.addStartingItems = true;
完54区.captureWave = 0;
完54区.localizedName = "纵横山脉-54";
exports.完54区 = 完54区;
SFlib.addToResearch(完54区, {
	parent: "芳溪山谷",
	objectives: Seq.with(
	new Objectives.Research(完22区))
});//解锁前置条件，检查是否占领进攻过（）

const 完63区 = new SectorPreset("完63区", 埃里克卫, 63);
完63区.description = "这个地区侦测到大量敌人单位生产工厂，尽快攻占敌人核心！";
完63区.difficulty = 4;
完63区.alwaysUnlocked = false;
完63区.addStartingItems = true;
完63区.captureWave = 0;
完63区.localizedName = "荒沙盆地-63";
exports.完63区 = 完63区;
SFlib.addToResearch(完63区, {
	parent: "完54区",
	objectives: Seq.with(
	new Objectives.SectorComplete(完54区))
});


const 完19区 = new SectorPreset("完19区", 埃里克卫, 19);
完19区.description = "敌人防御十分坚固，使用质驱运输开采的钍，以生产高级单位进攻，但需注意敌人空中单位袭击";
完19区.difficulty = 6;
完19区.alwaysUnlocked = false;
完19区.addStartingItems = true;
完19区.captureWave = 0;
完19区.localizedName = "峭壁沙峰-19";
exports.完19区 = 完19区;
SFlib.addToResearch(完19区, {
	parent: "完73区",
	objectives: Seq.with(
	new Objectives.SectorComplete(完73区))
});

const 完21区 = new SectorPreset("完21区", 埃里克卫, 21);
完21区.description = "尽快攻占敌人前哨核心以开采高级资源，注意防范敌人多兵种进攻";
完21区.difficulty = 6;
完21区.alwaysUnlocked = false;
完21区.addStartingItems = true;
完21区.captureWave = 0;
完21区.localizedName = "熔油前线-21";
exports.完21区 = 完21区;
SFlib.addToResearch(完21区, {
	parent: "完19区",
	objectives: Seq.with(
	new Objectives.Research(完19区))
});



const 完50区 = new SectorPreset("完50区", 埃里克卫, 50);
完50区.description = "这个地区资源十分丰富，但敌人占据富有地形，使得生产十分困难";
完50区.difficulty = 5;
完50区.alwaysUnlocked = false;
完50区.addStartingItems = true;
完50区.captureWave = 0;
完50区.localizedName = "晶石堡垒-50";
exports.完50区 = 完50区;
SFlib.addToResearch(完50区, {
	parent: "完19区",
	objectives: Seq.with(
	new Objectives.Research(完19区))
});

const 完89区 = new SectorPreset("完89区", 埃里克卫, 89);
完89区.description = "这个区域的敌人依托不同地形建造坚固要塞，尝试生产多兵种协同进攻";
完89区.difficulty = 8;
完89区.alwaysUnlocked = false;
完89区.addStartingItems = true;
完89区.captureWave = 0;
完89区.localizedName = "熔城要塞-89";
exports.完89区 = 完89区;
SFlib.addToResearch(完89区, {
	parent: "完19区",
	objectives: Seq.with(
	new Objectives.SectorComplete(完19区))
});

const 完51区 = new SectorPreset("完51区", 埃里克卫, 51);
完51区.description = "最终基地！敌人多兵种高威胁单位数量极多，注意防御敌人高威胁空中单位！";
完51区.difficulty = 10;
完51区.alwaysUnlocked = false;
完51区.addStartingItems = true;
完51区.captureWave = 0;
完51区.localizedName = "绝境-51";
exports.完51区 = 完51区;
SFlib.addToResearch(完51区, {
	parent: "完50区",
	objectives: Seq.with(
	new Objectives.SectorComplete(完50区))
});


