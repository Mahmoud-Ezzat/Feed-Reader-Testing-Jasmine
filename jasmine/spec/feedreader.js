/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
$(function () {
    let originalTimeout =  jasmine.DEFAULT_TIMEOUT_INTERVAL;
    describe('RSS Feeds', function () {
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        it('test all feeds has url or not', function () {
            allFeeds.forEach(function (f) {
                expect(f.url).toBeDefined();
                expect(f.url).not.toBe("");
            });
        });
        it('test all feeds has name or not', function () {
            allFeeds.forEach(function (f) {
                expect(f.name).toBeDefined();
                expect(f.name).not.toBe("");
            });
        });
    });
    describe('Test The menu Appearence', function () {
        const menuDom = $("body").hasClass("menu-hidden");
        it(' ensures the menu changes', function () {
            expect(menuDom).toBe(true);

        });
        it('Menu list item changes or not', function () {
            $('.menu-icon-link').triggerHandler('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
            $('.menu-icon-link').triggerHandler('click');
            expect($('body').hasClass('menu-hidden')).not.toBe(true)
        });
    });
    describe('Initial Entries', function () {
        beforeEach(function (done) {
            loadFeed(1, done);
        });
        it('function is called and completes its work', function (done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);    
        });
    });
    describe('New Feed Selection', function () {
        let previousFeed;
        let upcomingFeeds;
        beforeEach(function (done) {
            loadFeed(1, function () {
                previousFeed = $('.feed').html();
                loadFeed(2, function () {
                    upcomingFeeds = $('.feed').html();
                    done();
                });
            });
        });
        it('a new feed is loaded', function () {
            expect(upcomingFeeds).not.toBe(previousFeed);
        });
        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });

    });


}());