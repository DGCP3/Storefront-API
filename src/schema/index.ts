import { z, ZodRawShape } from 'zod'

export const accountSchema = z.object({
  fullName: z.string({ required_error: 'Full name is required' }),
  email: z.string({ required_error: 'Email is required' }).email({ message: 'Email is invalid' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must be at most 20 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
    )
})

export const productSchema = z.object({
  product_name: z.string({ required_error: 'Product name is required' }),
  product_desc: z.string({ required_error: 'Product description is required' }).optional(),
  product_price: z.number({ required_error: 'Product price is required' })
})

export const cartSchema = z.object({
  productId: z.number({ required_error: 'Product id is required' }),
  quantity: z.number({ required_error: 'Product quantity is required' })
})

export const paramsSchema = (schema: ZodRawShape) => z.object({ params: z.object(schema) })

export const querySchema = (schema: ZodRawShape) => z.object({ query: z.object(schema) })

export const bodySchema = (schema: ZodRawShape | any) => z.object({ body: z.object(schema) })

export const loginSchema = z.object({ body: accountSchema.pick({ email: true, password: true }) })
