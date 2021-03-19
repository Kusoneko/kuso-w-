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
            document.getElementById('message').style.display = 'block';
            window.setTimeout(function()
            {
                document.getElementById('message').innerHTML = '';
                document.getElementById('message').style.display = 'none';
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
            document.getElementById('message').style.display = 'block';
            window.setTimeout(function()
            {
                document.getElementById('message').innerHTML = '';
                document.getElementById('message').style.display = 'none';
            }, 2000);
            displayAdditions();
        });
    });
}

function displayAdditions()
{
    document.getElementById('additionList').innerHTML = '';

    chrome.storage.sync.get('additions', function(items)
    {
        if (items.additions != null)
        {
            for (i = 0; i < items.additions.length; i++)
                document.getElementById('additionList').innerHTML += '<tr data-id="' + i + '"><td>' + items.additions[i].username + '</td><td>' + items.additions[i].postAddition + '</td><td><button class="deleteButton btn btn-danger btn-xs btn-block">Delete</button></td></tr>';
            var deleteButtons = document.getElementsByClassName('deleteButton');
            for (i = 0; i < deleteButtons.length; i++)
                deleteButtons[i].onclick = deleteItem;
        }
    });
}

document.getElementById('message').style.display = 'none';

displayAdditions();
