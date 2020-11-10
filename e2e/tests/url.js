module.exports = {
    beforeEach(browser) {
        browser
            .deleteCookies()
            .url('http://localhost:8080/') //Enter the URL to be tested
            .waitForElementVisible('body')
            .pause(3000)
    },

    '@tags': ['load', 'fill-form', 'submitting-form'],
    'Page load': function(browser) {
        browser
            .assert.not.urlEquals('')
            .pause(3000)
            .assert.elementPresent('form')
            .pause(3000);
    },

    'Filling up a form': function(browser) {
        const muchReadOpenerSelector = '#time_selector';
        const muchReadValueSelector = '.bookitem[value="partially"]'; //You can change the value to select here
        const timeReadOpenerSelector = '#status_selector';
        const timeReadValueSelector = '.readtime[value="2_3weeks"]'; //You can change the value to select here
        const ratingOpenerSelector = '#status_selector';
        const ratingValueSelector = '.rating[value="4"]'; //You can change the value to select here

        browser
            .assert.visible('input[name="name"')
            .setValue('input[name="name"]', 'Test')
            .pause(1000)
            .assert.visible('input[name="town_resident"')
            .setValue('input[name="town_resident"]', 'yes')
            .assert.visible('input[name="title"')
            .setValue('input[name="title"]', 'Title Test')
            .assert.visible('input[name="author"')
            .setValue('input[name="author"]', 'Author Test')
            .assert.visible('input[name="pages"')
            .setValue('input[name="pages"]', '100')
            .assert.visible('input[name="dewey_decimal"')
            .setValue('input[name="dewey_decimal"]', '1234567890')
            .click(muchReadOpenerSelector)
            .click(muchReadValueSelector)
            .click(timeReadOpenerSelector)
            .click(timeReadValueSelector)
            .click(ratingOpenerSelector)
            .click(ratingValueSelector)
            .pause(3000)
            .click('button[type=submit]')
            .saveScreenshot('e2e/outputs/form-filled.png');
    },

    afterEach(browser) {
        browser.end();
    }
};
