// Filename: AddTail.js
// Author: Colin
// Based on the script by KUANG Qi: http://kuangqi.me/tricks/append-a-copyright-info-after-every-post/
// Modified by: Cong

// Add a tail to every post from tail.md
// Great for adding copyright info

var fs = require("fs");

hexo.extend.filter.register("before_post_render", function(data) {
  if (!data.copyright) return data;

  // Add seperate line
  data.content += "\n";

  // Try to read tail.md
  try {
    var file_content = fs.readFileSync("tail.md");
    if (file_content && data.content.length > 50) {
      data.content += file_content;
    }
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
    // No process for ENOENT error
  }

  // 添加具体文章链接, 不需要去掉即可
  // var permalink = "\n本文链接：" + data.permalink;
  // data.content += permalink;

  return data;
});
