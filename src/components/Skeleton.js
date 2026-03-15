import React from 'react';
import './Skeleton.css';

const Sk = ({ w='100%', h='14px', r='8px', style={} }) => (
  <div className="sk shimmer" style={{ width:w, height:h, borderRadius:r, ...style }}/>
);

export const CardSkeleton = () => (
  <div className="sk-card">
    <div className="sk-row"><Sk w="46px" h="46px" r="13px"/><Sk w="34px" h="34px" r="9px" style={{marginLeft:'auto'}}/></div>
    <Sk w="70%" h="18px" r="7px" style={{marginTop:'4px'}}/>
    <Sk w="55%" h="13px" r="6px"/>
    <Sk w="100%" h="13px" r="6px"/>
    <Sk w="85%"  h="13px" r="6px"/>
    <div className="sk-row" style={{gap:'6px'}}><Sk w="60px" h="22px" r="6px"/><Sk w="60px" h="22px" r="6px"/><Sk w="60px" h="22px" r="6px"/></div>
    <div className="sk-row" style={{borderTop:'1px solid var(--border)',paddingTop:'.6rem'}}>
      <Sk w="100px" h="13px" r="6px"/>
      <Sk w="60px"  h="13px" r="6px"/>
    </div>
  </div>
);

export const SkeletonGrid = () => (
  <div className="jobs-grid">
    {Array.from({length:8}).map((_,i) => <CardSkeleton key={i}/>)}
  </div>
);

export default Sk;
