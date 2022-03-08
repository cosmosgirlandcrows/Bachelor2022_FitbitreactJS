import PropTypes from 'prop-types'
import React from 'react'

const GridItemContainer = ({title, gridColumn}) => {
  return (
    <div className='gridItem' style={{ gridColumn: gridColumn }}>
        <div className='gridItemHeader'>
            <h2>{title}</h2>
        </div>
        <div className='gridItemContent'></div>
    </div>
  )
}

GridItemContainer.defaultProps = {
    title: 'Grid Item',
    gridColumn: 'span 3',
}

GridItemContainer.propTypes = {
    title: PropTypes.string,
    gridColumn: PropTypes.string,
}

export default GridItemContainer