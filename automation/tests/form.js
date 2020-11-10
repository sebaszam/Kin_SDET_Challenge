module.exports = {
    beforeEach(browser) {
        browser
            .deleteCookies()
            .url('http://localhost:8080/') //Enter the URL to be tested
            .waitForElementVisible('body')
            .pause(3000)
    },

    '@tags': ['load', 'fill-form'],
    'Page load': function(browser) {
        browser
            .assert.not.urlEquals('')
            .pause(3000)
            .assert.elementPresent('form')
            .pause(3000);
    },

    'Filling up a form': function(browser) {
        var books;

        try{
            books = require('../data.json');
        } catch(err) {
            console.log(err);
            console.log ('Couldn\'t load the data.json file. Please ensure that ' +
                'you have the file in subfolder ../' +
                'in the same folder as the tests');
            process.exit();
        }

        const muchReadOpenerSelector = '#time_selector';
        const muchReadValueSelector = '.bookitem[value="' + books.Record2.Read + '"]'; //You can change the value to select here
        const timeReadOpenerSelector = '#status_selector';
        const timeReadValueSelector = '.readtime[value="2_3weeks"]'; //You can change the value to select here
        const ratingOpenerSelector = '#status_selector';
        const ratingValueSelector = '.rating[value="4"]'; //You can change the value to select here
        const radioValueSelector = '.radioCTA[value="no"]'; //You can change the value to select here

        browser
            .assert.visible('input[name="name"]')
            .clearValue('input[name="name"]')
            .setValue('input[name="name"]', "Test")
            .pause(1000)
            .assert.visible('input[name="town_resident"]')
            .click(radioValueSelector)
            .assert.visible('input[name="title"]')
            .clearValue('input[name="title"]')
            .setValue('input[name="title"]', books.Record2.Title)
            .assert.visible('input[name="author"]')
            .clearValue('input[name="author"]')
            .setValue('input[name="author"]', books.Record2.Author)
            .assert.visible('input[name="pages"')
            .clearValue('input[name="pages"]')
            .setValue('input[name="pages"]', books.Record2.Pages)
            .assert.visible('input[name="dewey_decimal"]')
            .clearValue('input[name="dewey_decimal"]')
            .setValue('input[name="dewey_decimal"]', books.Record2.DDC)
            .click(muchReadOpenerSelector)
            .click(muchReadValueSelector)
            .click(timeReadOpenerSelector)
            .click(timeReadValueSelector)
            .click(ratingOpenerSelector)
            .click(ratingValueSelector)
            .pause(3000)
            .click('button[type=submit]')
            .saveScreenshot('automation/outputs/form-filled.png');
    },

    afterEach(browser) {
        browser.end();
    }
};
