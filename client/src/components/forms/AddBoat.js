import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'

import { Form, Input, Button, Select } from 'antd'

import { v4 as uuidv4 } from 'uuid'

import { ADD_BOAT, GET_PEOPLE, GET_BOAT } from '../../queries'

const { Option } = Select;

const AddBoat = () => {
  const [id] = useState(uuidv4())
  const [addBoat] = useMutation(ADD_BOAT)

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = values => {
    const { year, make, model, price, personId} = values

    addBoat({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId
      },
      optimisticResponse: {
        __typename: 'Mutation',
        addBoat: {
          __typename: 'Boat',
          id,
          year,
          make,
          model,
          price,
          personId
        }
      },
      update: (proxy, { data: { addBoat } }) => {
        const data = proxy.readQuery({ query: GET_BOAT })
        proxy.writeQuery({
          query: GET_BOAT,
          data: {
            ...data,
            // boats: [...data.boats, addBoat]
          }
        })
      }
    })
  }

  const { loading, error, data } = useQuery(GET_PEOPLE)
  if (loading) return 'Loading...'
  if (error) return `Errror! ${error.message}`

  return (
    <Form
      form={form}
      name='add-boat-form'
      layout='inline'
      onFinish={onFinish}
      size='large'
      style={{ marginBottom: '40px' }}
    >
      <Form.Item
        name='year'
        rules={[{ required: true, message: 'Please input year of the boat!' }]}
      >
        <Input placeholder='2012' />
      </Form.Item>
      <Form.Item
        name='make'
        rules={[{ required: true, message: 'Please input make of the boat!' }]}
      >
        <Input placeholder='Navigator' />
      </Form.Item>
      <Form.Item
        name='model'
        rules={[{ required: true, message: 'Please input model! of the boat' }]}
      >
        <Input placeholder='K900' />
      </Form.Item>
      <Form.Item
        name='price'
        rules={[{ required: true, message: 'Please input price of the boat!' }]}
      >
        <Input placeholder='$352,254.00' />
      </Form.Item>
      <Form.Item
        name='personId'
        rules={[{ required: true, message: 'Please select owner of the boat!' }]}
      >
        <Select style={{ width: 120 }} placeholder="John Doe">
          {data.people.map(({ id, firstName }) => (
            <Option key={id} value={id} >{firstName}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Boat
          </Button>
        )}
      </Form.Item>
    </Form>
  )
}

export default AddBoat