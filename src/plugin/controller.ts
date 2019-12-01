figma.showUI(__html__);

const obj = {
    components: [],
    colorStyles: [],
    textStyles: [],
    effectStyles: [],
    gridStyles: [],
};

function getStyles() {
    const colorStyles = figma.getLocalPaintStyles();
    const textStyles = figma.getLocalTextStyles();
    const effectStyles = figma.getLocalEffectStyles();
    const gridStyles = figma.getLocalGridStyles();

    obj.colorStyles = colorStyles.map(color => color);
    obj.textStyles = textStyles.map(text => text);
    obj.effectStyles = effectStyles.map(effect => effect);
    obj.gridStyles = gridStyles.map(grid => grid);
}

function traverseComponents(node) {
    if ('children' in node) {
        if (node.type === 'COMPONENT') obj.components.push(node);

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

    console.log('assets collected');

    figma.ui.onmessage = () => {
        figma.ui.postMessage = () => ({type: 'loaded-assets', message: obj});
    };
}

collectAssets();

//Modifying shit bellow

function createInstance() {
    const component = obj.components[0];

    const instance = component.createInstance();

    instance.x = figma.viewport.center.x;
    instance.y = figma.viewport.center.y;
    figma.currentPage.selection = [instance];
}

figma.ui.onmessage = () => {
    createInstance();

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
