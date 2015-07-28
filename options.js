function addItem()
{
    var username = document.getElementById('username').value;
    document.getElementById('username').value = '';
    var postAddition = document.getElementById('postAddition').value;
    document.getElementById('postAddition').value = '';

    chrome.storage.sync.get('additions', function(items)
    {
        var additions = items.additions || [];
        additions.push({username: username, postAddition: postAddition});

        chrome.storage.sync.set({additions: additions}, function()
        {
            document.getElementById('message').innerHTML = 'Added option';
            window.setTimeout(function()
            {
                document.getElementById('message').innerHTML = '';
            }, 2000);
            displayAdditions();
        });
    });
}
function addItemKeyPress(e)
{
    if (e.keyCode == 13)
        addItem();
}

document.getElementById('username').onkeypress = addItemKeyPress;
document.getElementById('postAddition').onkeypress = addItemKeyPress;
document.getElementById('submitButton').onclick = addItem;

function deleteItem()
{
    var id = parseInt(this.parentElement.parentElement.getAttribute('data-id'));
    chrome.storage.sync.get('additions', function(items)
    {
        var additions = items.additions || [];
        additions.splice(id, 1);

        chrome.storage.sync.set({additions: additions}, function()
        {
            document.getElementById('message').innerHTML = 'Removed option';
            window.setTimeout(function()
            {
                document.getElementById('message').innerHTML = '';
            }, 2000);
            displayAdditions();
        });
    });
}

function displayAdditions()
{
    document.getElementById('additionList').innerHTML = '<tr><th>Username</th><th>Post addition</th></tr>';

    chrome.storage.sync.get('additions', function(items)
    {
        if (items.additions != null)
        {
            for (i = 0; i < items.additions.length; i++)
                document.getElementById('additionList').innerHTML += '<tr data-id="' + i + '"><td>' + items.additions[i].username + '</td><td>' + items.additions[i].postAddition + '</td><td><button class="deleteButton">Delete</button></td></tr>';
            var deleteButtons = document.getElementsByClassName('deleteButton');
            for (i = 0; i < deleteButtons.length; i++)
                deleteButtons[i].onclick = deleteItem;
        }
    });
}

displayAdditions();
