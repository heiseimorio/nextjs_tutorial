// // req = リクエストデータ、 res = レスポンスデータ
// export default (req, res) => {
//   res.status(200).json({ text: 'hello' })

//   // ブラウザ側のファイルにバンドルされないので、
//   // ここでサーバー側のコードを書いたら良い(DBに保存する処理など)。
// }

import { NextApiRequest, NextApiResponse } from 'next'

export default (_: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ text: 'Hello!!!' })
}