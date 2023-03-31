import { NavLink, Outlet } from 'react-router-dom';
import React from 'react';

export default function RootLayout() {

  return (
  <div className="root-layout">
    <header>
      <nav>
        <h1>Personal Page</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="about">About</NavLink>
          <NavLink to="loancalculator">Loan Calculator</NavLink>
          <NavLink to="stocks">Stock Chart</NavLink>
          <NavLink to="progress">Progress Pie Chart</NavLink>
          <NavLink to="barChartPage">My Bar Chart</NavLink>
          <NavLink to="world">World Grid</NavLink>   
          <NavLink to="USGraph">US Map Statistics</NavLink> 
          <NavLink to="networkGraph">network Graph</NavLink>     
      </nav>
    </header>
    <main>
      <Outlet/>
    </main>
  </div>
  )
}
