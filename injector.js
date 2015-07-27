function nyaSearch(str)
{
	if (str.length > 8)
		if (str.substr(-(str.length / 2)).search(';w;') != -1)
			return true;
		else
			return false;
	else
		if (str.search(';w;') != -1)
			return true;
		else
			return false;
}

function editPosts(posts)
{
	for (i = 0; i < posts.length; i++)
	{
		var username = posts[i].getElementsByClassName('post--info-username')[0].innerHTML;
		var postContents = posts[i].getElementsByClassName('post--content')[0].children;
		var postContent = postContents[postContents.length - 1];

		if ((username == 'Kusoneko ') && !nyaSearch(postContent.innerHTML))
			postContent.innerHTML += ' ;w;';
	}
}

function editComments(comments)
{
	for (i = 0; i < comments.length; i++)
	{
		var username = comments[i].getElementsByClassName('comment--username')[0].getElementsByClassName('js-user-popover')[0].innerHTML;
		var commentContents = comments[i].children;
		var commentContent = commentContents[commentContents.length - 1];

		if ((username == 'Kusoneko&nbsp;') && !nyaSearch(commentContent.innerHTML))
			commentContent.innerHTML += ' ;w;';
	}
}

editPosts(document.getElementsByClassName('post--container post--source-playerme'));
editComments(document.getElementsByClassName('comment--content'));

var observerPosts = new MutationSummary({
	callback: function(summaries)
	{
		editPosts(summaries[0].added);
	},

	queries: [{
		element: '.post--container.post--source-playerme'
	}]
});

var observerComments = new MutationSummary({
	callback: function(summaries)
	{
		editComments(summaries[0].added);
	},

	queries: [{
		element: '.comment--content'
	}]
});
