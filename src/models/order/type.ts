type Order = {
  order_id_pk?: number
  order_status?: 'open' | 'processing' | 'completed' | 'cancelled'
  user_id_fk?: number
}
