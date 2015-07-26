function editPosts(posts)
{
	for (i = 0; i < posts.length; i++)
	{
		var username = posts[i].getElementsByClassName('post--info-username')[0].innerHTML;
		var postContents = posts[i].getElementsByClassName('post--content')[0].children;
		var postContent = postContents[postContents.length - 1];

		if ((username == 'RiN ') && (postContent.innerHTML.substr(-5) != ' nya~'))
			postContent.innerHTML += ' nya~';
	}
}

function editComments(comments)
{
	for (i = 0; i < comments.length; i++)
	{
		var username = comments[i].getElementsByClassName('comment--username')[0].getElementsByClassName('js-user-popover')[0].innerHTML;
		var commentContents = comments[i].children;
		var commentContent = commentContents[commentContents.length - 1];

		if ((username == 'RiN&nbsp;') && (commentContent.innerHTML.substr(-5) != ' nya~'))
			commentContent.innerHTML += ' nya~';
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
