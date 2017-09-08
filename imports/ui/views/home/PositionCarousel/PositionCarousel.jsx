import React, { Component, PropTypes } from 'react'

import Carousel from '/imports/ui/components/Carousel'
import Loading from '/imports/ui/components/Loading'
import Position from '/imports/ui/views/positions/Position'

const PositionCarousel = ({ loading, positions }) => {
    if (loading) {
      return <Loading/>
    } else {
      if (positions.length > 0) {
        let positionCards = positions.map((p, index) => {
          return (
              <div key={p._id} style={styles.position}>
                <div style={styles[index%2 ? 'right' : 'left']}>
                  <Position position={p} />
                </div>
              </div>
          )
        })
        return <Carousel cards={positionCards}/>
      } else {
        return <div style={styles.empty}>No Positions</div>
      }
    }
}

PositionCarousel.propTypes = {
  loading: PropTypes.bool.isRequired,
  positions: PropTypes.array.isRequired,
}

const styles = {
  position: {
    flexBasis: '50%',
  },
  left: {
    marginRight: '8px'
  },
  right: {
    marginLeft: '8px'
  },
  empty: {
    fontSize: '24px',
    color: '#9b9b9b',
    width: '100%',
    padding: '48px 0',
    textAlign: 'center'
  }
}

export default PositionCarousel