figma.showUI(__html__, {width: 600, height: 340});

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
            // @ts-ignore
            description: node.description,
            page: figma.currentPage.name,
            category: 'insert',
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
                      category: 'navigation',
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
        category: 'navigation',
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

    selected.length === 0 && figma.ui.postMessage({type: 'error', message: 'Select a layer to apply a style'});

    if (isText) {
        // @ts-ignore
        selected.forEach(node => (node.textStyleId = `S:${key},`));
    } else {
        figma.ui.postMessage({type: 'error', message: 'Can only apply text styles when text is selected'});
    }
}

function applyFillStyle(key) {
    const selected = figma.currentPage.selection;

    selected.length === 0 && figma.ui.postMessage({type: 'error', message: 'Select a layer to apply a style'});
    // @ts-ignore
    selected.forEach(node => (node.fillStyleId = `S:${key},`));
}

function applyStrokeStyle(key) {
    const selected = figma.currentPage.selection;

    selected.length === 0 && figma.ui.postMessage({type: 'error', message: 'Select a layer to apply a style'});
    // @ts-ignore
    selected.forEach(node => (node.strokeStyleId = `S:${key},`));
}

function applyEffectStyle(key) {
    const selected = figma.currentPage.selection;

    selected.length === 0 && figma.ui.postMessage({type: 'error', message: 'Select a layer to apply a style'});
    // @ts-ignore
    selected.forEach(node => (node.effectStyleId = `S:${key},`));
}

function applyGridStyle(key) {
    const selected = figma.currentPage.selection;

    const isValid = !selected.some(
        node => !(node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'INSTANCE')
    );

    selected.length === 0 && figma.ui.postMessage({type: 'error', message: 'Select a layer to apply a style'});

    if (isValid) {
        selected.forEach(node => {
            // @ts-ignore
            return (node.gridStyleId = `S:${key},`);
        });
    } else {
        figma.ui.postMessage({type: 'error', message: 'Grids can only be applied to frames'});
    }
}

figma.ui.onmessage = msg => {
    if (msg.type === 'close') {
        figma.closePlugin();
    }

    if (msg.type === 'onLoad') {
        collectAssets();
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
};
