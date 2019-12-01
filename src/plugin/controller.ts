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

function traverseComponents(node) {
    if ('children' in node) {
        if (node.type === 'COMPONENT') assets.components.push(classToObject(node));

        if (node.type !== 'INSTANCE') {
            for (const child of node.children) {
                traverseComponents(child);
            }
        }
    }
}

async function collectAssets() {
    await traverseComponents(figma.root);
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

figma.ui.onmessage = msg => {
    if (msg.type === 'onLoad') {
        collectAssets();
    }

    if (msg.type === 'create') {
        createInstance();
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
