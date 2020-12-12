import React, { useState } from 'react'
import { Card, List } from 'antd'

const getStyles = () => ({
  card: {
    width: '500px'
  }
})

const Boat = props => {
  const [id] = useState(props.id)
  const [make, setMake] = useState(props.make)
  const [model, setModel] = useState(props.model)
  const [year, setYear] = useState(props.year)
  const [price, setPrice] = useState(props.price)
  const [personId, setPersonId] = useState(props.personId)
  const styles = getStyles()


  return (
    <List.Item key={id}>
      <Card
          style={styles.card}
        >
        <p>{year}</p>
        <p>{make}</p>
        <p>{model}</p>
        <p>{price}</p>
      </Card>
    </List.Item>
  )
}

export default Boat