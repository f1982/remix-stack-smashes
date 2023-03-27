import React from 'react'
import { useControls } from 'leva'
import Layout from '~/components/layout'
// https://github.com/pmndrs/leva

export default function Leva() {
  const { name, aNumber } = useControls({ name: 'World', aNumber: 0 })

  return (
    <Layout title='Leva lib basic'>
      Hey {name}, hello! {aNumber}
    </Layout>
  )
}
