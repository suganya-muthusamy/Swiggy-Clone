
/**
 * how to create nested elements using react
 * <div id="parent">
    * <div id="child">
    *      <h1>Hello World from nested React!</h1>
    * </div>
 * </div>
 */

const headTag = React.createElement("div", {id:"parent"}, 
                [React.createElement("div", {id:"child1"}, 
                [React.createElement("h1", { class:"headClass"}, "Hello World from nested React 00:h1!"),
                React.createElement("h2", { class:"headClass"}, "Hello World from nested React 00:h2!")]),
                React.createElement("div", {id:"child2"}, 
                [React.createElement("h1", { class:"headClass"}, "Hello World from nested React 01:h1!"),
                React.createElement("h2", { class:"headClass"}, "Hello World from nested React 01:h2!")])])

// const headTag=React.createElement('h1', {
//     id:"headID", className:"headClass"
// }, "Hello World from React!")

console.log(headTag)    //this will return the object

const root=ReactDOM.createRoot(document.getElementById('root'))

root.render(headTag)    //this will render the headTag into h1 tag

