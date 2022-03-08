import React from 'react'
import GridItemContainer from './GridItemContainer'

const Grid = () => {
  return (
    <div className="container">
      <GridItemContainer title="Sleep" />
      <GridItemContainer title="Exercise"/>
      <GridItemContainer title="Heart rate"/>
      <GridItemContainer title="Steps"/>

      
    </div>
  )
}

export default Grid