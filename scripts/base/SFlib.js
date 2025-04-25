exports.modName = "埃里克卫星"

exports.mod = Vars.mods.locateMod(exports.modName);



exports.addToResearch = (content, research) => {

if (!content) {
    throw new Error('content is null， 译：内容为空！');
}
if (!research.parent) {
    throw new Error('research.parent is empty，译：研究的父节点为空！');
}

	
	
	
	var researchName = research.parent;
	var customRequirements = research.requirements;
	var objectives = research.objectives;

	var lastNode = TechTree.all.find(boolf(t => t.content == content));
	if (lastNode != null) {
		lastNode.remove();
	}

	var node = new TechTree.TechNode(null, content, customRequirements !== undefined ? customRequirements : content.researchRequirements());
	var currentMod = exports.mod;
	if (objectives) {
		node.objectives.addAll(objectives);
	}

	if (node.parent != null) {
		node.parent.children.remove(node);
	}

	// 查找父节点。
	var parent = TechTree.all.find(boolf(t => t.content.name.equals(researchName) || t.content.name.equals(currentMod.name + "-" + researchName)));

if (parent == null) {

    throw new Error("内容'" + researchName + "'不在技术树中，\n\n但'" + content.name + "'需要它被研究。");
}


	//将这个节点添加到父节点
	if (!parent.children.contains(node)) {
		parent.children.add(node);
	}
	// 重新设置节点的父级
	node.parent = parent;
};