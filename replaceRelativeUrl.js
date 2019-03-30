/**
 * Check if string contains a relative link
 */

function linkify(html) {
  const re = new RegExp('^(http|https|mailto)://', 'i')

  const result = html.replace(/href="([^"]+)/g, function($1) {
    const arr = $1.split('"')
    //console.log(arr)
    let match = re.test(arr[1])
    // console.log(match)
    if (!match) {
      return 'href="/folder/test' + arr[1]
    }

    return $1
  })
  return result
}

const html =
  '<a href="filename.pdf">Google</a>some other text<a href="http://www.amazon.com">Amazon</a>More text'
console.log(linkify(html))
