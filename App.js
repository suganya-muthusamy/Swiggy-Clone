import React from "react";
import ReactDOM from "react-dom/client";

// functional component
const Header = () => {
  return (
    <div className="header-container">
      <img
        alt="logo"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2WazG9ogzCX-edCo-gI8grlP6RMHwR7otmg&usqp=CAU"
      />
      <div className="search-container">
        <input type="text" /> 
        <button type="submit">search</button>
      </div>
      <img src="https://scontent.fyxd1-1.fna.fbcdn.net/v/t1.6435-9/107004184_110965414017381_1184064122406866696_n.jpg?stp=cp0_dst-jpg_e15_p320x320_q65&_nc_cat=103&ccb=1-7&_nc_sid=7aed08&_nc_ohc=FzS7Zs1eSqgAX8PdD8C&_nc_ht=scontent.fyxd1-1.fna&oh=00_AfBEme4Wschlc1jWjDY4eoeTdgCK5K2z0KiBQacCfkpIbg&oe=646F1049" />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<Header />);
