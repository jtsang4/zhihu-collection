const templateStr = '<div class="zm-item zm-item-expanded" data-type="Answer" data-za-module="AnswerItem" data-za-index="">' +
    '<h2 class="zm-item-title">' +
        '<a target="_blank" href="/question/{{{qid}}}">{{{title}}}</a>' +
    '</h2>' +
    '<div class="zm-item-fav">' +
        '<div tabindex="-1" class="zm-item-answer " itemscope="" itemtype="http://schema.org/Answer" data-aid="{{{aid}}}" data-atoken="{{{atoken}}}" data-collapsed="0" data-deleted="0" data-isowner="0" data-helpful="1" data-copyable="1" data-zop="">' +
            '<div class="zm-item-rich-text expandable js-collapse-body" data-resourceid="3859697" data-action="/answer/content" data-author-name="blue" data-entry-url="/question/{{{qid}}}/answer/{{{atoken}}}">' +
                '<div>' +
                    '{{{content}}}' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>' +
'</div>'

module.exports = function(collectionObj) {
	const rawContent = collectionObj.content // HTML转义原始字符串
	const atoken = collectionObj.atoken // 答案 token
	const aid = collectionObj.aid // 答案 id
	const qid = collectionObj.question.id // 问题 id
	const title = collectionObj.question.title // 问题标题
	const url = collectionObj.question.url // 链接 URL
	// const desc = collectionObj.desc // 描述文字
	// const votes = collectionObj.voter // 赞同数

	// 将 rawContent 转换成 HTML srting
	let tempElem = document.createElement('div')
	tempElem.innerHTML = rawContent
	const content = tempElem.textContent
	tempElem = null

	// 替换模板内容
	let htmlStr = templateStr.replace('{{{atoken}}}', atoken)
	htmlStr = templateStr.replace('{{{aid}}}', aid)
	htmlStr = templateStr.replace('{{{qid}}}', qid)
	htmlStr = htmlStr.replace('{{{title}}}', title)
	htmlStr = htmlStr.replace('{{{content}}}', content)

	return htmlStr
}