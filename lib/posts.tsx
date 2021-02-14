import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// マークダウンコンテンツをレンダーする
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // /posts　配下のファイル名を取得する
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // id を取得するためにファイル名から ".md" を削除する
    const id = fileName.replace(/\.md$/, '')

    // マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // 投稿のメタデータ部分を解析するために gray-matter を使う
    const matterResult = matter(fileContents)

    // データを id と合わせる
    return {
      id,
      ...(matterResult.data as { date: string; title: string })
    }
  })
  // 投稿を日付でソートする
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  // /posts　配下のファイル名を取得する
  const fileNames = fs.readdirSync(postsDirectory)

  // 以下のような配列を返す
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id: string) {
  // マークダウンファイルを文字列として読み取る
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // 投稿のメタデータ部分を解析するために gray-matter を使用する
  const matterResult = matter(fileContents)

  // マークダウンをHTML文字列に変換する為に remark を使用する
  const processdContent = await remark()
                               .use(html)
                               .process(matterResult.content)
  const contentHtml = processdContent.toString()
  
  // データとidを組み合わせる
  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string })
  }
}