import ReactDom from "react-dom/client";

import App from "./routers/index";
// import com1 from './components/com1'

// function App() {
//   return (
//     <div>
//       <h3> 自定义gsk-react-cli</h3>

//     </div>
//   )
// }

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <App />
);
