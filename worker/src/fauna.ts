import { Client } from 'faunadb'

export const fauna = new Client({
  secret: process.env.faunadb_key!,
  domain: 'db.eu.fauna.com',
  scheme: 'https'
})
