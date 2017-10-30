## Wrapping Redux Stores with ES6 Classes

This is a quick post about a simple pattern for working with [Redux](https://github.com/reactjs/redux) stores.

When writing the [Gallery plugin](https://github.com/pagespace/pagespace-gallery) for [Pagespace](https://github.com/pagespace/pagespace) a while ago, I used it as an excuse to build something with React + Redux, where I used a simple pattern that wraps the application's Redux store in an ES6 class.

Conceptually, I think of a React/Redux application as kind of implementing the Model View Presenter pattern, whereby each React component is a mini *View-Presenter*, and the Redux store is a shared application *Model*. A model which utilizes the well documented features of Redux, but albeit a model. I consider bi-directional communication a feature of modern MVC/MVVM frameworks not the MVC/MVP pattern itself which far predates Knockout and Angular.

Wrapping a Redux store in a class adds a simple layer of abstraction which turns the store into a more traditional model object. This results in a clean API surface for interacting with the store and provides a place to easily add asynchronous actions; without the need for extra Redux middleware like [Redux Thunk](https://github.com/gaearon/redux-thunk).

I'll show some code and then briefly describe the benefits of this approach. This code includes the `GalleryModel` class which extends  the simple `ReduxWrapperModel` (the inheritance here is probably some minor over-engineering, but it illustrates the reusable parts if building an application with more than one model). The model is exported (CommonJS syntax) as a factory function which combines the relevant reducers, creates the store and returns a new instance of a `GalleryModel`.

```javascript
class ReduxWrapperModel {
    constructor(store) {
        this.store = store;
    }

    subscribe() {
        return this.store.subscribe(...arguments);
    }
}

class GalleryModel extends ReduxWrapperModel {
    selectImages(selectedImages) {
        return this.store.dispatch({
            type: galleryActions.SELECT_IMAGES,
            selectedImages: selectedImages
        });
    }

    toggleSelected(image) {
        this.store.dispatch({
            type: galleryActions.TOGGLE_SELECTED,
            image: image
        });
    }

    load(images) {
        return this.store.dispatch({
            type: galleryActions.LOAD,
            images: images
        });
    }

    start() {
        const allImages = fetch('/_api/media?type=' + encodeURIComponent('/^image/'), {
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json'
            }
        }).then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        });

        return allImages.then(data => {
            this.load(data);
            this.selectImages(data.images || []);
        }).catch(function (err) {
            console.error(err);
        })
    }

    get images() {
        return this.store.getState().availableImages;
    }

    get selectedImages() {
        return this.store.getState().selectedImages;
    }
}

module.exports = function createGalleryModel() {
    const reducer = Redux.combineReducers({
        availableImages: availableImagesReducer,
        selectedImages: selectedImagesReducer
    });
    const store = Redux.createStore(reducer, {});
    return new GalleryModel(store);
};
```

For the sake of brevity, I've omitted the actual reducers, the action constants and some methods on the class. The [original code is here](https://github.com/pagespace/pagespace-gallery/blob/master/static/edit/src/gallery-model.js) though.

Usage then looks like this:

```javascript
const galleryModel = createGalleryModel();

//render react components
renderSelectTags(galleryModel);
renderAvailableImagesView(galleryModel);
renderSelectedImagesView(galleryModel);

galleryModel.start();
```

The code above is an example of the [Adapter pattern](http://www.dofactory.com/javascript/adapter-design-pattern). Redux becomes an implementation detail that consumers of the model need not be aware of. The reasons for this are:

* Firstly, Redux as an API surface is a bit ugly. The user must be aware of the store, the available actions and the signature to dispatch an action. The wrapper class consists of simpler API; "action methods" that do things and some simple getters for querying state.
* Wrapping the specifics of the Redux store means that it becomes an implementation detail that users of the model need not be aware of. This makes models more portable and future-proof against decisions to change technology. It also improves the readability of the code; particularly if future maintainers, of components that use the model, are not familiar with Redux.
* It provides a neat place to add asynchronous code which can dispatch actions once an async operation has resolved. The example above of this is the `start()` method which fetches a list of images from the server and then calls the appropriate method which will dispatch an action.

Using this pattern might be a matter of taste. I suppose it re-introduces object-oriented concepts that are frowned upon because traditionally this is the approach that presents the problems that Redux sells itself on solving. But there is nothing here that does things like mutate state or create side effects. Personally, I think it keeps things tidy and readable. If it is something useful, I'm surprised I haven't seen it anywhere before. But then, I'm not really involved in the React/Redux community. Maybe it is. Or maybe there are good reasons I'm not aware of not to do things this way.