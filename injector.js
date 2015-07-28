function nyaSearch(str, postAddition)
{
    if (str.length > postAddition.length * 2)
        if (str.substr(-(str.length / 2)).search(postAddition) != -1)
            return true;
        else
            return false;
    else
        if (str.search(postAddition) != -1)
            return true;
        else
            return false;
}

function editPosts(posts)
{
    chrome.runtime.sendMessage({
        action: 'postAdditions'
    }, function(additions)
    {
        console.log(additions);
        for (i = 0; i < posts.length; i++)
        {
            for (a = 0; i < additions.length; a++)
            {
                var user = additions[a].username;
                var postAddition = additions[a].postAddition;

                var username = posts[i].getElementsByClassName('post--info-username')[0].innerHTML;
                var postContents = posts[i].getElementsByClassName('post--content')[0].children;
                var postContent = postContents[postContents.length - 1];

                if ((username == user + ' ') && !nyaSearch(postContent.innerHTML, postAddition))
                    postContent.innerHTML += ' ' + postAddition;
            }
        }
    });
}

function editComments(comments)
{
    chrome.runtime.sendMessage({
        action: 'postAdditions'
    }, function(additions)
    {
        for (i = 0; i < comments.length; i++)
        {
            for (a = 0; i < additions.length; a++)
            {
                var user = additions[a].username;
                var postAddition = additions[a].postAddition;

                var username = comments[i].getElementsByClassName('comment--username')[0].getElementsByClassName('js-user-popover')[0].innerHTML;
                var commentContents = comments[i].children;
                var commentContent = commentContents[commentContents.length - 1];

                if ((username == user + '&nbsp;') && !nyaSearch(commentContent.innerHTML, postAddition))
                    commentContent.innerHTML += ' ' + postAddition;
            }
        }
    });
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
