figma.showUI(__html__, {width: 600, height: 350});

const assets = {
    components: [],
    fillStyles: [],
    strokeStyles: [],
    textStyles: [],
    effectStyles: [],
    gridStyles: [],
    frames: [],
    pages: [],
};

const foo = {
    bar: [],
};

const classToObject = theClass => {
    const originalClass = theClass || {};
    const keys = Object.getOwnPropertyNames(Object.getPrototypeOf(originalClass));
    return keys.reduce((classAsObj, key) => {
        classAsObj[key] = originalClass[key];
        return classAsObj;
    }, {});
};

function getStyles() {
    assets.fillStyles = figma.getLocalPaintStyles().map(colors => ({...classToObject(colors), category: 'fill'}));

    assets.strokeStyles = figma.getLocalPaintStyles().map(colors => ({...classToObject(colors), category: 'stroke'}));

    assets.textStyles = figma.getLocalTextStyles().map(texts => classToObject(texts));
    assets.effectStyles = figma.getLocalEffectStyles().map(effects => classToObject(effects));
    assets.gridStyles = figma.getLocalGridStyles().map(grids => classToObject(grids));
}

function collectComponents() {
    const components = figma.root
        .findAll(node => node.type === 'COMPONENT')
        .map(node => ({
            id: node.id,
            name: node.name,
            type: node.type,
            description: node.description,
            page: figma.currentPage.name,
        }));

    assets.components = components;
}

function collectFrames() {
    const frames = figma.root.children
        .map(p =>
            p.type === 'PAGE'
                ? p.children.map(f => ({
                      id: f.id,
                      name: f.name,
                      type: f.type,
                      page: p.name,
                  }))
                : null
        )
        .reduce((acc, val) => {
            return acc.concat(val);
        }, []);

    assets.frames = frames;
}

function collectPages() {
    const pages = figma.root.children.map(p => ({
        id: p.id,
        name: p.name,
        type: p.type,
    }));

    assets.pages = pages;
}

function collectAssets() {
    collectComponents();
    getStyles();
    collectFrames();
    collectPages();

    figma.ui.postMessage({type: 'loaded-assets', message: JSON.stringify(assets)});
}

//Modifying shit bellow

function createComponentInstance(selected) {
    const nodeId = selected.id;
    const node = figma.getNodeById(nodeId);

    if (node.type === 'COMPONENT') {
        const {x, y} = figma.viewport.center;
        const instance = node.createInstance();

        instance.x = x;
        instance.y = y;

        figma.currentPage.appendChild(instance);
        figma.currentPage.selection = [instance];
    }
}

function goToSelectedNode(selected) {
    const nodeId = selected.id;
    const node = figma.getNodeById(nodeId);

    // Change Page
    if (node.parent.type === 'PAGE') {
        figma.currentPage = node.parent;
    }

    // Select the Node
    if (node.type !== 'DOCUMENT' && node.type !== 'PAGE') {
        figma.currentPage.selection = [node];
        figma.viewport.scrollAndZoomIntoView([node]);
    }

    // If Page
    if (node.type === 'PAGE') {
        figma.currentPage = node;
    }
}

function applyTextStyle(key) {
    const selected = figma.currentPage.selection;
    const isText = !selected.some(node => node.type !== 'TEXT');

    if (isText) {
        selected.forEach(node => (node.textStyleId = `S:${key},`));
    } else {
        alert('Can only apply textstyles when text is selected');
    }
}

function applyFillStyle(key) {
    const selected = figma.currentPage.selection;

    selected.forEach(node => (node.fillStyleId = `S:${key},`));
}

function applyStrokeStyle(key) {
    const selected = figma.currentPage.selection;

    selected.forEach(node => (node.strokeStyleId = `S:${key},`));
}

function applyEffectStyle(key) {
    const selected = figma.currentPage.selection;

    selected.forEach(node => (node.effectStyleId = `S:${key},`));
}

function applyGridStyle(key) {
    const selected = figma.currentPage.selection;

    const isValid = !selected.some(
        node => !(node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'INSTANCE')
    );

    if (isValid) {
        selected.forEach(node => {
            return (node.gridStyleId = `S:${key},`);
        });
    } else {
        alert('Can only apply grids to frames');
    }
}

figma.ui.onmessage = msg => {
    if (msg.type === 'onLoad') {
        collectAssets();
    }

    if (msg.type === 'load-styles') {
        collectStyles();
    }

    if (msg.type === 'create-instance') {
        createComponentInstance(msg.payload);
    }

    if (msg.type === 'go-to-selected') {
        goToSelectedNode(msg.payload);
    }

    if (msg.type === 'apply-text-style') {
        applyTextStyle(msg.payload);
    }

    if (msg.type === 'apply-fill-style') {
        applyFillStyle(msg.payload);
    }

    if (msg.type === 'apply-stroke-style') {
        applyStrokeStyle(msg.payload);
    }

    if (msg.type === 'apply-effect-style') {
        applyEffectStyle(msg.payload);
    }

    if (msg.type === 'apply-grid-style') {
        applyGridStyle(msg.payload);
    }

    // figma.closePlugin();

    // console.log(instance.x);
    // instance.createInstance();

    // figma.currentPage.appendChild(instance);
    // const styles = figma.getLocalPaintStyles();
    // const selection = figma.currentPage.selection;
    // console.log(selection);
    // console.log(styles);
    // if (msg.type === 'create-rectangles') {
    //     const nodes = [];
    //     for (let i = 0; i < msg.count; i++) {
    //         const rect = figma.createRectangle();
    //         rect.x = i * 150;
    //         rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
    //         figma.currentPage.appendChild(rect);
    //         nodes.push(rect);
    //     }
    //     figma.currentPage.selection = nodes;
    //     figma.viewport.scrollAndZoomIntoView(nodes);
    //     // This is how figma responds back to the ui
    //     figma.ui.postMessage({
    //         type: 'create-rectangles',
    //         message: `Created ${msg.count} Rectangles`,
    //     });
    // }
    // figma.closePlugin();
};
