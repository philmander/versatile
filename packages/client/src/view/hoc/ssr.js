/**
 * SSR decorator
 */
const isNode = window.window !== window;
export default function ssr (componentClass) {
    if (isNode && componentClass.prototype.hasOwnProperty('componentWillMountOnServer')) {
        componentClass.prototype.componentWillMount = componentClass.prototype.componentWillMountOnServer;
    }
    return componentClass
}