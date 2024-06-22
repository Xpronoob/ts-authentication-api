import jwt from 'jsonwebtoken'

export class JwtAdapter {
  // todo: seed generation

  static async generateToken (payload: Object, duration: string = '2h'): Promise<string | null> {
    return await new Promise((resolve) => {
      jwt.sign(payload,
        'SEED',
        { expiresIn: duration },
        (err, token) => {
          if (err != null) return resolve(null)

          resolve(token!) // '!' is non-null assertion \ not null, not undefined
        })
    })
  }
}
