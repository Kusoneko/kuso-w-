chrome.runtime.onMessage.addListener(function(request, sender, callback)
{
    if (request.action == 'postAdditions')
    {
        chrome.storage.sync.get('additions', function(items)
        {
            console.log(items.additions);
            callback(items.additions || []);
        });
        return true;
    }
});
