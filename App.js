import React from "react"
import ReactDOM from "react-dom/client"

// react element
const headTag = (
<h1 className="headClass">Hello from JSX Element</h1>
)

// react component
const Title = () => (
    <h1 className="headClass">Vanakkam React</h1>
)

// variable
const text="Functional component";

// functional component
const Head = () => {
    return(
        <div>
            <h1>Hello from Head component</h1>
        </div>
    )
}

const root=ReactDOM.createRoot(document.getElementById('root'))
const root1=ReactDOM.createRoot(document.getElementById('root1'))
const root2=ReactDOM.createRoot(document.getElementById('root2'))


root.render(headTag)
root1.render(<Title/>)
root2.render(text)


