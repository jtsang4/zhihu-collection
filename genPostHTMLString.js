const templateStr = '<div class="zm-item zm-item-expanded" data-type="Post" data-za-module="PostItem" data-za-index="">' +
    '<h2 class="zm-item-title"><a target="_blank" class="post-link" href="https://zhuanlan.zhihu.com/p/{{{token}}}" data-za-element-name="Title">{{{title}}}</a></h2>' +
    '<div class="zm-item-fav">' +
        '<div tabindex="-1" class="zm-item-feed zm-item-post" data-type="p">' +
            '<link itemprop="url" href="https://zhuanlan.zhihu.com/p/{{{token}}}">' +
            '<meta itemprop="post-url-token" content="{{{token}}}">' +
            '<a class="zg-anchor-hidden" name="post-{{{token}}}"></a>' +
            '<div class="entry-body">' +
                '<div class="zm-item-rich-text js-collapse-body">' +
                    '<div class="post-content" data-author-name="Didn\'t get" data-entry-url="https://zhuanlan.zhihu.com/p/{{{token}}}">' +
                        '<div>' +
                            '{{{content}}}' +
                        '</div>' +
                        '<div class="Tipjar-entry hidden js-tipjar" style="display: block;">' +
                            '<div class="Tipjar-tagLine">「真诚赞赏，手留余香」</div>' +
                            '<a href="https://zhuanlan.zhihu.com/p/{{{token}}}#tipjar" target="_blank" class="Tipjar-entryButton">赞赏</a>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>' +
'</div>'

module.exports = function(collectionObj) {
	const rawContent = collectionObj.content // HTML转义原始字符串
	const token = collectionObj.question.id // 文章token
	const title = collectionObj.question.title // 文章标题
	const url = collectionObj.question.url // 链接 URL
	// const desc = collectionObj.desc // 描述文字
	// const votes = collectionObj.voter // 赞同数

	// 将 rawContent 转换成 HTML srting
	let tempElem = document.createElement('div')
	tempElem.innerHTML = rawContent
	const content = tempElem.textContent
	tempElem = null

	// 替换模板内容
	let htmlStr = templateStr.replace('{{{token}}}', token)
	htmlStr = htmlStr.replace('{{{title}}}', title)
	htmlStr = htmlStr.replace('{{{content}}}', content)

	return htmlStr
}