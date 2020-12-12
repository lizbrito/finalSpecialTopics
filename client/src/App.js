import React from 'react'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import Title from './components/layout/Title'

import { Layout } from 'antd'
import AddPerson from './components/forms/AddPerson'

import './App.css'
import People from './components/lists/People'
import AddBoat from './components/forms/AddBoat'

import Boats from './components/lists/Boats'

const { Content } = Layout

const client = new ApolloClient({
  uri: 'http://localhost:4002/graphql',
  cache: new InMemoryCache()
})

const App = () => (
  <ApolloProvider client={client}>
    <div className='container'>
      <Content className='App'>
        <Title />
        <AddPerson />
        <People />
        <AddBoat />
        <Boats />
      </Content>
    </div>
  </ApolloProvider>
)

export default App