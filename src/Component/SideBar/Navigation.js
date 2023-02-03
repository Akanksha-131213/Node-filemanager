import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import Tree from "./Tree"
export const Navigation= () => {

  const [showNavBar,setNavBar]=useState(true);
  const {pathname}=useLocation();

  useEffect(()=>{
    if(pathname.includes("/file/")){
      setNavBar(false);
    }
    else{
      setNavBar(true);
    }
  },[pathname])

  return (
<>
      {showNavBar&&(
      <Tree/>)}
</>  



  
                
    
)} 