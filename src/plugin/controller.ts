figma.showUI(__html__, {width: 700, height: 400});

const assets = {
    components: [],
    colorStyles: [],
    textStyles: [],
    effectStyles: [],
    gridStyles: [],
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
    assets.colorStyles = figma.getLocalPaintStyles().map(colors => classToObject(colors));
    assets.textStyles = figma.getLocalTextStyles().map(texts => classToObject(texts));
    assets.effectStyles = figma.getLocalEffectStyles().map(effects => classToObject(effects));
    assets.gridStyles = figma.getLocalGridStyles().map(grids => classToObject(grids));
}

function collectComponents() {
    const components = figma.root.findAll(node => node.type === 'COMPONENT').map(component => classToObject(component));
    assets.components = components;
}

function loadFonts() {
    figma.listAvailableFontsAsync().then(res => {
        console.log(res);
    });
}

async function collectAssets() {
    await collectComponents();
    await getStyles();

    await figma.ui.postMessage({type: 'loaded-assets', message: JSON.stringify(assets)});
}

//Modifying shit bellow

function createInstance() {
    const component = assets.components[0];

    const instance = component.createInstance();

    instance.x = figma.viewport.center.x;
    instance.y = figma.viewport.center.y;
    figma.currentPage.selection = [instance];
}

function applyTextStyle() {
    const textStyle = assets.textStyles[0];
    const selected = figma.currentPage.selection;
    const isText = !selected.some(node => node.type !== 'TEXT');

    if (isText) {
        selected.forEach(node => (node.textStyleId = `S:${textStyle.key},`));
    } else {
        alert('Can only apply textstyles when text is selected');
    }
}

function applyFillStyle() {
    const colorStyle = assets.colorStyles[0];
    const selected = figma.currentPage.selection;

    selected.forEach(node => (node.fillStyleId = `S:${colorStyle.key},`));
}

function applyBorderStyle() {
    const colorStyle = assets.colorStyles[0];
    const selected = figma.currentPage.selection;

    selected.forEach(node => (node.strokeStyleId = `S:${colorStyle.key},`));
}

function applyEffectStyle() {
    const effectStyle = assets.effectStyles[0];
    const selected = figma.currentPage.selection;

    selected.forEach(node => (node.effectStyleId = `S:${effectStyle.key},`));
}

function applyGridStyle() {
    const gridStyle = assets.gridStyles[0];
    const selected = figma.currentPage.selection;

    const isValid = !selected.some(
        node => !(node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'INSTANCE')
    );

    if (isValid) {
        selected.forEach(node => {
            return (node.gridStyleId = `S:${gridStyle.key},`);
        });
    } else {
        alert('Can only apply grids to frames');
    }
}

figma.ui.onmessage = msg => {
    if (msg.type === 'onLoad') {
        collectAssets();
    }

    if (msg.type === 'create') {
        createInstance();
    }

    if (msg.type === 'apply-text-style') {
        applyTextStyle();
    }

    if (msg.type === 'apply-fill-style') {
        applyFillStyle();
    }

    if (msg.type === 'apply-border-style') {
        applyBorderStyle();
    }

    if (msg.type === 'apply-effect-style') {
        applyEffectStyle();
    }

    if (msg.type === 'apply-grid-style') {
        applyGridStyle();
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
