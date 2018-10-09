import React from 'react'
import { Form } from 'semantic-ui-react'

const ReduxFormControl = ({ input, meta, ...props }) => {
    return <Form.Input {...props} {...input} />
}

export default ReduxFormControl