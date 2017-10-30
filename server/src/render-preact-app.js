const { h } = require('preact');
const preactRenderToString = require('preact-render-to-string');

module.exports = function renderPreactApp(opts) {
    const { component, locals = {}, view = 'index' } = opts;

    if(!component) {
        throw new Error('No component given to preact renderer');
    }

    return (req, res, next) => {
        const initialState = req.initialState;
        try {
            const app = preactRenderToString(h(component(initialState), { url: req.url }));
            const finalLocals = Object.assign(locals, {
                app,
                initialState: JSON.stringify(initialState),
            });

            res.render(view, finalLocals);
        } catch(err) {
            err.statusCode = 500;
            next(err);
        }
    }
};